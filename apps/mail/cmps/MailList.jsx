import { MailPreview } from "./MailPreview.jsx"

export function MailList({mails, onArchiveMail}) {


    return (
        <table className="mail-list">
            <tbody>
            {mails.map(mail =>
                    <MailPreview key={mail.id} mail={mail} onArchiveMail={onArchiveMail}/>
            )}
            </tbody>
        </table>
    )
}
