import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail, onArchiveMail, onToggleReadStatus, onStarClicked }) {

    return (
        <table className="mail-list">
            <tbody>
                {mails.map(mail =>
                    <MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail} onArchiveMail={onArchiveMail} onToggleReadStatus={onToggleReadStatus} onStarClicked={onStarClicked} />
                )}
            </tbody>
        </table>
    )
}
