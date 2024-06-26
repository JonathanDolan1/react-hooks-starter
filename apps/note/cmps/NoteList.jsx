
export function NoteList({notes}) {

    return (
        <ul className="note-list">
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

    )
}
