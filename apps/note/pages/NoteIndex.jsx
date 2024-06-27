import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query()
            .then(notes => {
                setNotes(notes)
                // console.log(notes)
            })
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load notes')
            })

    }, []);

    function onDelete(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note ${noteId} removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove note ' + noteId)
            })


    }

    function changeColor(noteId, newColor) {
        // console.log(`change ${noteId} color to ${newColor}`)
        noteService.get(noteId)
            .then(note => {
                note.style.backgroundColor = newColor
                noteService.save(note)
            })
            .then(setNotes(prevNotes => prevNotes.map(note =>
                note.id === noteId ? { ...note, style: { ...note.style, backgroundColor: newColor } } : note)

            ))
            .catch(err => {
                console.log(err)
                showErrorMsg('Cannot save new color')
            })
    }

    function onPin() {

    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteList notes={notes} onDelete={onDelete} changeColor={changeColor} />
        </section>
    )
}
