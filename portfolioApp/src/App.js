import { Component } from 'react'
import ReduxThunk from 'redux-thunk'
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
    }

    onStoreUpdate() {
        const { root } = store.getState().root
      
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
                        navigatorButtons: {}
                    }
                })
                return
            default:
                return 
        }
    }
}

