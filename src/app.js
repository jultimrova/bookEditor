const booksArray = JSON.parse(localStorage.getItem('books')) || []

const root = document.getElementById('root')
root.className = 'root'

const bookListContainer = document.createElement('div')
bookListContainer.classList.add('container', 'list')

const listHeading = document.createElement('h1')
listHeading.textContent = 'Books'

const bookPreviewContainer = document.createElement('div')
bookPreviewContainer.classList.add('container', 'preview')
bookPreviewContainer.id = 'bookPreviewRender'

const addButton = document.createElement('a')
addButton.classList.add('btn', 'btn-add')
addButton.innerHTML = 'Add'

root.append(bookListContainer)
bookListContainer.append(listHeading)
renderBookList(booksArray, bookListContainer)
bookListContainer.appendChild(addButton)
root.append(bookPreviewContainer)
renderAllBooks()

window.history.pushState('', 'main page', '/bookEditor/src/index.html')

const bookList = document.querySelector('.book-list')

bookList.addEventListener('click', e => {
    const target = e.target
    const targetId = +target.id
    console.log(target)
    bookPreviewContainer.innerHTML = null

    for (const {id, title, author, imageLink, plot} of booksArray) {
        if (targetId === id && target.classList.contains('book-list__title')) {
            e.preventDefault()
            renderBookPreview({id, title, author, imageLink, plot}, bookPreviewContainer)
        }
    }
})

function renderAllBooks() {
    for (let {id, title, author, imageLink, plot} of booksArray) {
        if (booksArray.length > 0) {
            renderBookPreview({id, title, author, imageLink, plot}, bookPreviewContainer)
        }
    }
}

function renderBookPreview({id, title, author, imageLink, plot}, node) {
    const bookPrev = `
        <div class="book-preview book" id="${id}">
            <h3 class="book__heading">${title}</h3>
            <img class="book__img" src="${imageLink}" alt="book image">
            <div class="book__title">Title: ${title}</div>
            <div class="book__author">Author: ${author}</div>
            <div class="book-list__plot">Description: ${plot}</div>
        </div>
    `

    node.insertAdjacentHTML('beforeend', bookPrev)
    history.pushState({}, 'add book', `/bookEditor/src/index.html#preview?id=${id}`)
}

function renderBookList(data, node) {
    let nav = `<nav class="book-list">`
    for (let {id, title} of data) {
        if (data.length > 0) {
            nav += `
                <a href="#preview" id="${id}" class="book-list__title">${title}</a>
                <a href="#edit" id="${id}" class="btn btn-edit">Edit</a>
            `
        }
    }
    nav += `</nav>`
    node.insertAdjacentHTML('beforeend', nav)
}