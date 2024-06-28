import { DynamicCmp } from "./DynamicCmp/DynamicCmp.jsx";

export function NoteList(props) {
    const { notes,...indexFunc } = props
    if(!notes || !notes.length) return

    return (
            <ul className="note-list">
                {notes.map(note =>
                    <li key={note.id}>
                        <DynamicCmp note={note} indexFunc={indexFunc}/>
                    </li>
                    
                )}
            </ul>
    )
}
