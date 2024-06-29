const { Link } = ReactRouterDOM
const { useState } = React

export function MailHeader({ txt, onSetFilter }) {

    const [isOpen, setIsOpen] = useState(true)

    function onBarsClick() {
        setIsOpen(prevIsOpen => !prevIsOpen)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (target.type === 'checkbox') value = target.checked
        const filterBy = { [field]: value }
        onSetFilter(filterBy)
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        const { target } = ev
        const filterBy = { [target.name]: target.value }
        onSetFilter(filterBy)
    }

    const navClass = isOpen ? 'mail-header-apps hidden' : 'mail-header-apps'
    return (
        <section className="mail-header-container">
            <div className='mail-header-logo-cotainer'>
                <img className="mail-app-logo" src="./../../../assets/imgs/mail-logo.png" alt="Keep logo" />
                <div className="mail-header-logo">Mail</div>
            </div>

            <div className="mail-header-icons">
                <form className="mail-header-form" onSubmit={onSubmitFilter}>
                    <input className="mail-header-search" onChange={handleChange} type="text" placeholder="Search mail" value={txt} name="txt" />
                </form>
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
                <div className="mail-header-user-icon">J</div>
            </div>
        </section>
    )
}