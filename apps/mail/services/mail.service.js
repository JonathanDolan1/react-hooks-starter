import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { mailDemoDataService } from './mail-demo-data.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getNewMail,
    // getDefaultFilter,
    // getFilterFromSearchParams
}


function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {

            // if (filterBy.txt) {
            //     const regExp = new RegExp(filterBy.txt, 'i')
            //     mails = mails.filter(mail => regExp.test(mail.vendor))
            // }
            // if (filterBy.minSpeed) {
            //     mails = mails.filter(mail => mail.speed >= filterBy.minSpeed)
            // }
            return mails
        })
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
    sentAt = null,
    removedAt = null,
    from = mailDemoDataService.getLoggedInUser().email,
    to = '') {
    return { createdAt, subject, body, isRead, sentAt, removedAt, from, to }
}

// function getDefaultFilter() {
//     return { txt: '', minSpeed: '' }
// }


// function getFilterFromSearchParams(searchParams) {
//     // return Object.fromEntries(searchParams)
//     const txt = searchParams.get('txt') || ''
//     const minSpeed = searchParams.get('minSpeed') || ''
//     return {
//         txt,
//         minSpeed
//     }
// }


function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = mailDemoDataService.createDemoMails()
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

// function _createMail(vendor, speed = 250) {
//     const mail = getNewMail(vendor, speed)
//     mail.id = utilService.makeId()
//     return mail
// }


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

function getLoggedInUser(){
    return loggedinUser
}