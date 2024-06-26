//Imports
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

//noteDB

const NOTE_KEY = 'noteDB'


//service functions
export const noteService = {
    query,
    get,
    remove,
    save,
    _createNotes,
}

window.ns = noteService

function query() {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => {
            return note
        })
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        for (let i = 0; i < 20; i++) {
            notes.push(_createNote())
        }
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}


//self used functions
function _createNote() {
    const note = _createEmptyNote()
    note.id = utilService.makeId()
    return note
}

function _createEmptyNote() {
    const types = ['NoteText', 'NoteImg', 'NoteTodo', 'NoteVideo']
    const type = types[utilService.getRandomIntInclusive(0, types.length - 1)]

    const bgColors = ['green', 'red', 'yellow', 'blue', 'orange']
    const bgColor = bgColors[utilService.getRandomIntInclusive(0, bgColors.length - 1)]
    let content = {}

    switch (type) {
        case 'NoteText':
            content.txt = utilService.makeLorem(5)
            break;
        case 'NoteImg':
            content.url = 'https://placehold.co/400'
            content.title = 'Bobi and Me'

            break;
        case 'NoteTodo':
            content.title = 'Get my stuff together'
            content.todos = [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
            break;
        case 'NoteVideo':
            content.url = 'https://placehold.co/400'
            content.title = 'video title'
            break;

    }

    const note = {
        id: '',
        createdAt: _getRandomTimestamp(),
        type: type,
        isPinned: Math.random() > 0.7,
        style: {
            backgroundColor: bgColor
        },
        info: content
    }
    return note
}

function _getRandomTimestamp() {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    const randomTimestamp = oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime());
    const randomDate = new Date(randomTimestamp);

    return {
        date: randomDate.toISOString().split('T')[0],
        time: randomDate.toISOString().split('T')[1].replace(/\.\d{3}Z$/, '')
    };
}

const notes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]