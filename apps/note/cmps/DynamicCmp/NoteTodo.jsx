import { noteService } from "../../services/note.service.js"
import { NoteOptionBar } from "./NoteOptionBar.jsx"
const { useState } = React

export function NoteTodo({ note: initialNote, indexFunc }) {
    const [note, setNote] = useState(initialNote)
    const { id, type, createdAt, style, isPinned, info } = note

    function onCheck(idx) {
        setNote(prevNote => {
            const newTodos = prevNote.info.todos.map((todo, index) =>
                index === idx
                    ? { ...todo, doneAt: todo.doneAt ? null : Date.now() }
                    : todo
            )

            const newNote = {
                ...prevNote, info: { ...prevNote.info, todos: newTodos }
            }

            // Update the note in the database
            noteService.save(newNote)
                .catch(err => console.log('Error updating todo:', err))

            return newNote
        })
    }

    return (
        <article className="note-todo" style={style}>
            <h4>{info.title}</h4>
            <ul className="todo-list">
                {note.info.todos.map((todo, idx) =>
                    <li key={idx}>
                        <span style={{ textDecoration: todo.doneAt ? 'line-through' : 'none' }}>
                            {todo.txt}
                        </span>
                        <input
                            type="checkbox"
                            checked={!!todo.doneAt}
                            onChange={() => onCheck(idx)}
                            name={`input${idx}`}
                        />
                    </li>
                )}
            </ul>
            <NoteOptionBar note={note} indexFunc={indexFunc} />
        </article>
    )
}