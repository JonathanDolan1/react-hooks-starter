const { useState} = React

export function NoteOptionBar({note,indexFunc}) {

    const {isPinned, type} = note
    const [isVisible, setIsVisible] = useState(false);
    
    const toggleVisibility = () => {
        setIsVisible(!isVisible)
      }
    
    function onDeleteClick() {
        // console.log('onDelete')
        indexFunc.onDelete(note.id)
    }

    
    function onColorClick(color) {
        indexFunc.changeColor(note.id,color)
    }
    
    function onPinClick() {
        indexFunc.onPin(note.id, !isPinned)
    }
    
   
    function onSendClick() {
        var title ='Title'
        var content='Content'
        switch (note.type) {
            case 'NoteText':
                title = 'Text from notes'
                content = note.info.txt
                break;
            case 'NoteVideo':
                title = 'Video from notes'
                content = note.info.url
                
                break;
            case 'NoteImg':
                title = 'Image from notes'
                content = note.info.url
                
                break;
            case 'NoteTodo':
                title = note.info.title
                content = note.info.todos.map(todo => todo.txt)
                break;
        }
        
        indexFunc.onCreateDraftFromNote(title,content)
    }

    function onCopyClick(){
        indexFunc.onCopy(note)
    }

    function onEdit() {
        console.log('onEdit')
    }

    const pinStyle = (isPinned)? {color:'yellow'} : {}
    const vidStyle = (type==='NoteVideo')? {backgroundColor:'#d3d3d3', opacity:0.7} :{}
    return (
        <div className="options-bar" style={vidStyle}>
            <button style={pinStyle} onClick={onPinClick}><i className="fa-solid fa-thumbtack"></i></button>
            <button onClick={toggleVisibility}><i className="fa-solid fa-palette"></i></button>
            <button onClick={onSendClick}><i className="fa-solid fa-envelope"></i></button>
            <button onClick={onCopyClick}><i className="fa-solid fa-copy"></i></button>
            <button onClick={onDeleteClick}><i className="fa-solid fa-trash"></i></button>
            {/* <button onClick={onEdit}><i className="fa-solid fa-pen-to-square"></i></button> */}

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