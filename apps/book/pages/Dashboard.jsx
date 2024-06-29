const { useEffect, useState } = React
import { Chart } from '../cmps/Chart.jsx'
import { bookService } from '../services/book.service.js'


export function Dashboard() {
    const [books, setBooks] = useState([])
    const [langStats, setLangStats] = useState([])

    useEffect(() => {
        bookService.query()
            .then((books => {
                setBooks(books)
                // console.log(books)
            }))
        bookService.getLangStats()
            .then(stats => {
                setLangStats(stats)
                // console.log(stats)
            })
    }, [])

return (
    <section className="dashboard">
        <h2>DashBoard</h2>
        <h3>Statistics for {books.length} books</h3>
        <h4>By language</h4>
        <Chart data={langStats}  />
    </section>
)
}