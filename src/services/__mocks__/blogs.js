let token = null

const blogs = [
    {
        id: "5a451df7571c224a31b5c8ce",
        author: "Jummitus",
        title: "jammituksen tammitus",
        url: "www.Onkojummijammi.fi",
        likes: 899,
        user: {
            _id: "5a437a9e514ab7f168ddf138",
            username: "Tommi",
            name: "Tomminen"
        }
    },
    {
        id: "5a451df7571c224a234sse",
        author: "Jasper",
        title: "Tammisalon salat",
        url: "www.TuleekoLunta.fi",
        likes: 1337,
        user: {
            _id: "5a437a9e514ab7f168ddf138",
            username: "Tommi",
            name: "Tomminen"
        }
    },
    {
        id: "5a451t7s77fhjshhau8788a",
        author: "Timoteus Teme",
        title: "Art of teme",
        url: "www.TimoteusOnSorbus.fi",
        likes: 1655,
        user: {
            _id: "5a437a9e514ab7f168ddf138",
            username: "Tommi",
            name: "Tomminen"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = (newToken) => {
    token = newToken
}

export default { getAll, blogs, token, setToken }