import { NoteOptionBar } from "./NoteOptionBar.jsx"

export function NoteTodo({note,indexFunc}) {
    const { id, type, createdAt, style, isPinned, info } = note

    function onCheck() {
        console.log('checked!')
    }

    return (
        <article className="note-todo" style={style}>
            <h4>{info.title}</h4>
            <ul className="todo-list">
                {info.todos.map((todo,idx) =>
                    <li key={idx}>
                        {todo.txt}
                        <input type="checkbox" onClick={onCheck} name="idx"/>
                    </li>
                )}
            </ul>
            <NoteOptionBar note={note} indexFunc={indexFunc}/>
        </article>
    )
}