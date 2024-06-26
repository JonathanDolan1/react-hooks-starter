import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailEdit({ setMailDraftIdObj, loadMails, mailId, onCreateNoteFromMail }) {

    const [mailDraft, setMailDraft] = useState(null)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        mailService.get(mailId)
            .then(setMailDraft)
            .catch(err => showErrorMsg('Error fetching mail draft: ' + err))
    }
        , [mailId])

    useEffect(() => {
        if (mailDraft) {
            saveMailDraft(mailDraft)
            if (mailDraft.sentAt) {
                showSuccessMsg('Mail sent successfuly')
                onCloseEdit()
            }
        }
    }, [mailDraft])

    function saveMailDraft(mail) {
        mailService.save(mail)
            .catch(err => showErrorMsg('Error saving the draft: ' + err))
    }

    function onCloseEdit() {
        setSearchParams({ ...mailService.getAllSearchParams(searchParams), mailDraftId: '' })
        setMailDraftIdObj({ mailDraftId: '' })
        loadMails()
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setMailDraft(prevMailDraft => ({ ...prevMailDraft, [field]: value }))
    }

    function onSendMail(ev) {
        ev.preventDefault()
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(mailDraft.to)) {
            showErrorMsg(`'To' email address isn't valid`)
            return
        }
        setMailDraft(prevMailDraft => ({ ...prevMailDraft, sentAt: Date.now() }))
    }

    return (
        <section className="mail-edit">
            {!mailDraft && <section className="loading">Loading...</section>}
            {mailDraft &&
                <React.Fragment>
                    <div className="title-icons">
                        <span className="title">New Message</span>
                        <span className="icons">
                            <i className="icon fa-solid fa-note-sticky" onClick={() => onCreateNoteFromMail(mailDraft.body)}></i>
                            <i className="icon fa-solid fa-up-right-and-down-left-from-center"></i>
                            <i className="icon fa-solid fa-window-minimize"></i>
                            <i className="icon fa-solid fa-xmark" onClick={onCloseEdit}></i>
                        </span>
                    </div>

                    <form className="mail-edit-form" onSubmit={onSendMail}>
                        <div className="input-container from-container">
                            <label htmlFor="from">From</label>
                            <input onChange={handleChange} type="email" value={mailDraft.from} id="from" name="from" disabled></input>
                        </div>
                        <div className="input-container to-container">
                            <label htmlFor="to">To</label>
                            <input onChange={handleChange} type="email" id="to" value={mailDraft.to} name="to"></input>
                        </div>
                        <div className="input-container subject-container">
                            <input onChange={handleChange} type="text" placeholder="Subject" value={mailDraft.subject} name="subject"></input>
                        </div>
                        <div className="input-container body-container">

                            <textarea onChange={handleChange} className="input-body" value={mailDraft.body} name="body"></textarea>

                        </div>
                        <div>
                            <button className="btn-send">Send</button>
                            <button className="btn-schedule-send"><i className="icon fa-solid fa-caret-down"></i></button>
                        </div>
                    </form>
                </React.Fragment>
            }
        </section>
    )

}