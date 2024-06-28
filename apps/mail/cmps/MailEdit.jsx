import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailEdit({ setMails }) {

    const [mailDraft, setMailDraft] = useState(null)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        mailService.get(searchParams.get('mailDraftId'))
            .then(setMailDraft)
            .catch(err => showErrorMsg('Error fetching mail draft: ' + err))
    }
        , [])

    useEffect(() => {
        if (mailDraft) {
            onSaveMailDraft(mailDraft)
            if (mailDraft.sentAt) {
                showSuccessMsg('Mail sent successfuly')
                setMails(prevMails => [mailDraft, ...prevMails.filter(mail=>mail.id!==mailDraft.id)])
                onCloseEdit()
            }
        }
    }, [mailDraft])

    function onSaveMailDraft(mail) {
        mailService.save(mail)
            .catch(err => showErrorMsg('Error saving the draft: ' + err))
    }

    function onCloseEdit() {
        setSearchParams({ ...searchParams, mailDraftId: '' })
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

    if (!mailDraft) return <section className="loading">Loading...</section>

    return (
        <section className="mail-edit">
            <div className="title-icons">
                <span className="title">New Message</span>
                <span className="icons">
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

        </section>
    )

}