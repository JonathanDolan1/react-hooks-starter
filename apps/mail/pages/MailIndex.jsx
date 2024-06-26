import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailSort } from "../cmps/MailSort.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { MailDetails } from "../cmps/MailDetails.jsx"
import { MailEdit } from "../cmps/MailEdit.jsx"
import { MailCategoriesList } from "../cmps/MailCategoriesList.jsx"
import { noteService } from "../../note/services/note.service.js"
import { MailHeader } from "../cmps/MailHeader.jsx"

const { useState, useEffect } = React
const { useParams, useSearchParams, useNavigate } = ReactRouterDOM

export function MailIndex() {
    
    const { mailId: selectedMailId } = useParams()

    const [searchParams, setSearchParams] = useSearchParams()

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [sortBy, setSortBy] = useState(mailService.getSortFromSearchParams(searchParams))
    const [mailDraftIdObj, setMailDraftIdObj] = useState(mailService.getMailDraftIdObjFromSearchParams(searchParams))

    const navigate = useNavigate()

    useEffect(() => {
        loadMails()
        setSearchParams({ ...filterBy, ...sortBy, ...mailDraftIdObj })
    }, [filterBy, sortBy, mailDraftIdObj])

    function loadMails() {
        mailService.query({ filterBy, sortBy })
            .then(setMails)
            .catch(err => showErrorMsg('Error fetching mails from storage: ' + err))
    }

    function onAddMail() {
        mailService.save(mailService.getNewMail())
            .then(mail => {
                // setMailDraftIdObj(()=>({ mailDraft: mail.id }))
                setSearchParams({ ...filterBy, ...sortBy, mailDraftId: mail.id })
            })
    }

    function onRemoveMail(id) {
        mailService.remove(id)
            .then(() => {
                unrenderMail(id)
                showSuccessMsg(`Mail ${id} removed successfuly`)
            })
            .catch(err => showErrorMsg(`Error removing mail ${id}: ` + err))
    }

    function onArchiveMail(id) {
        mailService.get(id)
            .then(mail => {
                const archiveRestoreStr = mail.removedAt ? 'archived' : 'restored'
                mail.removedAt = mail.removedAt ? null : Date.now()
                mailService.save(mail)
                showSuccessMsg(`Mail ${id} ${archiveRestoreStr} successfuly`)
                if (filterBy.folder !== 'all') unrenderMail(id)
            })
            .catch(err => showErrorMsg('Error archiving the mail: ' + err))
    }

    function unrenderMail(id) {
        setMails(prevMails => prevMails.filter(mail => mail.id !== id))
    }

    function onToggleReadStatus(id) {
        updateMailState(id, 'isRead')
    }

    function onStarClicked(id) {
        updateMailState(id, 'isStarred')
    }

    function updateMailState(id, val) {
        mailService.get(id)
            .then(mail => {
                mail[val] = !mail[val]
                mailService.save(mail)
                    .then(mail => {
                        if (!filterBy[val]) {
                            setMails(prevMails => {
                                const idx = prevMails.findIndex(mail => mail.id === id)
                                const newMails = [...prevMails]
                                newMails.splice(idx, 1, mail)
                                return newMails
                            })
                        } else loadMails()
                    })
            })
            .catch(err => {
                const errStr = val === 'isStarred' ? `Error star marking: ` : `Error marking the mail as un/read: `
                showErrorMsg(errStr + err)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSetSort(sortBy) {
        setSortBy(prevSort => ({ ...prevSort, ...sortBy }))
    }

    function onCreateNoteFromMail(mailContent) {
        const type = 'NoteText'
        const content = mailContent
        const newNote = noteService.createUserNote(type, content)
        noteService.save(newNote)
            .then(() => navigate('/note'))
            .catch(err => showErrorMsg('Error creating a note from mail: ' + err))
    }

    if (!mails) return <section className="loading">Loading...</section>

    const mailDraftId = mailService.getMailDraftIdObjFromSearchParams(searchParams).mailDraftId
    const selectedFolder = filterBy.folder
    const selectedSort = { ...sortBy }
    const selectedCategories = filterBy.categories ? filterBy.categories.split('0') : []
    const searchTxt = {...filterBy}.txt
    const {isRead,isStarred} = {...filterBy}
    const selectedCategoriesSet = new Set([...selectedCategories])
    
    return (
        <section className="mail-index">
            <MailHeader txt={searchTxt} onSetFilter={onSetFilter}/>
            <div className="btn-edit-mail-mail-folder-list-mail-categories-list">
                <button className="btn-edit-mail" onClick={onAddMail}><i className="fa-solid fa-pencil"></i> <span>Compose</span></button>
                <MailFolderList selectedFolder={selectedFolder} onSetFilter={onSetFilter} />
                <MailCategoriesList selectedCategoriesSet={selectedCategoriesSet} onSetFilter={onSetFilter}/>
            </div>
            {!selectedMailId &&
                <div className="mail-filter-mail-list-mail-sort">
                    <div className="mail-filter-mail-sort">
                        <MailFilter isRead={isRead} isStarred={isStarred} onSetFilter={onSetFilter} />
                        <MailSort sortBy={selectedSort} onSetSort={onSetSort} />
                    </div>
                    <MailList mails={mails} onRemoveMail={onRemoveMail} onArchiveMail={onArchiveMail} onToggleReadStatus={onToggleReadStatus} onStarClicked={onStarClicked} />
                </div>}
            {selectedMailId &&
                <MailDetails mailId={selectedMailId} onArchiveMail={onArchiveMail} onRemoveMail={onRemoveMail} onToggleReadStatus={onToggleReadStatus} onStarClicked={onStarClicked}/>}
            {mailDraftId && <MailEdit loadMails={loadMails} setMailDraftIdObj={setMailDraftIdObj} mailId={mailDraftId} onCreateNoteFromMail={onCreateNoteFromMail}/>}
        </section>
    )
}

