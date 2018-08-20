import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })
  
  it('shows only the LoginForm when no user is given', () => {
      const testComponents = app.find('.kirjautumisLomake')
      console.log(testComponents.debug())
      const blogForm = app.find('.forTest')

      expect(blogForm.text()).not.toContain('Blogs')
      expect(testComponents.text()).toContain('Log in to application')
      //expect(blogService.blogs.length).toBe(0)
      expect(testComponents.length).toBe(1)
  })
})