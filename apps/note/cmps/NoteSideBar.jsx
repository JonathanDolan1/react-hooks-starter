
const { useState} = React

export function NoteSideBar({changeFilter}) {
    const [active, setActive] = useState('notes');

    function handleClick(str) {
        setActive(str)
        if(str === 'notes') changeFilter('type', '')
        else changeFilter('type', str)
    }

    function getClass(type) {
        let baseClass = ''
        switch (type) {
            case 'NoteImg':
                baseClass = 'fa-regular fa-image'
                break
            case 'NoteText':
                baseClass = 'fa-regular fa-note-sticky'
                break
            case 'NoteVideo':
                baseClass = 'fa-solid fa-film'
                break
            case 'NoteTodo':
                baseClass = 'fa-regular fa-square-check'
                break
            case 'notes':
                baseClass = "fa-regular fa-lightbulb"
                break
        }
        return `${baseClass} ${active === type ? 'active' : ''}`
    }

    return (
        <div className="note-sidebar">
            <i className={getClass('notes')} onClick={() => handleClick('notes')}></i>
            <i className={getClass('NoteImg')} onClick={() => handleClick('NoteImg')}></i>
            <i className={getClass('NoteText')} onClick={() => handleClick('NoteText')}></i>
            <i className={getClass('NoteVideo')} onClick={() => handleClick('NoteVideo')}></i>
            <i className={getClass('NoteTodo')} onClick={() => handleClick('NoteTodo')}></i>
        </div>
    );
}
