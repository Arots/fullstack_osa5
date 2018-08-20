import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let savedItems = {
    Teme: 'Teme'
}

const localStorageMock = {
    setItem: (key, item) => {
      savedItem[key] = item
    },
    getItem: (key) => savedItems[key],
    clear: savedItems = {}
}
  
window.localStorage = localStorageMock