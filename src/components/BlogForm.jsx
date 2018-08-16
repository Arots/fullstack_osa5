import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Notification from './Notification'

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            url: '',
            blogs: [],
            message: '',
            toggle: true,
            openBlog: false
        }
    }

    componentDidMount() {
        blogService.getAll().then(blogs =>
          this.setState({ blogs })
        )
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    addBlog = async (event) => {
        event.preventDefault()
        try {
            const newBlog = {
                title: this.state.title,
                author: this.state.author,
                url: this.state.url
            }

            const createdBlog = await blogService
                .create(newBlog)

            this.setState({
                message: `a new blog ${createdBlog.title} by ${createdBlog.author} has been added`,
                title: '',
                author: '',
                url: '',
                toggle: false,
                blogs: this.state.blogs.concat(createdBlog)
            })
            setTimeout(() => {
                this.setState({
                    message: ''
                })
            }, 3000)

            console.log(createdBlog)

        } catch (exception) {
            console.log(exception)
            this.setState({
                message: 'virheellinen blogi, tarkista tiedot'
            })
            setTimeout(() => {
                this.setState({
                    message: ''
                })
            }, 5000)
        }
    }

    updateBlog = (changedBlog) => {
        this.setState({
            blogs: this.state.blogs.map(blog => blog.id !== changedBlog.id ? blog : changedBlog)
          })
    }

    toggle = () => {
        this.setState({
            toggle: true
        })
    }

    render () {
        return (
            <div className="content" >
                <h2>Blogs</h2>
                {this.state.message === '' ? <div />  : <Notification className="lisaysViesti" 
                message={this.state.message}/> }
                <p className="paragraph"> {this.props.user.name} logged in <button
                    type="logout" className="button" onClick={this.props.logout} >
                    logout</button>
                </p>
                {this.state.toggle === true ? 
                <form className="form" onSubmit={this.addBlog} >
                    title: <input className="input" name="title"
                    type="text" value={this.state.title} onChange={this.handleChange} />
                    <br/>
                    author: <input className="input" name="author" 
                    type="text" value={this.state.author} onChange={this.handleChange} />
                    <br/>
                    url: <input className="input" name="url" 
                    type="text" value={this.state.url} onChange={this.handleChange} />
                    <br/>
                    <br/>
                    <button type='submit' className="button">Create </button>
                </form> : <button className="button" onClick={this.toggle}>Lisää blogi</button>
                }
                <ul>
                {this.state.blogs.map(blog => <li>
                <Blog className="blog" key={blog._id} blog={blog}
                    changedBlog={this.changedBlog}/> </li>
              )}
                </ul>
            </div>
        );
    }
}

export default BlogForm;