
const { useState, useEffect } = React


export function MailCategoriesList({ selectedCategories, onSetFilter }) {

    // selectedCategories is a Set

    useEffect(() => {
        console.log(selectedCategories);
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
        <ul className={`mail-category-list clean-list ${selectedCategoriesClassesStr}`}>
            <li>
                <input onChange={onCategoryClicked} type="checkbox" id="important" value="important" />
                <label htmlFor="important">Important</label>
            </li>
            <li>
                <input onChange={onCategoryClicked} type="checkbox" id="social" value="social" />
                <label htmlFor="social">Social</label>
            </li>
            <li>
                <input onChange={onCategoryClicked} type="checkbox" id="updates" value="updates" />
                <label htmlFor="updates">Updates</label>
            </li>
            <li>
                <input onChange={onCategoryClicked} type="checkbox" id="promotions" value="promotions" />
                <label htmlFor="promotions">Promotions</label>
            </li>

        </ul>
    )

}