export function MailFilter({ isRead, isStarred, onSetFilter }) {

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (target.type === 'checkbox') value = target.checked
        const filterBy = { [field]: value }
        onSetFilter(filterBy)
    }

    return (
        <section className="mail-filter">
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