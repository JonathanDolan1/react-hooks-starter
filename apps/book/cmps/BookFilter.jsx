// allow the user to filter the book list by name & price

const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { title, price } = filterByToEdit

    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleChange}
                        name="title"
                        placeholder="Filter by title"
                        id="title"
                    />
                </div>
                <div>
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    value={price || ''}
                    onChange={handleChange}
                    name="price"
                    id="price"
                    placeholder="Filter by price"
                />
                </div>
                <button>Submit</button>
            </form>
        </section>
    )
}