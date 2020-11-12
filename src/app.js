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