
import { OptionsBar } from "./OptionBar.jsx"

export function NoteText({note}) {
    const { id, type, createdAt, style, isPinned, info } = note

    return (
        <article className ="note-text">
             <h4>{info.txt}</h4>
             <OptionsBar/>
        </article>
    )
}


