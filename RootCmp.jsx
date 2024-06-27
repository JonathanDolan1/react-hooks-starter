const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { MailList } from "./apps/mail/cmps/MailList.jsx"
import { MailDetails } from "./apps/mail/cmps/MailDetails.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <main className="main-layout">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />} >
                        <Route path="/mail/list" element={<MailList/>}/>
                        <Route path="/mail/:mailId" element={<MailDetails/>}/>
                    </Route>
                    <Route path="/note" element={<NoteIndex />} />
                </Routes>
            </main>
            <UserMsg />
        </section>
    </Router>
}
