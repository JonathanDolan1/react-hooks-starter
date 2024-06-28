
export function NoteHeader() {
    return (
        <section className="note-header-container">

            <div className="note-header-icons">
                <div className="notes-header-user-icon">S</div>
                <i className="fa-solid fa-bars"></i>
                <i className="fa-solid fa-gear"></i>
                <i className="fa-regular fa-envelope"></i>
                <i className="fa-solid fa-arrow-rotate-right"></i>
                <input className="note-header-search" 
                type="text"
                placeholder='Search'
                 
                 />
            </div>

            <div className='note-header-logo-cotainer'>
                <div className="note-header-logo">Keep</div>
                <img src="/apps/note/imgs/keep-logo.png" alt="Keep logo" />
            </div>
        </section>
    )
}