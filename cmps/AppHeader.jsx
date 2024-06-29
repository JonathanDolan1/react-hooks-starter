const { Link,NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {
    const [isOpen, setIsOpen] = useState(true)


    function onBarsClick() {
        setIsOpen(prevIsOpen => !prevIsOpen)
    }

    const navClass = isOpen ? 'app-header-apps hidden' : 'app-header-apps'

    return (
        <section className="app-header-container">

            <div className='app-header-logo-cotainer'>
                <i className="fa-solid fa-circle-nodes"></i>
                <div className="app-header-logo">Appsus</div>
            </div>

            <div className="app-header-icons">
                <i className="fa-solid fa-arrow-rotate-right"></i>
                <NavLink to="/mail" ><i className="fa-regular fa-envelope"></i></NavLink>
                <i className="fa-solid fa-gear"></i>
                <i className="fa-solid fa-bars" onClick={onBarsClick}>
                    <div className={navClass}>
                        <NavLink to="/"><i className="fa-solid fa-house home-app"></i></NavLink>
                        <NavLink to="/mail/list" ><i className="fa-solid fa-envelope mail-app"></i></NavLink>
                        <NavLink to="/note" ><i className="fa-solid fa-note-sticky note-app"></i></NavLink>
                        <NavLink to="/about"><i className="fa-solid fa-address-card about-app"></i></NavLink>
                        <NavLink to="/about"><i className="fa-solid fa-book book-app"></i></NavLink>
                        <i className="fa-brands fa-google"></i>
                        <i className="fa-brands fa-google-play"></i>
                        <i className="fa-brands fa-google-wallet"></i>
                        <i className="fa-brands fa-google-pay"></i>
                    </div>
                </i>
                {/* <div className="app-header-user-icon-s">S</div> */}
                {/* <div className="app-header-user-icon-y">Y</div> */}
            </div>
        </section>
    )
}
