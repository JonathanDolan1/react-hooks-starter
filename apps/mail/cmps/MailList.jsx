import { MailPreview } from "./MailPreview.jsx"

export function MailList({mails, onRemoveMail, onArchiveMail, onMarkAsRead, onStarClicked}) {

    return (
        <table className="mail-list">
            <tbody>
            {mails.map(mail =>
                    <MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail} onArchiveMail={onArchiveMail} onMarkAsRead={onMarkAsRead} onStarClicked={onStarClicked}/>
            )}
            </tbody>
        </table>
    )
}
