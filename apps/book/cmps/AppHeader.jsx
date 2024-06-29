
const {NavLink, useNavigate } = ReactRouterDOM

export function AppHeader() {

    const navigate = useNavigate()

    function onBack() {
        navigate(-1)
    }

    return (
        <header className="app-header">
            {/* <button>onClick={onBack}</button> */}
            <nav className="app-nav">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/book">Books</NavLink>
                <NavLink to="/Dashboard">Dashboard</NavLink>
            </nav>
        </header>
    )
}