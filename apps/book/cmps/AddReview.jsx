import { bookService } from "../services/book.service.js";

export function AddReview({bookId}) {
    
    function onReviewSubmit(ev) {
        ev.preventDefault()
        const fullname = ev.target.fullname.value
        const rating = ev.target.rating.value
        const date = ev.target.date.value
        const review = {fullname,rating,date}
        bookService.addReview(bookId,review)
    }

    return (
        <section className="reviews-section">
            <h1>Add a review</h1>
            <form onSubmit={onReviewSubmit}>
                <div className="fullname flex justify-between">
                    <label htmlFor="fullname">full name:</label>
                    <input type="text" name="fullname" id="fullname" />
                </div>

                <div className="rating flex justify-between">
                    <label htmlFor="rating">rating:</label>
                    <select name="rating" id="rating">
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>
                </div>

                <div className="date flex justify-between">
                    <label htmlFor="date">Read at:</label>
                    <input type="date" name="date" id="date" />
                </div>
                <button>Submit</button>

            </form>
        </section>

    )

}
