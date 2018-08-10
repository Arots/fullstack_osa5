import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      passwordHash: '',
      message: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleLoginChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  logout = async (event) => {
    event.preventDefault()
    this.setState({
      user: null
    })
    window.localStorage.removeItem('loggedUser')
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
      
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({
        username: '',
        passwordHash: '',
        user
      })
    } catch (exception) {
      this.setState({
        message: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ message: '' })
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
          handleSubmit={this.login}
          message={this.state.message} /> :
        <BlogForm
          message={this.state.message}
          logout={this.logout}
          user={this.state.user}
          blogs={this.state.blogs} />
        }
      </div>
    );
  }
}

export default App;
