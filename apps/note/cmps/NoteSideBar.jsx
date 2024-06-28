
const { useState} = React

export function NoteSideBar({changeFilter}) {
    const [active, setActive] = useState('notes');

    function handleClick(str) {
        setActive(str)
        changeFilter(str)
    }

    function getClass(type) {
        let baseClass = ''
        switch (type) {
            case 'img':
                baseClass = 'fa-regular fa-image'
                break
            case 'text':
                baseClass = 'fa-regular fa-note-sticky'
                break
            case 'vid':
                baseClass = 'fa-solid fa-film'
                break
            case 'todo':
                baseClass = 'fa-regular fa-square-check'
                break
            case 'trash':
                baseClass = 'fa-regular fa-trash-can'
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
            <i className={getClass('img')} onClick={() => handleClick('img')}></i>
            <i className={getClass('text')} onClick={() => handleClick('text')}></i>
            <i className={getClass('vid')} onClick={() => handleClick('vid')}></i>
            <i className={getClass('todo')} onClick={() => handleClick('todo')}></i>
            <i className={getClass('trash')} onClick={() => handleClick('trash')}></i>
        </div>
    );
}
