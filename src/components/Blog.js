import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openBlog: false
    }
  }

  toggleOpen = (event) => {
    event.preventDefault()
    this.setState({
      openBlog: !this.state.openBlog
    })
  }

  addLike = async (event) => {
    try {
      event.preventDefault()
      console.log(this.props.blog)
      const blog = {
        id: this.props.blog.id,
        user: this.props.blog.user._id,
        likes: this.props.blog.likes + 1,
        author: this.props.blog.author,
        title: this.props.blog.title,
        url: this.props.blog.url
      }

      const theUpdatedBlog = {
        id: this.props.blog.id,
        user: this.props.blog.user,
        likes: this.props.blog.likes +1,
        author: this.props.blog.author,
        title: this.props.blog.title,
        url: this.props.blog.url
      }
      console.log(theUpdatedBlog)
  
      const updatedBlog = await blogService.update(blog.id, blog)
      this.props.updateBlog(theUpdatedBlog)
      console.log(updatedBlog)

    } catch (exception) {

      console.log(exception)
    }
  }

  handleDelete = async (event) => {
    event.preventDefault()
    await blogService.remove(this.props.blog.id)

    this.props.afterDelete()
  }

  render() {
    return (
      <div>
        {
          this.state.openBlog ? (
            <div className="blog" onClick={this.toggleOpen}>
              {this.props.blog.title}: {this.props.blog.author}
              <div>
                <a href={this.props.blog.url}>{this.props.blog.url}</a> <br />
                {this.props.blog.likes} likes <button type="button" onClick={this.addLike}>like</button> <br />
                added by {this.props.blog.user.username} <br />
                <button type="button" onClick={this.handleDelete}>delete</button>
              </div>
            </div >
          ) : (
              <div className="blog" onClick={this.toggleOpen}>
                {this.props.blog.title} {this.props.blog.author}
              </div>
            )
        }
      </div>
    )
  }
}

export default Blog