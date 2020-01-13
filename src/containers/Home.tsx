import React, { useState, useEffect } from 'react';
import './Home.css';
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { AuthProps } from '../App';
import { API } from 'aws-amplify';
import { LinkContainer } from 'react-router-bootstrap';

interface HomeProps extends RouteComponentProps, AuthProps { };

interface NoteI {
    attachment: string | null;
    content: string;
    createdAt: Date;
    noteId: string;
    userId: string;
}

const Home: React.FC<HomeProps> = (props) => {
    const [notes, setNotes] = useState<NoteI[] | []>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const onLoad = async () => {
            if (!props.isAuthenticated) { return; }
            try {
                const notes = await loadNotes();
                setNotes(notes);
            } catch (e) {
                alert(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated]);

    const loadNotes = () => {
        return API.get('notes', '/notes', {});
    }
    const renderNotesList = (notes: NoteI[]) => {
        const notesToMap: NoteI[] = [...notes];
        return notesToMap.map((note: NoteI, i: number) =>
            i !== 0 ? (
                <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
                    <ListGroupItem header={note.content.trim().split("\n")[0]}>
                        {"Created: " + new Date(note.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                    <LinkContainer key="new" to="/notes/new">
                        <ListGroupItem>
                            <h4>
                                <b>{"\uFF0B"}</b>
                                Create a new note
                            </h4>
                        </ListGroupItem>
                    </LinkContainer>
                )
        );
    }

    const renderLander = () => {
        return (
            <div className="lander">
                <h1 className="">Notely</h1>
                <p className="">A simple note taking app</p>
            </div>
        );
    }

    const renderNotes = () => {
        return (
            <div className="notes">
                <PageHeader>Your Notes</PageHeader>
                <ListGroup>
                    {!isLoading && renderNotesList(notes)}
                </ListGroup>
            </div>
        );
    }
    return (
        <div className="Home">
            {props.isAuthenticated ? renderNotes() : renderLander()}
        </div>
    );
}

export default Home;