import React, { FormEvent, useRef, useState } from 'react';
import { API } from 'aws-amplify';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import { useFormFields } from '../libs/hooksLib';
import LoaderButton from '../components/LoaderButton';
import config from '../config';

import './NewNote.css';
import { RouteComponentProps } from 'react-router-dom';
import { s3Upload } from '../libs/awsLib';

interface NewNoteProps extends RouteComponentProps { }

const NewNote: React.FC<NewNoteProps> = (props) => {

    const [fields, handleFieldChange] = useFormFields({
        content: ''
    });
    const file = useRef<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        return fields.content.length > 0;
    }

    const handleFileChange = (event: FormEvent<FormControl>) => {
        const target = event.target as HTMLInputElement;
        if (Array.isArray(target.files)) {
            file.current = target.files[0];
        }
    }
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB`)
            return;
        }
        setIsLoading(true);

        try {
            const attachment = file.current ? await s3Upload(file.current) : null;
            await createNote({ content: fields.content, attachment });
            props.history.push('/');
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    const createNote = (note: { content: typeof fields.content, attachment: any }) => {
        return API.post('notes', '/notes', { body: note });
    }

    return (
        <div className="NewNote">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="content">
                    <FormControl
                        value={fields.content}
                        componentClass="textarea"
                        onChange={handleFieldChange} />
                </FormGroup>
                <FormGroup controlId="file">
                    <ControlLabel>Attachment</ControlLabel>
                    <FormControl
                        type="file"
                        onChange={handleFileChange} />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    bsStyle="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}>Create</LoaderButton>
            </form>
        </div>
    );
}

export default NewNote;