import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

declare let BROWSER:boolean

const history = BROWSER ? createBrowserHistory() : createMemoryHistory()

export default history
