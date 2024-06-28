import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { mailDemoDataService } from './mail-demo-data.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getNewMail,
    getFilterFromSearchParams,
    getSortFromSearchParams,
    // getDefaultFilter,
}


function query(searchParams = {}) {

    return storageService.query(MAIL_KEY)
        .then(mails => {

            const { filterBy, sortBy } = searchParams

            const { searchType, txt } = filterBy

            switch (searchType) {
                case 'txt':
                    if (txt) {
                        const regex = new RegExp(txt, 'i')
                        mails = mails.filter(mail =>
                            regex.test(mail.subject) || regex.test(mail.body) || regex.test(mail.from) || regex.test(mail.to)
                        )
                    }
                    break
            }



            if (!filterBy.folder) filterBy.folder = 'inbox'
            switch (filterBy.folder) {
                case 'inbox':
                    mails = mails.filter(mail => mail.to === mailDemoDataService.getLoggedInUser().email && !mail.removedAt)
                    break
                case 'sent':
                    mails = mails.filter(mail => mail.from === mailDemoDataService.getLoggedInUser().email && mail.sentAt)
                    break
                case 'trash':
                    mails = mails.filter(mail => mail.removedAt)
                    break
                case 'drafts':
                    mails = mails.filter(mail => !mail.sentAt)
                    break
            }



            if (!sortBy.sortType) {
                sortBy.sortType = 'date'
                sortBy.sortDir = 1
            }

            const { sortType, sortDir } = sortBy

            switch (sortType) {
                case 'date':
                    mails = mails.toSorted((m1, m2) => (m1.sentAt - m2.sentAt) * -sortDir)
                    break
                case 'subject':
                    mails = mails.toSorted((m1, m2) => m1.subject.localeCompare(m2.subject) * sortDir)
                    break
            }


            return mails
        })

}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
    // .then(mail => _setNextPrevMailId(mail))
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getNewMail(
    createdAt = Date.now(),
    subject = '',
    body = '',
    isRead = false,
    sentAt = null,
    removedAt = null,
    from = mailDemoDataService.getLoggedInUser().email,
    to = '') {
    return { createdAt, subject, body, isRead, sentAt, removedAt, from, to }
}

// function getDefaultFilter() {
//     return { txt: '', minSpeed: '' }
// }

function getFilterFromSearchParams(searchParams) {

    const folder = searchParams.get('folder') || ''
    const txt = searchParams.get('txt') || ''

    return {
        folder,
        txt
    }
}

function getSortFromSearchParams(searchParams) {

    const sortType = searchParams.get('sortType') || ''
    const sortDir = +searchParams.get('sortDir') || ''

    return {
        sortType,
        sortDir
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = mailDemoDataService.createDemoMails(50)
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

// function _setNextPrevMailId(mail) {
//     return storageService.query(MAIL_KEY).then((mails) => {
//         const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
//         const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
//         const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
//         mail.nextMailId = nextMail.id
//         mail.prevMailId = prevMail.id
//         return mail
//     })
// }