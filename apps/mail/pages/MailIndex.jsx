import { MailList } from "../cmps/MailList.jsx"
import { mailService } from '../services/mail.service.js'


const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    
    
    useEffect(()=>{
        mailService.query()
            .then(setMails)
            .catch(err=>console.log('error fetching mails from storage: ' , err))
    },[])

    if (!mails) return <section className="loading">Loading...</section>

    return (
        <section className="mail-index">
            <MailList mails={mails} />
        </section>
    )
}

