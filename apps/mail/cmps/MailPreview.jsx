import { mailDemoDataService } from "../services/mail-demo-data.service.js"
import { mailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, onArchiveMail, onMarkAsRead, onStarClicked }) {

    const { isStarred, isRead, removedAt, id, subject, sentAt, body, from, to, createdAt } = mail

    const starredClass = isStarred ? 'starred' : 'not-starred'
    const readClass = isRead ? 'read' : 'unread'
    const readTitle = isRead ? 'unread' : 'read'
    const archiveTitle = removedAt ? 'Restore' : 'Archive'
    const isDraft = !sentAt ? true : false
    const isIn = to === mailDemoDataService.getLoggedInUser().email ? true : false

    return (
        <tr className={`mail-preview ${readClass}`}>

            <td className="star-icon-address">
                {!isStarred && <i onClick={() => onStarClicked(id)} className={`icon star-icon ${starredClass} fa-regular fa-star`} title={starredClass}></i>}
                {isStarred && <i onClick={() => onStarClicked(id)} className={`icon star-icon ${starredClass} fa-solid fa-star`} title={starredClass}></i>}
                <Link to={id}>
                    {(isIn ? from : to)}
                    {isDraft && to && ', '}
                    {isDraft && <span className="span-draft">Draft</span>}
                </Link>
            </td>
            <td className="subject-body-icons">
                <div className="subject-body">
                    <Link to={id}>
                        <span className="subject">{subject}</span>
                        <span className="body">{body}</span>
                    </Link>
                </div>
                <span onClick={(ev) => ev.stopPropagation()} className="icons">
                    <i onClick={() => onArchiveMail(id)} className="icon arhcive-icon fa-solid fa-box-archive" title={archiveTitle}></i>
                    <i onClick={() => onRemoveMail(id)} className="icon delete-icon fa-regular fa-trash-can" title="Delete"></i>
                    <i onClick={() => onMarkAsRead(id)} className="icon mark-as-read-icon fa-regular fa-envelope" title={`Mark as ${readTitle}`}></i>
                </span>
            </td>
            <td className="date">{mailService.formatTimestamp(isDraft ? createdAt : sentAt)}</td>
        </tr>
    )
}