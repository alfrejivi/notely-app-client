import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { RouteComponentProps } from "react-router-dom";
import { AuthProps } from "../App";

interface MatchParams {
    id: string;
}

interface NotesProps extends RouteComponentProps<MatchParams>, AuthProps { }

const Notes: React.FC<NotesProps> = (props) => {

    const file = useRef(null);
    const [note, setNote] = useState(null);
    const [content, setContent] = useState("");

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

                setContent(content);
                setNote(note);
            } catch (e) {
                alert(e);
            }
        }

        onLoad();
    }, [props.match.params.id]);

    return (
        <div className="Notes"></div>
    );
}

export default Notes