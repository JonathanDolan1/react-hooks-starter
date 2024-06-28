import { showErrorMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailDetails({ mailId }) {

    const [mail, setMail] = useState()

    useEffect(() => {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => showErrorMsg('error fetching the mail:' + err))
    }, [])

    if (!mail) return <section className="loading">Loading...</section>

    const { subject, from, sentAt, body } = mail

    return (
        <section className="mail-details">
            <span className="subject">{subject}</span>
            <div className="from-date-icons">
                <span className="from">{from}</span>
                <div className="date-icons">
                    <span className="date">{mailService.formatTimestamp(sentAt)}</span>
                    <div className="icons">

                    </div>
                </div>
                <div className="body">{body}</div>

            </div>
            {/* {JSON.stringify(mail)} */}
        </section>
    )

}