import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes,setNotes] = useState(null)

    useEffect(() => {
        noteService.query()
        .then(notes => {
            setNotes(notes)
            console.log(notes)
        })
        .catch(err => {
            console.eror('err:', err)
            showErrorMsg('Cannot load notes')
        })
    
    }, []);

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <div>note app</div>
            <NoteList notes={notes}/>
        </section>
    )
}
