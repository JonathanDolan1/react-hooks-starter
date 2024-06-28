//Imports
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

//noteDB

const NOTE_KEY = 'noteDB'
_createNotes()


//service functions
export const noteService = {
    query,
    get,
    remove,
    save,
    _createNotes,
    UpdateLocalStorage,
    createUserNote,
}

window.ns = noteService

function query(filterBy = 'notes') {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy === 'notes') return notes
            else if (filterBy === 'img') return notes.filter(note => note.type === 'NoteImg')
            else if (filterBy === 'text') return notes.filter(note => note.type === 'NoteText')
            else if (filterBy === 'vid') return notes.filter(note => note.type === 'NoteVideo')
            else if (filterBy === 'todo') return notes.filter(note => note.type === 'NoteTodo')
            else return notes
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

function UpdateLocalStorage(notes) {
    utilService.saveToStorage(NOTE_KEY, notes)
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

function createUserNote(type = 'NoteText', userInput) {
    let content = {}
    switch (type) {
        case 'NoteText':
            content.txt = userInput
            break;

        case 'NoteImg':
            content.url = userInput
            break;

        case 'NoteTodo':
            content.title = userInput.title
            content.todos = userInput.todos
            break;

        case 'NoteVideo':
            content.url = userInput
            break;
    }

    const now = new Date()
    const date = {date:now.toISOString().split('T')[0], time: now.toISOString().split('T')[1].replace(/\.\d{3}Z$/, '')}

    const note = {
        id: '',
        createdAt: date,
        type: type,
        isPinned: false,
        style: {
            backgroundColor: 'white'
        },
        info: content
    }
    return note
}

function _createEmptyNote() {

    const types = ['NoteText', 'NoteImg', 'NoteTodo', 'NoteVideo']
    const type = types[utilService.getRandomIntInclusive(0, types.length - 1)]

    const bgColors = ['#efeff1', '#e9e3d4', '#f6e2dd', '#d3bfdb', '#aeccdc', '#d4e4ed', '#b4ddd3', '#e2f6d3', '#faafa8']
    const bgColor = bgColors[utilService.getRandomIntInclusive(0, bgColors.length - 1)]

    const imgs = ['195', '196', '197', '198', '199', '200', '201', '202', '203', '204', '205', '206', '207', '208', '209', '210',]
    const img = imgs[utilService.getRandomIntInclusive(0, imgs.length - 1)]

    const videos = ["https://www.youtube.com/embed/Ep0gR3D3mvU?si=ysXK6L8hFcqM9xBD", "https://www.youtube.com/embed/-1UWZjCEYy8?si=Q9oe6VUr0By96P3t", "https://www.youtube.com/embed/37p1euxENs8?si=cPa5xu_OHFqYa9CT", "https://www.youtube.com/embed/eikEOz7jVOo?si=NyF9-4dROlTqbrgW", 'https://www.youtube.com/embed/Ep0gR3D3mvU?si=dHQ0aoyI1cpXnQxQ']
    const video = videos[utilService.getRandomIntInclusive(0, videos.length - 1)]
    let content = {}

    switch (type) {
        case 'NoteText':
            content.txt = utilService.makeLorem(5)
            break;

        case 'NoteImg':
            content.url = `https://picsum.photos/${img}`
            break;

        case 'NoteTodo':
            content.title = 'Get my stuff together'
            content.todos = [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
            break;

        case 'NoteVideo':
            content.url = video
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