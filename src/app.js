localStorage.setItem('books', JSON.stringify(books))

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root')
    root.className = 'root'

    const bookListContainer = document.createElement('div')
    bookListContainer.classList.add('container', 'list')

    const addButton = document.createElement('a')
    addButton.classList.add('btn', 'btn-add')
    addButton.innerHTML = 'Add'

    const bookPreviewContainer = document.createElement('div')
    bookPreviewContainer.classList.add('container', 'preview')
    bookPreviewContainer.id = 'bookPreviewRender'

    root.append(bookListContainer)
    renderBookList(books, bookListContainer)
    bookListContainer.appendChild(addButton)
    root.append(bookListContainer)
    root.append(bookPreviewContainer)

    renderAllBooks()

    bookListContainer.addEventListener('click', e => {
        if (e.target.classList.contains('btn-add')) {
            history.pushState({}, 'add book', '/bookEditor/src/index.html#add')
            bookPreviewContainer.innerHTML = null

            bookPreviewContainer.insertAdjacentHTML('beforeend', `
                <div class="add-book">
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
                            <button type="submit" class="btn add-btn-save">Save</button>
                            <button type="button" id="add-book__cancel" class="btn btn-cancel">Cancel</button>
                        </div>
                    </form>
                </div>
            `)

            const addForm = document.getElementById('add-book-form')

            addForm.addEventListener('submit', e => {
                e.preventDefault()

                const titleValue = addForm.querySelector('#add-book-title').value
                const authorValue = addForm.querySelector('#add-book-author').value
                const imageValue = addForm.querySelector('#add-book-image').value
                const plotValue = addForm.querySelector('#add-book-plot').value

                let book = {
                    id: books.length + 1,
                    title: titleValue,
                    author: authorValue,
                    imageLink: imageValue,
                    plot: plotValue
                }

                const bookList = document.querySelector('.book-list')

                bookList.insertAdjacentHTML('beforeend', `
                    <a href="#preview" id="${book.id}" class="book-list__title">${book.title}</a>
                    <a href="#edit" id="${book.id}" class="btn btn-edit">Edit</a>
                `)

                bookPreviewContainer.innerHTML = ''
            })
        }
    })

    bookListContainer.addEventListener('click', e => {
        if (e.target.classList.contains('btn-edit')) {
            const editBtn = document.querySelector('.btn-edit')
            document.querySelector(`#edit-${e.target.id}`)
            editBtn.disabled = true

            const bookData = books.find(book => {
                return book.id === +e.target.id
            })

            bookPreviewContainer.innerHTML = null

            bookPreviewContainer.innerHTML += `
            <div class="edit-book">
                <h3>Edit ${bookData.title}</h3>
                <form id="edit-book-form" class="edit-book-form">
                    <label for="edit-book-title">Book's title: </label>
                    <input type="text" id="edit-book-title" name="title" class="input-field" value='${bookData.title}' required>
                    <label for="edit-book-author">Book's author: </label>
                    <input type="text" id="edit-book-author" name="author" class="input-field" value='${bookData.author}' required>
                    <label for="edit-book-image">Book's image: </label>
                    <input type="url" id="edit-book-image" name="image" class="input-field" value='${bookData.imageLink}' required>
                    <label for="edit-book-plot">Book's description: </label>
                    <textarea id="book-edit-plot" name="plot" class="input-field" rows="10" required>${bookData.plot}</textarea>
                    <div class="btn-group">
                        <button type="submit" class="btn edit-btn-save">Save</button>
                        <button type="button" id="edit-book__cancel" class="btn btn-cancel">Cancel</button>
                    </div>
                </form>
            </div>
            `

            const editForm = document.getElementById('edit-book-form')

            const editedBook = document.querySelector(`#book-${bookData.id}`)
            console.log(editedBook)
            editForm.addEventListener('submit', e => {
                e.preventDefault()

                const titleInput = editForm.querySelector('#add-book-title').value
                const authorInput = editForm.querySelector('#add-book-author').value
                const imageInput = editForm.querySelector('#add-book-image').value
                const plotInput = editForm.querySelector('#add-book-plot').value
            })

        }
    })

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

    function renderAllBooks() {
        books.forEach(book => {
            const {id, title, author, imageLink, plot} = book
            renderBookPreview({id, title, author, imageLink, plot}, bookPreviewContainer)
        })
    }

    function renderBookPreview({id, title, author, imageLink, plot}, node) {
        const bookPrev = `
        <div class="book-preview book" id="book-${id}">
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
})