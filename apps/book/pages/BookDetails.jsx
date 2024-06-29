const { useParams, Link, Navigate} = ReactRouterDOM

import { AddReview } from "../cmps/AddReview.jsx"
import { Reviews } from "../cmps/Reviews.jsx"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookDetails() {
    
    const [book, setBook] = useState(null)
    const { bookId } = useParams()

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => console.log(err))
    }, [bookId])

    

    //handle page count text
    function getPageCount() {
        let pageCount = book.pageCount
        if (book.pageCount > 500) pageCount += " - Long reading"
        else if (book.pageCount > 200) pageCount += " - Decent reading"
        else if (book.pageCount < 100) pageCount += " - Light rading"
        return pageCount
    }

    //handle publish Date text
    function getPublisheDate() {
        const currYear = new Date().getFullYear()
        let publishedYear = book.publishedDate
        let diff = currYear - publishedYear
        if (diff > 10) publishedYear += " - Vintage"
        else if (diff < 10) publishedYear += " - NEW!"
        return publishedYear
    }

    //handle price class
    function getPriceClass() {
        if (book.listPrice.amount > 150) return "red"
        else if (book.listPrice.amount < 20) return "green"
        else return ""
    }

    if (!book) return (<div>Loading...</div>)

    return (
        <section>
            <div className="book-details">
                <h2>{book.title}</h2>
                <h4>{book.subtitle}</h4>
                <img src={`../assets/img/${book.thumbnail}`} alt="" />
                <h5><span>Description: </span>{book.description}</h5>
                <h5><span>Authors: </span> {book.authors.join(' ')}</h5>
                <h5><span>Published Date: </span> {getPublisheDate()}</h5>
                <h5><span>Page Count: </span> {getPageCount()}</h5>
                <h5><span>Categories: </span> {book.categories.join(' ')}</h5>
                <h5><span>Language: </span> {book.language}</h5>
                <h5 className={getPriceClass()}><span >List Price: </span> {book.listPrice.amount} {book.listPrice.currencyCode}</h5>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
                <button ><Link to="/book">Back</Link></button>
            </div>
            <AddReview bookId={bookId}/>
            <Reviews book={book}/>
            
        </section>



    )
}