localStorage.setItem('books', JSON.stringify(books))

const rootNode = document.querySelector('#root')
rootNode.className = 'root'

const bookListSection = document.createElement('div')
bookListSection.classList.add('container', 'book-list-section')

const dynamicContainer = document.createElement('div')
dynamicContainer.classList.add('container', 'dynamic-section')
dynamicContainer.innerHTML = 'Dynamic container for preview single book, add or edit book'

const bookPreview = document.createElement('div')
bookPreview.classList.add('book-preview')
bookPreview.innerHTML = 'Book preview'

rootNode.append(bookListSection)
rootNode.append(dynamicContainer)
dynamicContainer.append(bookPreview)
renderBookList(books, bookListSection)
renderAllBooks()

const bookList = document.querySelector('.book-list')
const preview = document.querySelector('.book-preview')

bookList.addEventListener('click', e => {
    if (e.target.classList.contains('book-list__title')) {
        books.forEach(({ id, title, author, imageLink, plot }) => {
            if (+e.target.id === id) {
                preview.classList.add('visible')
                dynamicContainer.innerHTML = ''
                renderBook({ id, title, author, imageLink, plot }, dynamicContainer)
            }
        })
    }

})

function renderAllBooks() {
    books.forEach(({ id, title, author, imageLink, plot }) => {
        renderBook({ id, title, author, imageLink, plot }, bookPreview)
    })
}

function renderBook({id, title, author, imageLink, plot}, node) {
    const book = `
        <div class="book" id="${id}">
            <h3 class="book__heading">${title}</h3>
            <img class="book__img" src="${imageLink}" alt="book image">
            <div class="book__title">Title: ${title}</div>
            <div class="book__author">Author: ${author}</div>
            <div class="book-list__plot">Description: ${plot}</div>
        </div>
    `

    node.insertAdjacentHTML('beforeend', book)
    history.pushState({}, '', `/bookEditor/src/index.html#preview`)
}

function renderBookList(books, node) {
    let list = `
        <h1 class="heading">Book list</h1>
        <ul class="book-list">
    `
    books.forEach(({id, title}) => {
        list += `
            <li class="book-list__title" id="${id}">${title}</li>
            <button class="btn btn-edit" data-id="${id}" type="button">Edit</button>
        `
    })
    list += `
        </ul>
        <button class="btn btn-add" type="button">Add</button>
    `
    node.insertAdjacentHTML('beforeend', list)
}