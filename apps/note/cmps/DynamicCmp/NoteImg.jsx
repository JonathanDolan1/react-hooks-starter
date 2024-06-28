
import { NoteOptionBar } from "./NoteOptionBar.jsx"

export function NoteImg({note,indexFunc}) {
    const { id, type, createdAt, style, isPinned, info } = note
    
    return (
        <article className ="note-img" style={style}>
             <img src={info.url}/>
             <NoteOptionBar note={note} indexFunc={indexFunc}/>
        </article>
    )
}