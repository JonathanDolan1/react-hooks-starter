import { NoteImg } from "./NoteImg.jsx"
import { NoteText } from "./NoteText.jsx"
import { NoteTodo } from "./NoteTodo.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

export function DynamicCmp({note,indexFunc}) {
    const { type } = note
    let cmp
    switch (type) {
        case "NoteImg":
            cmp = <NoteImg note={note} indexFunc={indexFunc}/>

            break;

        case "NoteText":
            cmp = <NoteText note={note} indexFunc={indexFunc}/>

            break;
        case "NoteTodo":
            cmp = <NoteTodo note={note} indexFunc={indexFunc}/>

            break;
        case "NoteVideo":
            cmp = <NoteVideo note={note} indexFunc={indexFunc}/>

            break;
    }

    return cmp    
}