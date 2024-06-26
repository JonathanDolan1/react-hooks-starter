

export function MailPreview({ mail ,onArchiveMail}) {

    function formatTimestamp(timestamp) {
        if (!timestamp) return 'NO DATE'
        const currentTimestamp = new Date().getTime();
        const date = new Date(timestamp);
      
        // Check if the timestamp is within the current year
      const currentYear = new Date().getFullYear();
        if (date.getFullYear() === currentYear) {
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const month = monthNames[date.getMonth()];
          const day = date.getDate();
          return `${month} ${day}`;
        }
      
        // Check if the timestamp is within the current day
      const currentDate = new Date().toDateString();
        if (date.toDateString() === currentDate) {
          const hours = date.getHours();
          const ampm = hours < 12 ? "AM" : "PM";
          hours = hours % 12;
          hours = hours ? hours : 12;
          const minutes = date.getMinutes();
          const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
          return `${hours}:${formattedMinutes} ${ampm}`;
        }
      
        // Default format: m/d/yy
      const month = (date.getMonth() + 1).toString()
        const day = date.getDate().toString()
        const year = date.getFullYear().toString().substr(2, 2);
        return `${month}/${day}/${year}`;
      }
      

    const readClass = mail.isRead ? 'read' : 'unread'
    
    return (
        <tr className={`mail-preview ${readClass}`}>
            <td className="from">{mail.from}</td>
            <td className="subject-body-icons">
                <div className="subject-body">
                    <span className="subject">{mail.subject}</span>
                    <span className="body">{mail.body}</span>
                </div>
                <span className="icons">
                    <i onClick={()=>onArchiveMail(mail.id)} className="fa-solid fa-box-archive"></i>
                    <i className="fa-regular fa-trash-can"></i>
                    <i className="fa-regular fa-envelope"></i>
                </span>
            </td>
            <td className="sent-at">{formatTimestamp(mail.sentAt)}</td>
        </tr>


        // <tr>{JSON.stringify(mail)}</tr>
    )
}