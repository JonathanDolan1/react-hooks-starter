const { useEffect } = React

export function MailSort({ sortBy, onSetSort }) {

    useEffect(() => {
        setSortDirRadioChecked()
    })


    function setSortDirRadioChecked() {
        const selector = +sortBy.sortDir === 1 ? '#ascending' : '#descending'
        const elCheckedSortInput = document.querySelector(selector)
        elCheckedSortInput.checked = true
    }

    function onSortInputClicked({ target }) {
        const sortBy = { [target.name]: target.value }
        onSetSort(sortBy)
    }

    return (
        <section className="mail-sort">
            <ul className={`mail-sort-dir-list clean-list`}>
                <li className="mail-sort-dir-container ascending">
                    <input className="sort-dir-input" onChange={onSortInputClicked} type="radio" name="sortDir" id="ascending" value={1} readOnly />
                    <label htmlFor="ascending"><i className="icon fa-solid fa-angle-down"></i></label>
                </li>
                <li className="mail-sort-dir-container descending">
                    <input className="sort-dir-input" onChange={onSortInputClicked} type="radio" name="sortDir" id="descending" value={-1} readOnly />
                    <label htmlFor="descending"><i className="icon fa-solid fa-angle-up"></i></label>
                </li>
            </ul>
        </section>
    )
}