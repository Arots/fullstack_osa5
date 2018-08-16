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
          this.setState({ blogs: blogs.sort((a, b) => a.likes - b.likes).reverse() })
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
            this.setState({
                blogs: this.state.blogs.sort((a, b) => a.likes - b.likes).reverse()
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

    updateBlog = (newBlog) => {
        const mapped = this.state.blogs.map(blog=>
            blog.id == newBlog.id ? newBlog : blog)
        this.setState({
            blogs: mapped.sort((a, b) => a.likes - b.likes).reverse()
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
                </form> : 
                <div>
                    <button className="button" onClick={this.toggle}>Lisää blogi</button>
                    <br />
                </div>
                }
                {this.state.blogs.map(blog =>
                <Blog className="blog" key={blog._id} blog={blog} 
                updateBlog={this.updateBlog}/>
              )}
            </div>
        );
    }
}

export default BlogForm;