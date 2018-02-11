import { Component } from 'react'
import ReduxThunk from 'redux-thunk'
// import { Platform, AppRegistry } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import reducer from './reducers'
import * as appActions from './actions'
import registerScreens from './components/screens/screens'
import * as types from './actions/types'

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore)
const store = createStoreWithMiddleware(reducer)

registerScreens(store, Provider)

export default class App extends Component {

    constructor(props) {
        super(props)
        store.subscribe(this.onStoreUpdate.bind(this))
        store.dispatch(appActions.appInitialized())
        console.log('aaaa')
    }

    onStoreUpdate() {
        const { root } = store.getState().root
        console.log('bbbbb', root)
        if (this.currentRoot !== root) {
          this.currentRoot = root
          this.startApp(root)
        }
    }

    startApp(root) {
        console.log('startApp called', root)
        switch (root) {
            case types.WELCOME_SCREEN:
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'PortfolioApp.WelcomeScreen',
                        title: 'Welcome',
                        navigatorStyle: {},
                        navigatorButtons: {}
                    }
                })
                return
            default:
                return 
        }
    }
}

