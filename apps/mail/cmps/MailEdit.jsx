
export function MailEdit() {

    return (
        <section className="mail-edit">
            <div className="title-icons">
                <span className="title">New Message</span>
                <span className="icons">
                    <i class="fa-solid fa-window-minimize"></i>
                    <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </div>
            {/* <div className="body-container"> */}

                <form className="mail-edit-form">
                    <div className="input-container from-container">
                        <label htmlFor="from">From</label>
                        <input type="email" value="yonidolan@gmail.com" id="from" name="from" disabled></input>
                    </div>
                    <div className="input-container to-container">
                        <label htmlFor="to">To</label>
                        <input type="email" id="to" name="to"></input>
                    </div>
                    <div className="input-container subject-container">
                        <input type="text" placeholder="Subject" name="subject"></input>
                    </div>
                    <div className="input-container body-container">
                        <textarea className="input-body" name="body">jkdfkjsfkjsd</textarea>
                        {/* <input type="text" name="body"></input> */}
                    </div>
                </form>
            {/* </div> */}
        </section>
    )

}