import { MailPreview } from "./MailPreview.jsx"

export function MailList({mails}) {


    return (
        <table className="mail-list">
            <tbody>
            {mails.map(mail =>
                    <MailPreview key={mail.id} mail={mail}/>
            )}
            </tbody>
        </table>
    )
}
