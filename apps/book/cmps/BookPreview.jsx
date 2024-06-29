//full details of a specific book
//recive a book and return a full details of the book

export function BookPreview({ book }) {
    const { title, authors, thumbnail, listPrice: { amount, currencyCode } } = book

    return (
        <React.Fragment>
            <h1>{title}</h1>
            <h2><span>Author:</span> {authors}</h2>
            <img src={`apps/book/assets/img/${thumbnail}`} alt="" />
            <h2><span>List Price:</span> {amount} {currencyCode}</h2>
        </React.Fragment>
    )
}