

export function MailPreview({mail}){

    function formatDate(timestamp) {
        const date = new Date(timestamp)
      
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const year = String(date.getFullYear()).substring(2)
      
        return `${month}/${day}/${year}`
      }

      const readClass = mail.isRead ? 'read' : ''
    return (
        <tr className={`mail-preview ${readClass}`}>
            <td className="from">{mail.from}</td>
            <td className="subject-and-body">
                <span className="subject">{mail.subject}</span>
                <span className="body">{mail.body}</span>
            </td>
            <td className="sent-at">{formatDate(mail.sentAt)}</td>
        </tr>


        // <tr>{JSON.stringify(mail)}</tr>
    )
}