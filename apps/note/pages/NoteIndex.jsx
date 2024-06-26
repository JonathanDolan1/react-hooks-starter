import { storageService } from "../../../services/async-storage.service.js"
import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteSideBar } from "../cmps/NoteSideBar.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteInsertBar } from "../cmps/NoteInsertBar.jsx"
import { NoteHeader } from "../cmps/NoteHeader.jsx"

import { mailService } from '../../mail/services/mail.service.js'
const { useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex() {

    const navigate = useNavigate()
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState({type:'',txt:''})

    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load notes')
            })

    }, [filterBy]);

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

    function onPin(noteId, pinState) {
        //change state and change indexing:
        const idx = getIndex(noteId)

        setNotes(prevNotes => {
            //update state:
            const updatedNotes = prevNotes.map((note, index) => index === idx ? { ...note, isPinned: pinState } : note)
            noteService.save(updatedNotes[idx])
            //update indexing:
            const pinnedNotes = updatedNotes.filter(note => note.isPinned)
            const unpinnedNotes = updatedNotes.filter(note => !note.isPinned)

            // Sort pinned notes if needed (e.g., by creation date)
            pinnedNotes.sort((a, b) => new Date(b.createdAt.date + ' ' + b.createdAt.time) - new Date(a.createdAt.date + ' ' + a.createdAt.time));
            // Sort unpinned notes if needed
            unpinnedNotes.sort((a, b) => new Date(b.createdAt.date + ' ' + b.createdAt.time) - new Date(a.createdAt.date + ' ' + a.createdAt.time));

            const newNotes = [...pinnedNotes, ...unpinnedNotes]

            return newNotes
        })

    }

    function onCopy(note) {
        const idx = getIndex(note.id)
        const noteToCopy = { ...note, id: '' }
        noteService.save(noteToCopy)
            .then(copiedNote => {
                setNotes(prevNotes => {
                    const newNotes = [...prevNotes]
                    newNotes.splice(idx, 0, copiedNote)
                    return newNotes
                })
            })
    }

    function getIndex(noteId) {
        return notes.findIndex(note => note.id === noteId)
    }

    function changeFilter(field,value) {
        console.log('field:', field)
        console.log('value:', value)
        setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
        return
    }

    // NOTE TO MAIL
    function onCreateDraftFromNote(noteTitle = 'from note', noteContent = 'noteContent') {
        const mail = mailService.getNewMail()
        mail.subject = noteTitle
        mail.body = noteContent

        mailService.save(mail)
            .then(newMail => goToMail(newMail))
    }

    function goToMail(mail) {
        console.log(mail)
        navigate(`/mail/list?mailDraftId=${mail.id}`)
    }

    if (!notes) return <div>Loading...</div>
    const pinnedNotes = notes.filter(note => note.isPinned)
    const unPinnedNotes = notes.filter(note => !note.isPinned)
    return (
        <section className="note-index">
            <NoteHeader changeFilter={changeFilter}/>
            <NoteSideBar changeFilter={changeFilter} />
            <NoteInsertBar setNotes={setNotes} />
            <NoteList notes={pinnedNotes} onDelete={onDelete} changeColor={changeColor} onPin={onPin} onCreateDraftFromNote={onCreateDraftFromNote} onCopy={onCopy} />
            <NoteList notes={unPinnedNotes} onDelete={onDelete} changeColor={changeColor} onPin={onPin} onCreateDraftFromNote={onCreateDraftFromNote} onCopy={onCopy} />
        </section>
    )
}
