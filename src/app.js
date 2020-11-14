const rootNode = document.querySelector('#root')
rootNode.className = 'root'

const bookListSection = document.createElement('div')
bookListSection.classList.add('container', 'book-list-section')

const dynamicContainer = document.createElement('div')
dynamicContainer.classList.add('container', 'dynamic-section')
dynamicContainer.innerHTML = 'Dynamic container for preview single book, add or edit book'

const bookPreview = document.createElement('div')
bookPreview.classList.add('book-preview')
bookPreview.innerHTML = 'All books preview'

const singleBookPreview = document.createElement('div')
singleBookPreview.classList.add('single-book-preview')
singleBookPreview.innerHTML = 'Single book preview'

const addBookContainer = document.createElement('div')
addBookContainer.classList.add('add-book')
addBookContainer.innerHTML = 'Add book'

const editBookContainer = document.createElement('div')
editBookContainer.classList.add('edit-book')
editBookContainer.innerHTML = 'Edit book'

history.pushState({}, '', `/bookEditor/src/index.html`)

rootNode.append(bookListSection)
rootNode.append(dynamicContainer)
dynamicContainer.append(bookPreview)
dynamicContainer.append(singleBookPreview)
dynamicContainer.append(addBookContainer)
dynamicContainer.append(editBookContainer)
getFromLS()

const bookList = document.querySelector('.book-list')
const preview = document.querySelector('.book-preview')
const singlePreview = document.querySelector('.single-book-preview')
const addBook = document.querySelector('.add-book')
const editBook = document.querySelector('.edit-book')
const addBtn = document.querySelector('.btn-add')

bookList.addEventListener('click', e => {
    if (e.target.classList.contains('book-list__title')) {
        books.forEach(({id, title, author, imageLink, plot}) => {
            if (+e.target.id === id) {
                preview.classList.add('visible')
                addBook.classList.add('visible')
                editBook.classList.add('visible')
                singlePreview.classList.remove('visible')
                singlePreview.innerHTML = ''
                renderBook({id, title, author, imageLink, plot}, singleBookPreview)
                history.pushState({}, '', `/bookEditor/src/index.html#preview?id=${id}`)
            }
        })
    }
})

addBtn.addEventListener('click', e => {
    preview.classList.add('visible')
    singlePreview.classList.add('visible')
    editBook.classList.add('visible')
    addBook.classList.remove('visible')


    history.pushState({}, 'add book', '/bookEditor/src/index.html#add')

    addBookForm()

    const addForm = document.querySelector('.add-book-form')

    addForm.addEventListener('submit', e => {
        e.preventDefault()
        const titleInput = addForm.querySelector('#add-book-title').value
        const authorInput = addForm.querySelector('#add-book-author').value
        const imageURLInput = addForm.querySelector('#add-book-image').value
        const descInput = addForm.querySelector('#add-book-plot').value

        const book = {
            id: books.length + 1,
            title: titleInput,
            author: authorInput,
            imageLink: imageURLInput,
            plot: descInput
        }

        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))

        bookList.insertAdjacentHTML('beforeend', `
            <li class="book-list__title" id="${book.id}">${book.title}</li>
            <button class="btn btn-edit" data-id="${book.id}" id="edit-${book.id}" type="button">Edit</button>
        `)

        addBook.classList.add('visible')
    })
})

bookList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-edit')) {
        bookPreview.classList.add('visible')
        singlePreview.classList.add('visible')
        addBook.classList.add('visible')
        editBook.classList.remove('visible')

        const editButton = document.querySelector(`#edit-${+e.target.dataset.id}`)
        editButton.disabled = true

        let bookData = books.find(book => {
            return book.id === +e.target.dataset.id
        })

        editBook.innerHTML = ''
        editBook.insertAdjacentHTML('beforeend', `
            <h3>Edit ${bookData.title}</h3>
            <form id="edit-book-form" class="edit-book-form">
                <label for="edit-book-title">Book's title: </label>
                <input type="text" id="edit-book-title" name="title" class="input-field" value='${bookData.title}' required>
                <label for="edit-book-author">Book's author: </label>
                <input type="text" id="edit-book-author" name="author" class="input-field" value='${bookData.author}' required>
                <label for="edit-book-image">Book's image: </label>
                <input type="url" id="edit-book-image" name="image" class="input-field" value='${bookData.imageLink}' required>
                <label for="edit-book-plot">Book's description: </label>
                <textarea id="edit-book-plot" name="plot" class="input-field" rows="10" required>${bookData.plot}</textarea>
                <div class="btn-group">
                    <button type="submit" id="edit-book__save" class="btn btn-save">Save</button>
                    <button type="button" id="edit-book__cancel" class="btn btn-cancel">Cancel</button>
                </div>
            </form>
        `)

        const editForm = document.querySelector('.edit-book-form')

        editForm.addEventListener('submit', e => {
            e.preventDefault()

            const titleInput = document.querySelector('#edit-book-title').value
            const authorInput = document.querySelector('#edit-book-author').value
            const imageURLInput = document.querySelector('#edit-book-image').value
            const descInput = document.querySelector('#edit-book-plot').value
            const editedBook = document.querySelector(`.book-${bookData.id}`)

            const index = books.findIndex(el => el.id === bookData.id)
            books[index] = {
                id: bookData.id,
                title: titleInput,
                author: authorInput,
                imageLink: imageURLInput,
                plot: descInput
            }

            localStorage.setItem('books', JSON.stringify(books))

            editedBook.innerHTML = `
                <h3 class="book__heading">${bookData.title}</h3>
                <img class="book__img" src="${bookData.imageLink}" alt="book image">
                <div class="book__title">Title: ${bookData.title}</div>
                <div class="book__author">Author: ${bookData.author}</div>
                <div class="book-list__plot">Description: ${bookData.plot}</div>
            `
            editForm.innerHTML = ''
            editBook.classList.add('visible')
        })
        editButton.disabled = false
    }
})

function getFromLS() {
    const reference = localStorage.getItem('books')
    if (!reference) {
        localStorage.setItem('books', JSON.stringify(books))
    } else {
        books = JSON.parse(reference)
        renderBookList(books, bookListSection)
        renderAllBooks()
    }
}

function addBookForm() {
    addBook.innerHTML = ''
    addBook.insertAdjacentHTML('beforeend', `
        <h3>Add book</h3>
        <form id="add-book-form" class="add-book-form">
            <label for="add-book-title">Book's title: </label>
            <input type="text" id="add-book-title" name="title" class="input-field" value='' required>
            <label for="add-book-author">Book's author: </label>
            <input type="text" id="add-book-author" name="author" class="input-field" value='' required>
            <label for="add-book-image">Book's image: </label>
            <input type="url" id="add-book-image" name="image" class="input-field" value='' required>
            <label for="add-book-plot">Book's description: </label>
            <textarea id="add-book-plot" name="plot" class="input-field" rows="10" required></textarea>
            <div class="btn-group">
                <button type="submit"  id="add-book__save" class="btn btn-save">Save</button>
                <button type="button" id="add-book__cancel" class="btn btn-cancel">Cancel</button>
            </div>
        </form>
    `)
}

function renderAllBooks() {
    history.pushState({}, '', `/bookEditor/src/index.html`)
    books.forEach(({id, title, author, imageLink, plot}) => {
        renderBook({id, title, author, imageLink, plot}, bookPreview)
    })
}

function renderBook({id, title, author, imageLink, plot}, node) {
    const book = `
        <div class="book-${id}" id="${id}">
            <h3 class="book__heading">${title}</h3>
            <img class="book__img" src="${imageLink}" alt="book image">
            <div class="book__title">Title: ${title}</div>
            <div class="book__author">Author: ${author}</div>
            <div class="book-list__plot">Description: ${plot}</div>
        </div>
    `

    node.insertAdjacentHTML('beforeend', book)
}

function renderBookList(books, node) {
    let list = `
        <h1 class="heading">Book list</h1>
        <ul class="book-list">
    `
    books.forEach(({id, title}) => {
        list += `
            <li class="book-list__title" id="${id}">${title}</li>
            <button class="btn btn-edit" data-id="${id}" id="edit-${id}" type="button">Edit</button>
        `
    })
    list += `
        </ul>
        <button class="btn btn-add" type="button">Add</button>
    `
    node.insertAdjacentHTML('beforeend', list)
}