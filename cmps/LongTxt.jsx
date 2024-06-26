const { useState } = React

export function LongTxt({ txt, length = 100 }) {

    const [isLong, setIsLong] = useState(false)

    function onToggleTxt() {
        setIsLong((prevIsLong) => !prevIsLong)
    }

    const modTxt = isLong ? txt : txt.slice(0, length) + '...'
    const readStr = isLong ? 'Less' : 'More'

    return (
        <section className="long-txt">
            <p>{modTxt}</p>
            <button onClick={onToggleTxt}>Read {readStr}</button>
        </section>
    )
}