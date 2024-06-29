const { useNavigate, useParams } = ReactRouterDOM

const { useState, useEffect } = React

import { bookService } from "../services/book.service.js";


export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.createBookToEdit())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook() // if there is a bookId as params then load the book
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .then(() => console.log('editing:', bookId))
            .catch(err => console.log('err:', err))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/book')
                showSuccessMsg(`Book saved successfully!`)
            })
            .catch(err => console.log('err:', err))
    }

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
        if (field === 'title') setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        // else setBookToEdit(prevBook => ({ ...prevBook, listPrice:{amount:value, currencyCode,isOnSale}}))
        else setBookToEdit(prevBook => ({ ...prevBook, listPrice: { ...prevBook.listPrice, amount: value } }))
    }

    const { title, listPrice: {amount}} = bookToEdit

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="Title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={amount} type="number" name="price" id="price" />

                <button>Save</button>
            </form>

        </section>
    )
}