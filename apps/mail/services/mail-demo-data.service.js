import { mailService } from "./mail.service.js"
import { utilService } from "../../../services/util.service.js"


export const mailDemoDataService = {
    createDemoMails
}

function createDemoMails(length) {
    const mails = []
    for (var i = 0; i < length; i++) {
        const mail = {
            id: utilService.makeId(),
            subject: _generateRandomSubject(),
            body: _generateRandomBody(),
            isRead: _getRandomTrueFalse(),
            ..._getRandomFromAndTo(),
            ..._generateTimestamps()
        }
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
        'I hope this email finds you well.',
        'I wanted to reach out to you regarding...',
        'I would like to inform you that...',
        'I have a question about...',
        'I\'m writing to follow up on our previous discussion...'
    ]

    const signOffOptions = [
        'Best regards,',
        'Sincerely,',
        'Thank you,',
        'Looking forward to hearing from you,',
        'Warm regards,',
    ]

    const randomStartIndex = Math.floor(Math.random() * sentenceOptions.length)
    const startSentence = sentenceOptions[randomStartIndex]

    const randomSignOffIndex = Math.floor(Math.random() * signOffOptions.length)
    const signOff = signOffOptions[randomSignOffIndex]

    return `${startSentence}

    Best,
  
    ${signOff}`
}

function _getRandomTrueFalse() {
    return utilService.getRandomIntInclusive(1, 10) > 5 ? true : false
}

function _getRandomSentAt() {
    return utilService.getRandomIntInclusive(1, 10) > 5 ? null : utilService.generateRandomTimestamp(5)
}

function _getRandomRemovedAt() {
    return getRandomSentAt()
}

function _getRandomFromAndTo() {
    const username = Math.random().toString(36).slice(2, 10); // Random alphanumeric username (8 characters)
    const emailProviders = [
        'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'aol.com', 'protonmail.com'
    ];

    const randomProviderIndex = Math.floor(Math.random() * emailProviders.length);
    const emailProvider = emailProviders[randomProviderIndex];

    const emailAddress = `${username}@${emailProvider}`
    const userEmailAddress = mailService.loggedinUser.email
    if (utilService.getRandomIntInclusive(1, 10) > 5) {
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
  
  function _generateTimestamps() {
    const createdAt = generateRandomTimestamp(); // Random timestamp from the last 5 years
  
    // Generate a random chance of sentAt being null (1 in 5 chance in this case)
    const sentAtChanceOfNull = Math.random() < 0.2;
  
    if (sentAtChanceOfNull) {
      const sentAt = null; // sentAt is null
      const removedAt = null; // removedAt is also null if sentAt is null
    } else {
      // Generate a random timestamp between createdAt and now
      const sentAt = createdAt + Math.floor(Math.random() * (Date.now() - createdAt));
  
      // Generate a random chance of removedAt being null (1 in 5 chance in this case)
      const removedAtChanceOfNull = Math.random() < 0.2;
  
      if (removedAtChanceOfNull) {
        const removedAt = null; // removedAt is null
      } else {
        // Generate removedAt between sentAt and now
        const removedAt = sentAt + Math.floor(Math.random() * (Date.now() - sentAt));
      }
    }
  
    return { createdAt, sentAt, removedAt };
  }