import React, { useState, useEffect } from 'react';
import './Home.css';
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';
import { RouteComponentProps, Link } from 'react-router-dom';
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
        return (
            <>
                <LinkContainer key="new" to="/notes/new">
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b>
                            Create a new note
                            </h4>
                    </ListGroupItem>
                </LinkContainer>
                {
                    notesToMap.map((note: NoteI, i: number) =>
                        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
                            <ListGroupItem header={note.content?.trim()?.split("\n")[0]}>
                                {"Created: " + new Date(note.createdAt).toLocaleString()}
                            </ListGroupItem>
                        </LinkContainer>
                    )
                }
            </>
        );

    }

    const renderLander = () => {
        return (
            <div className="lander">
                <h1>Scratch</h1>
                <p>A simple note taking app</p>
                <div>
                    <Link to="/login" className="btn btn-info btn-lg">
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-success btn-lg">
                        Signup
                    </Link>
                </div>
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