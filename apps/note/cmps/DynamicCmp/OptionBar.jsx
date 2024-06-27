const { useState} = React

export function OptionsBar({note,indexFunc}) {

    const [isVisible, setIsVisible] = useState(false);

    const {isPinned, type} = note
    // console.log(indexFunc)

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
      }
    
    function onDelete() {
        console.log('onDelete')
        indexFunc.onDelete(note.id)
    }
    function onEdit() {
        console.log('onEdit')
    }
    function onSend() {
        console.log('onSend')
    }
    function onColorClick(color) {
        indexFunc.changeColor(note.id,color)
    }
    function onPin() {
        console.log('onPin')
    }

    const pinStyle = (isPinned)? {color:'yellow'} : {}
    const vidStyle = (type==='NoteVideo')? {backgroundColor:'#d3d3d3', opacity:0.7} :{}
    return (
        <div className="options-bar" style={vidStyle}>
            <button style={pinStyle} onClick={onPin}><i className="fa-solid fa-thumbtack"></i></button>
            <button onClick={toggleVisibility}><i className="fa-solid fa-palette"></i></button>
            <button onClick={onSend}><i className="fa-solid fa-envelope"></i></button>
            <button onClick={onEdit}><i className="fa-solid fa-pen-to-square"></i></button>
            <button onClick={onDelete}><i className="fa-solid fa-trash"></i></button>

        {isVisible && (
            <div className="color-palette" >
                <button onClick={() => onColorClick('#efeff1')} style={{ backgroundColor: '#efeff1'}}></button>
                <button onClick={() => onColorClick('#e9e3d4')} style={{ backgroundColor: '#e9e3d4'}}></button>
                <button onClick={() => onColorClick('#f6e2dd')} style={{ backgroundColor: '#f6e2dd'}}></button>
                <button onClick={() => onColorClick('#d3bfdb')} style={{ backgroundColor: '#d3bfdb'}}></button>
                <button onClick={() => onColorClick('#aeccdc')} style={{ backgroundColor: '#aeccdc'}}></button>
                <button onClick={() => onColorClick('#d4e4ed')} style={{ backgroundColor: '#d4e4ed'}}></button>
                <button onClick={() => onColorClick('#b4ddd3')} style={{ backgroundColor: '#b4ddd3'}}></button>
                <button onClick={() => onColorClick('#e2f6d3')} style={{ backgroundColor: '#e2f6d3'}}></button>
                <button onClick={() => onColorClick('#faafa8')} style={{ backgroundColor: '#faafa8'}}></button>
            </div>
        )}
        </div>

    )
}