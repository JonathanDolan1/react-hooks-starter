const { useEffect, useState } = React
import { bookService } from "../services/book.service.js";

export function Reviews ({book}) {
    const currReviews = book.reviews || []
    const [reviews, setReviews] = useState(currReviews);

    function onRemove(bookId,reviewId) {
        bookService.deleteReview(bookId,reviewId)
        bookService.get(bookId)
        .then(book => setReviews(book.reviews))
    }
    return (
        <section className="reviews">
            {reviews.map(review =>
            <ul key={review.id}>
                <h5>full name: {review.fullname}</h5>
                <h5>rating: {review.rating}</h5>
                <h5>text: {review.text}</h5>
                <button 
                    className="remove" 
                    onClick={() => onRemove(book.id,review.id)}>
                    X
                </button>
            </ul>
            )}
        </section>
    )
}