
const { useState, useEffect } = React


export function MailCategoriesList({ selectedCategories, onSetFilter }) {

    // selectedCategories is a Set

    useEffect(() => {
        markCategories()
    }, [])

    function markCategories() {
        selectedCategories.forEach(markCategory)
    }

    function markCategory(category) {
        if (selectedCategories.has(category)) {
            document.querySelector('#' + category).checked = true
        }
    }

    function onCategoryClicked({ target }) {
        const { value, checked } = target
        if (checked && !selectedCategories.has(value)) {
            const filter = { categories: Array.from(selectedCategories.add(value)).join('0') }
            onSetFilter(filter)
        } else if (!checked && selectedCategories.has(value)) {
            const newSelectedCategories = new Set([...selectedCategories])
            newSelectedCategories.delete(value)
            const filter = { categories: Array.from(newSelectedCategories).join('0') }
            onSetFilter(filter)
        }
    }

    const selectedCategoriesClassesStr = Array.from(selectedCategories).join(' ')


    return (
        <ul className={`mail-categories-list clean-list ${selectedCategoriesClassesStr}`}>
            <li className="mail-category-container important">
                <input onChange={onCategoryClicked} type="checkbox" id="important" value="important" />
                <label htmlFor="important"><i className="icon fa-solid fa-exclamation-circle"></i>Important</label>
            </li>
            <li className="mail-category-container social">
                <input onChange={onCategoryClicked} type="checkbox" id="social" value="social" />
                <label htmlFor="social"><i className="icon fa-solid fa-user-group"></i>Social</label>
            </li>
            <li className="mail-category-container updates">
                <input onChange={onCategoryClicked} type="checkbox" id="updates" value="updates" />
                <label htmlFor="updates"><i className="icon fa-solid fa-bell"></i>Updates</label>
            </li>
            <li className="mail-category-container promotions">
                <input onChange={onCategoryClicked} type="checkbox" id="promotions" value="promotions" />
                <label htmlFor="promotions"><i className="icon fa-solid fa-tag"></i>Promotions</label>
            </li>

        </ul>
    )

}