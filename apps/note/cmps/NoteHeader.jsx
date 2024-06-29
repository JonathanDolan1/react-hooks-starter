const { Link } = ReactRouterDOM
const { useState } = React
 
export function NoteHeader({changeFilter}) {
    const [isOpen, setIsOpen] = useState(true)
    const [inputValue, setInputValue] = useState('')
    
    function onBarsClick() {
        setIsOpen(prevIsOpen => !prevIsOpen)
    }

    function onInputChange(ev) {//update inputValue on input change (2 way data binding)
        setInputValue(ev.target.value)
    }

    function handleKeyPress(ev) {//handle submit on Enter press
        if(ev.key==='Enter') {
            submitInput()
        }
    }

    function submitInput() {
        //send filter
        changeFilter('txt',inputValue)
        //reset input
        setInputValue('')
          
    }

    const navClass = isOpen ? 'note-header-apps hidden' : 'note-header-apps'
    return (
        <section className="note-header-container">
            <div className='note-header-logo-cotainer'>
                <img src="/apps/note/imgs/keep-logo.png" alt="Keep logo" />
                <div className="note-header-logo">Keep</div>
            </div>

            <div className="note-header-icons">
                <input className="note-header-search"
                    type="text"
                    placeholder='Search'
                    id='note-header-search'
                    value={inputValue}
                    onChange = {onInputChange}
                    onKeyPress={handleKeyPress}
                />
                <i className="fa-solid fa-arrow-rotate-right"></i>
                <Link to="/mail" ><i className="fa-regular fa-envelope"></i></Link>
                <i className="fa-solid fa-gear"></i>
                <i className="fa-solid fa-bars" onClick={onBarsClick}>
                    <div className={navClass}>
                        <Link to="/"><i className="fa-solid fa-house home-app"></i></Link>
                        <Link to="/mail" ><i className="fa-solid fa-envelope mail-app"></i></Link>
                        <Link to="/note" ><i className="fa-solid fa-note-sticky note-app"></i></Link>
                        <Link to="/about"><i className="fa-solid fa-address-card about-app"></i></Link>
                        <Link to="/about"><i className="fa-solid fa-book book-app"></i></Link>
                        <i className="fa-brands fa-google"></i>
                        <i className="fa-brands fa-google-play"></i>
                        <i className="fa-brands fa-google-wallet"></i>
                        <i className="fa-brands fa-google-pay"></i>
                    </div>
                </i>
                <div className="notes-header-user-icon">S</div>
            </div>
        </section>
    )
}