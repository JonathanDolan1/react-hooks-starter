import { OptionsBar } from "./OptionBar.jsx"



export function NoteVideo({note,indexFunc}) {
    const { id, type, createdAt, style, isPinned, info } = note
    
    return (
        <article className="NoteVideo">
            <iframe className="responsive-iframe" src={info.url}></iframe>
            <OptionsBar note={note} indexFunc={indexFunc} />
        </article>
    )
}