import { utilService } from "../../../services/util.service.js"

const {useState, useEffect, useRef} = React

export function MailFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 700))

    useEffect(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    function onSearchText({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    function onChangeSearchType({target}){
        const field = target.name
        const value = target.value
        const resetVals = {
            txt:'',
            date:''
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, ...resetVals, [field]: value }))
    }

    const { searchType, txt } = filterByToEdit


    return (
        <section className="mail-filter">
            <form onSubmit={onSubmitFilter}>
                <input onChange={onSearchText} type="text" placeholder="Search" value={txt} name="txt"/>
                <button>Search</button>
            </form>
            <label htmlFor="searchType">Sort by: </label>
            <select className="search-type" onChange={onChangeSearchType} name="searchType" id="searchType" value={searchType}>
                <option value="txt">Text</option>
                <option value="date">Date</option>
            </select>
        </section>
    )

}