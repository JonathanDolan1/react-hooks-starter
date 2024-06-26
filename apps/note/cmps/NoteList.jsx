import { NoteText } from "./NoteText.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteSearchBar } from "./NoteSearchBar.jsx";
import { NoteTodo } from "./NoteTodo.jsx";
import { NoteVideo } from "./NoteVideo.jsx";
const {useState, Fragment} = React

export function NoteList({ notes }) {
    
    return (
        <Fragment>
            <ul className="note-list">
            <NoteText note={notes[5]}/>
            <NoteTodo note={notes[0]}/>
            <NoteText note={notes[5]}/>
            <NoteTodo note={notes[0]}/>
            <NoteImg note={notes[7]}/>
            <NoteImg note={notes[7]}/>
            <NoteVideo note={notes[13]}/>
                {notes.map(note =>
                    <li key={note.id}>
                        <h4>Note Id: {note.id}</h4>
                        <h4>Note type: {note.type}</h4>
                        <h4>Created Date: {note.createdAt.date}</h4>
                        <h4>Created Time: {note.createdAt.time}</h4>
                        <h4>Note color: {note.style.backgroundColor}</h4>
                        <h4>Is pinned?: {note.isPinned}</h4>
                        {/* <h4>info: {note.info}</h4> */}
                    </li>
                )}
            </ul>
        </Fragment>
    )
}
