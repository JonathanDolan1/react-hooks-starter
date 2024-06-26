

export function MailFolderList() {

    return (
        <ul className="mail-folder-list clean-list">
        <li className="mail-type-container">
            <input type="radio" name="type" id="inbox" value="inbox" />
            <label htmlFor="inbox"><i className="fa-solid fa-inbox"></i> Inbox</label>
        </li>
        <li className="mail-type-container">
            <input type="radio" name="type" id="sent" value="sent" />
            <label htmlFor="sent"><i className="fa-solid fa-paper-plane"></i> Sent</label>
        </li>
        <li className="mail-type-container">
            <input type="radio" name="type" id="trash" value="trash" />
            <label htmlFor="trash"><i className="fa-solid fa-trash-can"></i> Trash</label>
        </li>
        <li className="mail-type-container">
            <input type="radio" name="type" id="draft" value="draft" />
            <label htmlFor="draft"><i className="fa-solid fa-file"></i> Drafts</label>
        </li>
    </ul>
    )

}