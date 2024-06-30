import { showErrorMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { mailDemoDataService } from "../services/mail-demo-data.service.js"

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function MailDetails({ mailId, onArchiveMail, onRemoveMail, onToggleReadStatus, onStarClicked }) {

    const [mail, setMail] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        mailService.get(mailId)
            .then((mail) => {
                if (!mail.isRead) {
                    mail.isRead = true
                    mailService.save(mail)
                }
                setMail(mail)
            })
            .catch(err => showErrorMsg('error fetching the mail:' + err))
    }, [])

    if (!mail) return <section className="loading">Loading...</section>


    const { id, subject, from, sentAt, body, to, isStarred, removedAt, prevMailId, nextMailId } = mail

    function navigateToPrevMail() {
        navigate(`/mail/${prevMailId}`)
        navigate(0)
    }

    function navigateToNextMail() {
        navigate(`/mail/${nextMailId}`)
        navigate(0)
    }

    function onReply() {
        const mail = mailService.getNewMail()
        mail.subject = 'Re: ' + subject
        const isIn = to === mailDemoDataService.getLoggedInUser().email ? true : false
        mail.to = isIn ? from : to
            mailService.save(mail)
                .then(mail => navigate(`?mailDraftId=${mail.id}`))
    }

    const starredClass = isStarred ? 'starred' : 'not-starred'
    const archiveTitle = removedAt ? 'Restore' : 'Archive'

    return (
        <section className="mail-details">

            <div className="icons top-icons">
                <div className="top-left-icons">
                    <i onClick={() => navigate('/mail/list')} className="icon fa-solid fa-arrow-left" title="Back to inbox"></i>
                    <i onClick={() => onArchiveMail(id)} className="icon arhcive-icon fa-solid fa-box-archive" title={archiveTitle}></i>
                    <i className="icon fa-solid fa-ban" title="Report spam (On dev)"></i>
                    <i onClick={() => onRemoveMail(id)} className="icon delete-icon fa-regular fa-trash-can" title="Delete"></i>
                    <i onClick={() => onToggleReadStatus(id)} className="icon mark-as-read-icon fa-regular fa-envelope" title='Mark as unread'></i>
                </div>
                <div className="top-right-icons">
                    <i onClick={navigateToPrevMail} className="icon fa-solid fa-angle-left" title="Newer"></i>
                    <i onClick={navigateToNextMail} className="icon fa-solid fa-angle-right" title="Older"></i>
                </div>
            </div>

            <div className="subject">{subject}</div>

            <div className="from-to-date-icons">
                <div className="from-to">
                    <div className="from">{from}</div>
                    <div className="to">to {to}</div>
                </div>
                <div className="date-middle-icons">
                    <div className="date">{mailService.formatTimestamp(sentAt)}</div>

                    {!isStarred && <i onClick={() => onStarClicked(id)} className={`icon star-icon ${starredClass} fa-regular fa-star`} title={starredClass}></i>}
                    {isStarred && <i onClick={() => onStarClicked(id)} className={`icon star-icon ${starredClass} fa-solid fa-star`} title={starredClass}></i>}
                    <i className="icon fa-regular fa-face-grin" title="Add reaction"></i>
                    <i onClick={onReply} className="icon fa-solid fa-reply" title="Reply"></i>
                    <i className="icon fa-solid fa-ellipsis-vertical" title="More"></i>

                </div>
            </div>

            <div className="body">{body}</div>

        </section>
    )

}