
import { OptionsBar } from "./OptionBar.jsx"

export function NoteText({note,indexFunc}) {
    const { id, type, createdAt, style, isPinned, info } = note
    
    
    return (
        <article className ="note-text" style={style}>
             <h4>{info.txt}</h4>
             <OptionsBar note={note} indexFunc={indexFunc}/>
             
        </article>
    )
}


