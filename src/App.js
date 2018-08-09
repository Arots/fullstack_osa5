import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      passwordHash: '',
      error: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleLoginChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  login = async (event) => {
    event.preventDefault()
    console.log(this.state.username, this.state.passwordHash)
    try {
      const user = await loginService.login({
        username: this.state.username,
        passwordHash: this.state.passwordHash
      })

      console.log(user)
      
      
      blogService.setToken(user.token)
      this.setState({
        username: '',
        passwordHash: '',
        user
      })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    return (
      <div>
        {this.state.user === null ? 
        <LoginForm 
          username={this.state.username} 
          passwordHash={this.state.passwordHash}
          handleChange={this.handleLoginChange}
          handleSubmit={this.login} /> :
        <div>
          <h2>Blogs</h2>
          <p> {this.state.user.name} logged in </p>
          {this.state.blogs.map(blog => 
            <Blog key={blog._id} blog={blog}/>
          )}
        </div>
        }
      </div>
    );
  }
}

export default App;
