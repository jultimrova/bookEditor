let books = [
    {
        'id': 1,
        'author': 'Hans Christian Andersen',
        'imageLink': 'https://images-na.ssl-images-amazon.com/images/I/81tvOnUg2hL.jpg',
        'title': 'Fairy tales',
        'plot': 'Some description'
    },
    {
        'id': 2,
        'author': 'Jane Austen',
        'imageLink': 'https://almabooks.com/wp-content/uploads/2016/10/9781847493699.jpg',
        'title': 'Pride and Prejudice',
        'plot': 'Some description'
    },
    {
        'id': 3,
        'author': 'Fyodor Dostoevsky',
        'imageLink': 'https://m.media-amazon.com/images/I/41cQTFV5hPL.jpg',
        'title': 'Crime and Punishment',
        'plot': 'Some description'
    },
    {
        'id': 4,
        'author': 'Ralph Ellison',
        'imageLink': 'https://m.media-amazon.com/images/I/41urypNXYyL.jpg',
        'title': 'Invisible Man',
        'plot': 'Some description'
    },
    {
        'id': 5,
        'author': 'Nikolai Gogol',
        'imageLink': 'https://m.media-amazon.com/images/I/51-aZstZjeL.jpg',
        'title': 'Dead Souls',
        'plot': 'Some description'
    },
    {
        'id': 6,
        'author': 'Franz Kafka',
        'imageLink': 'https://kbimages1-a.akamaihd.net/c52751a8-b071-4157-9bf1-aa1c83a651a2/' +
            '1200/1200/False/the-trial-139.jpg',
        'title': 'The Trial',
        'plot': 'Some description'
    },
    {
        'id': 7,
        'author': 'Yasunari Kawabata',
        'imageLink': 'https://images-na.ssl-images-amazon.com/images/I/61lK61-YdkL._SX303_BO1,204,203,200_.jpg',
        'title': 'The Sound of the Mountain',
        'plot': 'Some description'
    },
    {
        'id': 8,
        'author': 'Herman Melville',
        'imageLink': 'https://m.media-amazon.com/images/I/51NngkgAIpL.jpg',
        'title': 'Moby Dick',
        'plot': 'Some description'
    },
    {
        'id': 9,
        'author': 'Mark Twain',
        'imageLink': 'https://almabooks.com/wp-content/uploads/2016/10/9781847496027.jpg',
        'title': 'The Adventures of Huckleberry Finn',
        'plot': 'Some description'
    }
]

localStorage.setItem('books', JSON.stringify(books))