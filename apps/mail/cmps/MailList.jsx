import { MailPreview } from "./MailPreview.jsx"

export function MailList({mails, onArchiveMail, onMarkAsRead}) {

    return (
        <table className="mail-list">
            <tbody>
            {mails.map(mail =>
                    <MailPreview key={mail.id} mail={mail} onArchiveMail={onArchiveMail} onMarkAsRead={onMarkAsRead}/>
            )}
            </tbody>
        </table>
    )
}
