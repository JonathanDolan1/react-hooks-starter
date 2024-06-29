//renders the filter and the list
const { Link } = ReactRouterDOM
const { useSearchParams } = ReactRouterDOM

import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { BookDetails } from "../pages/BookDetails.jsx"

const { useEffect, useState } = React


export function BookIndex() {
    const [books, setBooks] = useState(null)
    // const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = bookService.getFilterFromSearchParams(searchParams)
    const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        setSearchParams(filterBy)
        bookService.query(filterBy)
        .then(books => setBooks(books))
        .catch(err => {
        console.eror('err:', err)
        showErrorMsg('Cannot load books')
        })
        }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => { console.log('Had issues with:', err) })
    }

    function onRemoveBook(bookId) {//add user msg on success and on failure
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
                showSuccessMsg(`Book (${bookId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Had issues with:', err)
                showErrorMsg(`Having problems removing book!`)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }


    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            <button><Link to="/book/edit">Add Book</Link></button>
            <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}