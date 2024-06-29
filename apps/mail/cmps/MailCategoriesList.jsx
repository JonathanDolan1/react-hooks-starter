



export function MailCategoriesList({ selectedCategories, onSetFilter }) {

    
    function onCategoryClicked({ target }) {
        const filterBy = { [target.name]: target.value }
        onSetFilter(filterBy)
    }

    return (
        <ul className={`mail-category-list clean-list`}>
                <li>Category</li>
                <li>Category</li>
                <li>Category</li>
                <li>Category</li>
        </ul>
    )

}