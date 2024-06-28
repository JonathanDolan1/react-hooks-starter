import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailSort } from "../cmps/MailSort.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { MailDetails } from "../cmps/MailDetails.jsx"
import { MailEdit } from "../cmps/MailEdit.jsx"


const { useState, useEffect } = React
const { useParams, useSearchParams } = ReactRouterDOM

export function MailIndex() {


    const { mailId: selectedMailId } = useParams()

    const [searchParams, setSearchParams] = useSearchParams()

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [sortBy, setSortBy] = useState(mailService.getSortFromSearchParams(searchParams))


    useEffect(() => {
        loadMails()
        setSearchParams({ ...filterBy, ...sortBy })
    }, [filterBy, sortBy])

    function loadMails() {
        mailService.query({filterBy,sortBy})
            .then(setMails)
            .catch(err => showErrorMsg('Error fetching mails from storage: ', err))
    }

    function onAddMail() {
        mailService.save(mailService.getNewMail())
            .then(mail => setSearchParams({ ...searchParams, mailDraftId: mail.id }))
    }

    function onRemoveMail(id) {
        mailService.remove(id)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== id))
                showSuccessMsg(`Mail ${id} removed successfuly`)
            })
            .catch(err => showErrorMsg(`Error removing mail ${id}: `, err))
    }

    function onArchiveMail(id) {
        mailService.get(id)
            .then(mail => {
                const archiveRestoreStr = mail.removedAt ? 'archived' : 'restored'
                mail.removedAt = mail.removedAt ? null : Date.now()
                mailService.save(mail)
                showSuccessMsg(`Mail ${id} ${archiveRestoreStr} successfuly`)
            })
            .catch(err => showErrorMsg('Error archiving the mail: ', err))
    }

    function onMarkAsRead(id) {
        mailService.get(id)
            .then(mail => {
                mail.isRead = !mail.isRead
                mailService.save(mail)
                    .then(mail => setMails(prevMails => [mail, ...prevMails.filter(prevMail => prevMail.id !== mail.id)]))
            })
            .catch(err => showErrorMsg(`Error marking the mail as un/read: `, err))
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSetSort(sortBy){
        setSortBy(prevSort => ({ ...prevSort, ...sortBy }))
    }

    if (!mails) return <section className="loading">Loading...</section>

    const mailDraftId = searchParams.get('mailDraftId')
    const selectedFolder = filterBy.folder
    const selectedSort = {...sortBy}

    return (
        <section className="mail-index">
            <div className="btn-edit-mail-mail-folder-list">
                <button className="btn-edit-mail" onClick={onAddMail}><i className="fa-solid fa-pencil"></i> <span>Compose</span></button>
                <MailFolderList selectedFolder={selectedFolder} onSetFilter={onSetFilter} />
            </div>
            {!selectedMailId &&
                <div className="mail-filter-mail-list-mail-sort">
                    <div className="mail-filter-mail-sort">
                    <MailFilter filterBy={filterBy} onSetFilter={onSetFilter}/>
                    <MailSort sortBy={selectedSort} onSetSort={onSetSort}/>
                    </div>
                    <MailList mails={mails} onRemoveMail={onRemoveMail} onArchiveMail={onArchiveMail} onMarkAsRead={onMarkAsRead} />
                </div>}
            {selectedMailId &&
                <MailDetails mailId={selectedMailId} />}
            {mailDraftId && <MailEdit setMails={setMails} />}
        </section>
    )
}

