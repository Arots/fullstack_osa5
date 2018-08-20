import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog /> ', () => {
    it('after clicking name and details are displayed', () => {
        const simpleBlog = {
            author: 'Timoteus Teme',
            title: 'Timoteuksen seikkailut',
            url: 'www.kivaaonTestit.fi',
            likes: 11,
            user: {
                id: 'asdasdasd',
                username: 'timoteus'
            }
        }
        
        const userMan = {
            _id: "asdasdas",
            username: "lasdassaas",
            name: "timoteus"
        }

        const contentDiv = shallow(<Blog blog={simpleBlog} user={userMan}/>)
        const blogComponent = contentDiv.find('.blog')
        blogComponent.simulate('click', {preventDefault: () => {}})

        const newDiv = contentDiv.find('.blogList')
        console.log(contentDiv.debug())

        //expect(blogComponent).toHaveBeenCalled()
        expect(newDiv.text()).toContain(simpleBlog.author)
        expect(newDiv.text()).toContain(simpleBlog.title)
        expect(newDiv.text()).toContain(simpleBlog.url)
        expect(newDiv.text()).toContain(simpleBlog.likes)


    })
})