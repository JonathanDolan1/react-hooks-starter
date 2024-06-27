import { NoteImg } from "./NoteImg.jsx"
import { NoteText } from "./NoteText.jsx"
import { NoteTodo } from "./NoteTodo.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

export function DynamicCmp({ note }) {
    const { type } = note
    let cmp
    switch (type) {
        case "NoteImg":
            cmp = <NoteImg note={note}/>

            break;

        case "NoteText":
            cmp = <NoteText note={note}/>

            break;
        case "NoteTodo":
            cmp = <NoteTodo note={note}/>

            break;
        case "NoteVideo":
            cmp = <NoteVideo note={note}/>

            break;
    }

    return cmp    
}