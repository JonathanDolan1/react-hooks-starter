import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { MailDetails } from "../cmps/MailDetails.jsx"

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function MailIndex() {
    const [mails, setMails] = useState(null)
    // const [selecetedMail, setSelectedMail] = useState(null)


    const { mailId: selectedMailId } = useParams()


    useEffect(() => {
        mailService.query()
            .then(setMails)
            .catch(err => showErrorMsg('Error fetching mails from storage: ', err))
    }, [])

    function onArchiveMail(id) {
        mailService.get(id)
            .then(mail => {
                mail.removedAt = Date.now()
                mailService.save(mail)
                showSuccessMsg(`Mail ${id} archived successfuly`)
            })
            .catch(err => showErrorMsg('Error archiving the mail: ', err))
    }

    if (!mails) return <section className="loading">Loading...</section>

    console.log(mails[3])

    return (
        <section className="mail-index">
            <MailFolderList />
            {!selectedMailId && <MailList mails={mails} onArchiveMail={onArchiveMail} />}
            {selectedMailId && <MailDetails mailId={selectedMailId} />}
        </section>
    )
}

