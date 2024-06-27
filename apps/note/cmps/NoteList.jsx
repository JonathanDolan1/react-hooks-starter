import { DynamicCmp } from "./DynamicCmp/DynamicCmp.jsx";

export function NoteList({ notes }) {

    if(!notes || !notes.length) return

    return (
            <ul className="note-list">
                {notes.map(note =>
                    <li key={note.id}>
                        <DynamicCmp note={note}/>
                    </li>
                )}
            </ul>
    )
}
