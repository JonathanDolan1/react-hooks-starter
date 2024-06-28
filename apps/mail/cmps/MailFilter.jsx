import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React

export function MailFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 700))

    useEffect(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (target.type === 'checkbox') value = target.checked
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt, isRead, isStarred } = filterByToEdit


    return (
        <section className="mail-filter">
            <form onSubmit={onSubmitFilter}>
                <input onChange={handleChange} type="text" placeholder="Search mail" value={txt} name="txt" />
            </form>
            <span>Is read: </span>
            <select onChange={handleChange} value={isRead} name="isRead" id="is-read">
                <option value=""></option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
            <label htmlFor="is-starred">Is Starred: </label>
            <input onChange={handleChange} type="checkbox" id="is-starred" name="isStarred" value={isStarred} />

        </section>
    )

}