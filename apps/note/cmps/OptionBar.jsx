export function OptionsBar() {

    function onDelete() {
        console.log('onDelete')
    }
    function onEdit() {
        console.log('onEdit')
    }
    function onSend() {
        console.log('onSend')
    }
    function onColor() {
        console.log('onColor')
    }
    function onPin() {
        console.log('onPin')
    }

    return (
        <div className="options-bar">
            <button onClick={onPin}><i className="fa-solid fa-thumbtack"></i></button>
            <button onClick={onColor}><i className="fa-solid fa-palette"></i></button>
            <button onClick={onSend}><i className="fa-solid fa-envelope"></i></button>
            <button onClick={onEdit}><i className="fa-solid fa-pen-to-square"></i></button>
            <button onClick={onDelete}><i className="fa-solid fa-trash"></i></button>
        </div>

    )
}