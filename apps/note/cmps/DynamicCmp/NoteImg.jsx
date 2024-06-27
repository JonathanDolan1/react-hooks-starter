
import { OptionsBar } from "./OptionBar.jsx"

export function NoteImg({note}) {
    const { id, type, createdAt, style, isPinned, info } = note
    
    return (
        <article className ="note-img" style={style}>
             <img src={info.url}/>
             <OptionsBar/>
        </article>
    )
}
