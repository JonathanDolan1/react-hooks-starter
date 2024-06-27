import { OptionsBar } from "./OptionBar.jsx"

export function NoteTodo({ note }) {
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
                        <input type="checkbox" onClick={onCheck}/>
                    </li>
                )}
            </ul>
            <OptionsBar />
        </article>
    )
}