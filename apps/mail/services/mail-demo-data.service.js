import { utilService } from "../../../services/util.service.js"

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const _demoMailsLength = 50

export const mailDemoDataService = {
    createDemoMails,
    getLoggedInUser
}

function getLoggedInUser() {
    return loggedinUser
}

function createDemoMails(length = _demoMailsLength) {
    const mails = []
    for (var i = 0; i < length; i++) {
        let mail = {
            id: utilService.makeId(),
            subject: _generateRandomSubject(),
            body: _generateRandomBody(),
            isRead: _getRandomTrueFalse(),
            ..._getRandomFromAndTo(),
        }
        const timestamps = _generateTimestamps(mail.to)
        mail = {...mail,...timestamps}
        mails.push(mail)
    }
    return mails
}

function _generateRandomSubject() {
    const adjectives = [
        'Important', 'Urgent', 'Interesting', 'Exciting', 'Critical', 'Informative', 'Time-sensitive'
    ]
    const verbs = [
        'Announcing', 'Sharing', 'Requesting', 'Introducing', 'Following up', 'Inviting', 'Reminding'
    ]
    const nouns = [
        'Update', 'Meeting', 'Event', 'Announcement', 'Feedback', 'Question', 'Request'
    ]

    const randomIndex = Math.floor(Math.random() * adjectives.length)
    const adjective = adjectives[randomIndex]

    const verbIndex = Math.floor(Math.random() * verbs.length)
    const verb = verbs[verbIndex]

    const nounIndex = Math.floor(Math.random() * nouns.length)
    const noun = nouns[nounIndex]

    return `${adjective} ${verb} ${noun}`
}



function _generateRandomBody() {
    const sentenceOptions = [
        'I sincerely hope that this message finds you in the best of health and high spirits, as I reach out to you on this fine day.',
        'It is with great pleasure that I compose this correspondence, with the intent of discussing a matter of great importance that I believe would be of mutual interest to us both.',
        'The primary purpose of this email is to convey vital and noteworthy information to you, with the hope that it will provide you with a deeper understanding of the recent developments regarding...',
        'I would be deeply appreciative if you could dedicate a few moments of your valuable time to address an inquiry I have, concerning a topic that has been the subject of much contemplation on my part, namely...',
        'I am writing to you today as a follow-up to our previous exchange of thoughts and ideas, during which we delved into the intricate and fascinating world of...'
    ];

    const signOffOptions = [
        'In closing, I would like to express my sincere gratitude for your time and consideration. Your response is greatly anticipated, as I eagerly look forward to the potential insights and knowledge it may bring.',
        'Should you require any additional details, clarifications, or have any concerns that you would like to address, please do not hesitate to reach out. Your feedback is invaluable and always appreciated.',
        'It has been an absolute pleasure to correspond with you on this matter. I eagerly anticipate the continued collaboration and exchange of ideas that lies ahead, as we navigate the intricate landscape of our shared interests.',
        'May the remainder of your day be as productive and rewarding as it has undoubtedly been thus far, and may your endeavors continue to yield great success.',
        'As we move forward, kindly keep me informed of any updates, changes, or new developments that may arise, so that we may continue to adapt and grow together in our shared pursuit of excellence.'
    ];

    const randomStartIndex = Math.floor(Math.random() * sentenceOptions.length)
    const startSentence = sentenceOptions[randomStartIndex]

    const randomSignOffIndex = Math.floor(Math.random() * signOffOptions.length)
    const signOff = signOffOptions[randomSignOffIndex]

    return `${startSentence} ${signOff} ${_generateRandomName()}`
}

function _generateRandomName() {
    const firstNames = [
        'John', 'Jane', 'Paul', 'Emma', 'Mark', 'Olivia', 'William', 'Sophia', 'Michael', 'Ava'
    ];
    const lastNames = [
        'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'
    ];

    const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
    const firstName = firstNames[randomFirstNameIndex];

    const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);
    const lastName = lastNames[randomLastNameIndex];

    return `${firstName} ${lastName}`;
}

function _getRandomTrueFalse() {
    return utilService.getRandomIntInclusive(1, 10) > 5 ? true : false
}

function _getRandomFromAndTo() {
    const username = Math.random().toString(36).slice(2, 10); // Random alphanumeric username (8 characters)
    const emailProviders = [
        'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'aol.com', 'protonmail.com'
    ];

    const randomProviderIndex = Math.floor(Math.random() * emailProviders.length);
    const emailProvider = emailProviders[randomProviderIndex];

    const emailAddress = `${username}@${emailProvider}`
    const userEmailAddress = loggedinUser.email
    if (utilService.getRandomIntInclusive(1, 10) > 3) {
        return {
            from: emailAddress,
            to: userEmailAddress
        }
    } else {
        return {
            from: userEmailAddress,
            to: emailAddress
        }
    }
}

function _generateTimestamps(to) {
    const createdAt = _generateRandomTimestamp();
    let sentAt
    let removedAt

    // const sentAtChanceOfNull = Math.random() < 0.2;

    if (to !== loggedinUser.email && (Math.random() < 0.2)) {
        sentAt = null;
        // removedAt = null;
    } else {

        sentAt = createdAt + Math.floor(Math.random() * (Date.now() - createdAt));


        const removedAtChanceOfNull = Math.random() > 0.2;

        if (removedAtChanceOfNull) {
            removedAt = null;
        } else {

            removedAt = sentAt + Math.floor(Math.random() * (Date.now() - sentAt));
        }
    }

    return { createdAt, sentAt, removedAt };
}

function _generateRandomTimestamp(n = 5) {
    const MILLISECONDS_IN_A_YEAR = 1000 * 60 * 60 * 24 * 365; // About 365.25 days per year

    const nYearsAgo = new Date();
    nYearsAgo.setFullYear(nYearsAgo.getFullYear() - n); // Set the year to n years ago

    const timestampRange = Date.now() - nYearsAgo.getTime();
    const randomTimestamp = nYearsAgo.getTime() + Math.floor(Math.random() * timestampRange);

    return randomTimestamp;
}