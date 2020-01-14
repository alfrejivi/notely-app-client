import React, { useRef, useState, useEffect, FormEvent } from "react";
import { API, Storage } from "aws-amplify";
import { RouteComponentProps } from "react-router-dom";
import { AuthProps } from "../App";
import { FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";
import config from "../config";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";

import './Notes.css';
import { s3Upload } from "../libs/awsLib";
interface MatchParams {
    id: string;
}

interface NoteI { content: string, attachment: any, attachmentURL?: string }
interface NotesProps extends RouteComponentProps<MatchParams>, AuthProps { }

const Notes: React.FC<NotesProps> = (props) => {

    const file = useRef<File | null>(null);
    const [note, setNote] = useState<NoteI | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        content: ''
    });

    useEffect(() => {
        function loadNote() {
            return API.get("notes", `/notes/${props.match.params.id}`, {});
        }

        async function onLoad() {
            try {
                const note = await loadNote();
                const { content, attachment } = note;

                if (attachment) {
                    note.attachmentURL = await Storage.vault.get(attachment);
                }

                fields.content = content;
                setNote(note);
            } catch (e) {
                alert(e);
            }
        }

        onLoad();
    }, [props.match.params.id]);

    const validateForm = () => {
        return fields.content?.length > 0;
    }

    const formatFilename = (str: any) => {
        return str.replace(/^\w+-/, "");
    }

    const handleFileChange = (event: FormEvent<FormControl>) => {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            file.current = target.files[0];
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        let attachment;

        event.preventDefault();
        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB.`
            );
            return;
        }
        setIsLoading(true);
        try {
            if (file.current) {
                attachment = await s3Upload(file.current);
            }

            await saveNote({
                content: fields.content,
                attachment: attachment || note?.attachment
            });

            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    const handleDelete = async (event: React.MouseEvent<Button, MouseEvent>) => {
        event.preventDefault();
        const confirmed = window.confirm("Are you sure you want to delete this note?");

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            await deleteNote();
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsDeleting(false);
        }
    }

    const saveNote = (note: NoteI) => {
        return API.put("notes", `/notes/${props.match.params.id}`, {
            body: note
        });
    }

    const deleteNote = () => {
        return API.del("notes", `/notes/${props.match.params.id}`, {});
    }

    return (
        <div className="Notes">
            {note && (
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                            value={fields.content}
                            componentClass="textarea"
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                    {note.attachment && (
                        <FormGroup>
                            <ControlLabel>Attachment</ControlLabel>
                            <FormControl.Static>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={note.attachmentURL}
                                >
                                    {formatFilename(note.attachment.key)}
                                </a>
                            </FormControl.Static>
                        </FormGroup>
                    )}
                    <FormGroup controlId="file">
                        {!note.attachment && <ControlLabel>Attachment</ControlLabel>}
                        <FormControl onChange={handleFileChange} type="file" />
                    </FormGroup>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        bsStyle="primary"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >
                        Save
                    </LoaderButton>
                    <LoaderButton
                        block
                        bsSize="large"
                        bsStyle="danger"
                        onClick={handleDelete}
                        isLoading={isDeleting}
                    >
                        Delete
                    </LoaderButton>
                </form>
            )}
        </div>
    );
}

export default Notes