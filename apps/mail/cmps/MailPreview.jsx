const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, onArchiveMail, onMarkAsRead, onStarClicked }) {

    function formatTimestamp(timestamp) {
        if (!timestamp) return 'NO DATE'
        const date = new Date(timestamp);

        // Check if the timestamp is within the current day
        const currentDate = new Date().toDateString();
        if (date.toDateString() === currentDate) {
            let hours = date.getHours();
            const ampm = hours < 12 ? "AM" : "PM";
            hours = hours % 12;
            hours = hours ? hours : 12;
            const minutes = date.getMinutes();
            const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
            return `${hours}:${formattedMinutes} ${ampm}`;
        }

        // Check if the timestamp is within the current year
        const currentYear = new Date().getFullYear();
        if (date.getFullYear() === currentYear) {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[date.getMonth()];
            const day = date.getDate();
            return `${month} ${day}`;
        }

        // Default format: m/d/yy
        const month = (date.getMonth() + 1).toString()
        const day = date.getDate().toString()
        const year = date.getFullYear().toString().substr(2, 2);
        return `${month}/${day}/${year}`;
    }


    const starredClass = mail.isStarred ? 'starred' : 'not-starred'
    const readClass = mail.isRead ? 'read' : 'unread'
    const readTitle = mail.isRead ? 'unread' : 'read'
    const archiveTitle = mail.removedAt ? 'Restore' : 'Archive'

    return (
        <tr className={`mail-preview ${readClass}`}>

            <td className="star-icon-address">
                {!mail.isStarred && <i onClick={() => onStarClicked(mail.id)} className={`icon star-icon ${starredClass} fa-regular fa-star`} title={starredClass}></i>}
                {mail.isStarred && <i onClick={() => onStarClicked(mail.id)} className={`icon star-icon ${starredClass} fa-solid fa-star`} title={starredClass}></i>}
                <Link to={mail.id}>{mail.from}</Link>
            </td>
            <td className="subject-body-icons">
                <div className="subject-body">
                    <Link to={mail.id}>
                        <span className="subject">{mail.subject}</span>
                        <span className="body">{mail.body}</span>
                    </Link>
                </div>
                <span onClick={(ev) => ev.stopPropagation()} className="icons">
                    <i onClick={() => onArchiveMail(mail.id)} className="icon arhcive-icon fa-solid fa-box-archive" title={archiveTitle}></i>
                    <i onClick={() => onRemoveMail(mail.id)} className="icon delete-icon fa-regular fa-trash-can" title="Delete"></i>
                    <i onClick={() => onMarkAsRead(mail.id)} className="icon mark-as-read-icon fa-regular fa-envelope" title={`Mark as ${readTitle}`}></i>
                </span>
            </td>
            <td className="date">{formatTimestamp(mail.sentAt)}</td>
        </tr>
    )
}