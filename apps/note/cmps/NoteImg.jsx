
import { OptionsBar } from "./OptionBar.jsx"

export function NoteImg({note}) {
    const { id, type, createdAt, style, isPinned, info } = note

    return (
        <article className ="note-img">
             <h4>{info.title}</h4>
             <img src="https://placehold.co/400"/>
             <OptionsBar/>
        </article>
    )
}
