// const { useSearchParams } = ReactRouterDOM

export function MailFolderList({ selectedFolder, onSetFilter }) {

    
    function onFolderClicked({ target }) {
        const filterBy = { [target.name]: target.value }
        onSetFilter(filterBy)
    }

    return (
        <ul className={`mail-folder-list clean-list ${selectedFolder || 'inbox'}`}>
            <li className="mail-folder-container inbox">
                <input onChange={onFolderClicked} type="radio" name="folder" id="inbox" value="inbox" readOnly/>
                <label htmlFor="inbox"><i className="icon fa-solid fa-inbox"></i><span>Inbox</span></label>
            </li>
            <li className="mail-folder-container starred">
                <input onChange={onFolderClicked} type="radio" name="folder" id="starred" value="starred" readOnly/>
                <label htmlFor="starred"><i className="icon fa-regular fa-star"></i><span>Starred</span></label>
            </li>
            <li className="mail-folder-container sent">
                <input onChange={onFolderClicked} type="radio" name="folder" id="sent" value="sent" readOnly/>
                <label htmlFor="sent"><i className="icon fa-solid fa-paper-plane"></i><span>Sent</span></label>
            </li>
            <li className="mail-folder-container trash">
                <input onChange={onFolderClicked} type="radio" name="folder" id="trash" value="trash" readOnly/>
                <label htmlFor="trash"><i className="icon fa-solid fa-trash-can"></i><span>Trash</span></label>
            </li>
            <li className="mail-folder-container drafts">
                <input onChange={onFolderClicked} type="radio" name="folder" id="drafts" value="drafts" readOnly/>
                <label htmlFor="drafts"><i className="icon fa-solid fa-file"></i><span>Drafts</span></label>
            </li>
            <li className="mail-folder-container all">
                <input onChange={onFolderClicked} type="radio" name="folder" id="all" value="all" readOnly/>
                <label htmlFor="all"><i className="icon fa-solid fa-envelopes-bulk"></i><span>All Mail</span></label>
            </li>
            <li className="mail-folder-container spam" title="In dev">
                <input type="radio" name="folder" id="spam" value="spam" readOnly/>
                <label htmlFor="spam"><i className="icon fa-solid fa-exclamation-circle"></i><span>Spam</span></label>
            </li>
        </ul>
    )

}