const { Link } = ReactRouterDOM

import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {

    return (
        <ul className='book-list'>
            {books.map((book) =>
                <li key={book.id} className="book-preview">
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                        <button><Link to={`/book/${book.id}`}>Details</Link></button>
                        <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}



