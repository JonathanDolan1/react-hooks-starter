import { OptionsBar } from "./OptionBar.jsx"



export function NoteVideo({ note }) {

   

    const { id, type, createdAt, style, isPinned, info } = note

    return (
        <article className="NoteVideo">
            {/* <iframe width="inherit" height="auto" src={info.url}></iframe> */}
            <iframe className="responsive-iframe" src={info.url}></iframe>
            <OptionsBar />
        </article>
    )
}