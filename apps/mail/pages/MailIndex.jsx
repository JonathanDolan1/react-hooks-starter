import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)


    useEffect(() => {
        mailService.query()
            .then(setMails)
            .catch(err => showErrorMsg('Error fetching mails from storage: ', err))
    }, [])

    function onArchiveMail(id) {
        mailService.get(id)
            .then(mail => {
                mail.removedAt = Date.now()
                showSuccessMsg(`Mail ${id} archived successfuly`)
            })
            .catch(err => showErrorMsg('Error archiving the mail: ' , err))
    }

    if (!mails) return <section className="loading">Loading...</section>

    return (
        <section className="mail-index">
            <MailFolderList />
            <MailList mails={mails} onArchiveMail={onArchiveMail}/>
        </section>
    )
}

