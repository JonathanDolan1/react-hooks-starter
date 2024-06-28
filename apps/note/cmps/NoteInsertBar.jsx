const { useState } = React
import { noteService } from "../services/note.service.js";

//smart component with editable abilities on the parent and data

export function NoteInsertBar({setNotes}) {
    const [placeHolder, setPlaceHolder] = useState('New note...')
    const [inputValue, setInputValue] = useState('')
    const [inputType, setInputType] = useState('NoteText')

    function onInputChange(ev) {//update inputValue on input change (2 way data binding)
        setInputValue(ev.target.value)
    }

    function handleKeyPress(ev) {//handle submit on Enter press
        if(ev.key==='Enter') {
            submitInput()
        }
    }

    function submitInput() {
        //create and save note
        const type = inputType
        const content = inputValue
        const newNote = noteService.createUserNote(type,content)

        //saving to DB and updating dom
        noteService.save(newNote)
        .then(savedNote => {
            // console.log('saved note:', savedNote)
            setNotes(prevNotes => [...prevNotes,savedNote])
        })
        .catch(err => console.log(err))

        //reset input
        setInputValue('')
    }



    function handleIconClick(str) {// handle icon click and set input type
        setInputValue('')

        switch (str) {
            case 'NoteText':
                setPlaceHolder('New note...')
                setInputType('NoteText')

                break;
            case 'NoteImg':
                setPlaceHolder('Enter image url:')
                setInputType('NoteImg')

                break;
                case 'NoteVideo':
                setPlaceHolder('Enter video url:')
                setInputType('NoteVideo')

                break;
            case 'NoteTodo':
                setPlaceHolder('In dev...')
                setInputType('NoteTodo')

                break;

            // default:
            //     setPlaceHolder('New note...')
            //     setInputType('NoteText')
            //     break;
        }


    }

    return (
        <section className="note-insert-container">
            <div className="note-input-container">
                <input className='note-input-field' 
                type="text" 
                placeholder={placeHolder}
                value={inputValue}
                onChange = {onInputChange}
                onKeyPress={handleKeyPress}
                
                />
                <div className='note-input-icons'>
                    <i className='fa-regular fa-note-sticky' onClick={() => handleIconClick('NoteText')}></i>
                    <i className='fa-regular fa-image' onClick={() => handleIconClick('NoteImg')}></i>
                    <i className='fa-solid fa-film' onClick={() => handleIconClick('NoteVideo')}></i>
                    <i className='fa-regular fa-square-check' onClick={() => handleIconClick('NoteTodo')}></i>
                </div>
            </div>
        </section>
    )
}
