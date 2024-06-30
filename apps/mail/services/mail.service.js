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
    getMailDraftIdObjFromSearchParams,
    getAllSearchParams,
    formatTimestamp,

    // getDefaultFilter,
}

function query(searchParams = {}) {


    return storageService.query(MAIL_KEY)
        .then(mails => {

            const { filterBy, sortBy } = searchParams

            const { folder, txt, isRead, isStarred } = { ...filterBy }

            if (isStarred.toString() === 'true') mails = mails.filter(mail => mail.isStarred)

            if (txt) {
                const regex = new RegExp(txt, 'i')
                mails = mails.filter(mail =>
                    regex.test(mail.subject) || regex.test(mail.body) || regex.test(mail.from) || regex.test(mail.to)
                )
            }

            switch (folder) {
                case 'all':
                    break
                case '':
                case 'inbox':
                    mails = mails.filter(mail => mail.to === mailDemoDataService.getLoggedInUser().email && !mail.removedAt)
                    break
                case 'starred':
                    mails = mails.filter(mail => mail.isStarred)
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

            if (isRead) mails = mails.filter(mail => mail.isRead.toString() === isRead)

            if (filterBy.categories) {
                const categories = filterBy.categories.split('0')
                mails = mails.filter(mail => _isMailHasSomeCategory(mail, categories))
                function _isMailHasSomeCategory(mail, categories) {
                    return categories.some(category => mail.categories.includes(category))
                }
            }

            if (!sortBy.sortType) {
                sortBy.sortType = 'date'
                sortBy.sortDir = 1
            }

            const { sortType, sortDir } = { ...sortBy }

            switch (sortType) {
                case 'date':
                    mails = mails.toSorted((m1, m2) => {
                        const m1Date = m1.sentAt || m1.createdAt
                        const m2Date = m2.sentAt || m2.createdAt
                        return ((m1Date - m2Date) * -sortDir)
                    })
                    break
                case 'subject':
                    mails = mails.toSorted((m1, m2) => m1.subject.localeCompare(m2.subject) * sortDir)
                    break
            }

            return mails
        })
        .catch(err => showErrorMsg('Error fetching mails: ' + err))

}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
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
    isStarred = false,
    sentAt = null,
    removedAt = null,
    from = mailDemoDataService.getLoggedInUser().email,
    to = '') {
    return { createdAt, subject, body, isRead, isStarred, sentAt, removedAt, from, to }
}

// function getDefaultFilter() {
//     return { txt: '', minSpeed: '' }
// }

function getFilterFromSearchParams(searchParams) {

    const folder = searchParams.get('folder') || ''
    const txt = searchParams.get('txt') || ''
    const isRead = searchParams.get('isRead') || ''
    const isStarred = searchParams.get('isStarred') || ''
    const categories = searchParams.get('categories') || ''

    return {
        folder,
        txt,
        isRead,
        isStarred,
        categories
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

function getMailDraftIdObjFromSearchParams(searchParams) {
    const mailDraftId = searchParams.get('mailDraftId') || ''
    return { mailDraftId }
}

function getAllSearchParams(searchParams) {
    return { ...getFilterFromSearchParams(searchParams), ...getSortFromSearchParams(searchParams), ...getMailDraftIdObjFromSearchParams(searchParams) }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = mailDemoDataService.createDemoMails()
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function formatTimestamp(timestamp) {
    if (!timestamp) return 'NO DATE'
    const date = new Date(timestamp);

    // Check if the timestamp is within the current day
    const currentDate = new Date().toDateString();
    if (date.toDateString() === currentDate) {
        let hours = date.getHours()
        const ampm = hours < 12 ? "AM" : "PM"
        hours = hours % 12
        hours = hours ? hours : 12
        const minutes = date.getMinutes()
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes
        return `${hours}:${formattedMinutes} ${ampm}`
    }

    // Check if the timestamp is within the current year
    const currentYear = new Date().getFullYear()
    if (date.getFullYear() === currentYear) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const month = monthNames[date.getMonth()]
        const day = date.getDate()
        return `${month} ${day}`
    }

    // Default format: m/d/yy
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate().toString()
    const year = date.getFullYear().toString().substr(2, 2)
    return `${month}/${day}/${year}`
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}