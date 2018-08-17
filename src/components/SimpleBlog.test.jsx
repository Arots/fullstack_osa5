import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders blogs content, author and amount of likes', () => {
        const simpleBlog = {
            author: 'Timoteus Teme',
            title: 'Timoteuksen seikkailut',
            likes: 7
        }

        const blogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
        console.log(blogComponent.debug())

        const contentDiv = blogComponent.find('.content')
        expect(contentDiv.text()).toContain(simpleBlog.author)
        expect(contentDiv.text()).toContain(simpleBlog.title)
        expect(contentDiv.text()).toContain(simpleBlog.likes)
    })
})