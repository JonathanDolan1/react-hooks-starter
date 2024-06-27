import { showErrorMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailDetails({ mailId }) {

    const [mail, setMail] = useState()

    useEffect(() => {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => showErrorMsg('error fetching the mail :', err))
    }, [])

    if (!mail) return <section className="loading">Loading...</section>

    return (
        <section className="mail-details">
            <span className="subject">{mail.subject}</span>
            <div className="from-date-icons">
                <span className="from">{mail.from}</span>
                <div className="date-icons">
                    <span className="date">{mail.date}</span>
                    <div className="icons">

                    </div>
                </div>
                <div className="body">{mail.body}</div>

            </div>
            {/* {JSON.stringify(mail)} */}
        </section>
    )

}