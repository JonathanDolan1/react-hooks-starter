import { showErrorMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import {MailEdit} from "../cmps/MailEdit.jsx"

const { useState, useEffect } = React

export function MailDetails({ mailId }) {

    const [mail, setMail] = useState()

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

    const { subject, from, sentAt, body, to } = mail

    return (
        <section className="mail-details">

            <div className="icons top-icons">
                <div className="top-left-icons">
                    <i className="icon fa-solid fa-arrow-left"></i>
                    <i className="icon fa-solid fa-box-archive"></i>
                    <i className="icon fa-solid fa-ban"></i>
                    <i className="icon fa-regular fa-trash-can"></i>
                    <i className="icon fa-regular fa-envelope"></i>
                </div>
                <div className="top-right-icons">
                    <i className="icon fa-solid fa-angle-left"></i>
                    <i className="icon fa-solid fa-angle-right"></i>
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

                    <i class="fa-regular fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-face-grin"></i>
                    <i class="fa-solid fa-reply"></i>
                    <i class="fa-solid fa-ellipsis-vertical"></i>

                </div>
            </div>

            <div className="body">{body}</div>

        </section>
    )

}