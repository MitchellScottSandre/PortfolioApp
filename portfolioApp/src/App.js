import { Component } from 'react'
import ReduxThunk from 'redux-thunk'
import firebase from 'firebase'
import { createStore, applyMiddleware } from 'redux'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import reducer from './reducers'
import registerScreens from './components/screens/screens'
import * as types from './actions/types'
import * as appActions from './actions'

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, logger)(createStore)
const store = createStoreWithMiddleware(reducer)
registerScreens(store, Provider)

// Main App Navigation
export default class App extends Component {

    constructor(props) {
        super(props)

        store.subscribe(this.onStoreUpdate.bind(this))
        store.dispatch(appActions.appInitialized())

        const config = {
            apiKey: "AIzaSyBsfZWXjnefkcCgqLJWxvVmS1HeOZocJCg",
            authDomain: "portfolio-45f16.firebaseapp.com",
            databaseURL: "https://portfolio-45f16.firebaseio.com",
            projectId: "portfolio-45f16",
            storageBucket: "",
            messagingSenderId: "319856504755"
          }

        firebase.initializeApp(config)
    }

    onStoreUpdate() {
        const { root } = store.getState().root
      
        if (this.currentRoot !== root) {
          this.currentRoot = root
          this.startApp(root)
        }
    }

    startApp(root) {
        switch (root) {
            case types.WELCOME_SCREEN:
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'PortfolioApp.WelcomeScreen',
                    }
                })
                return
            case types.MAIN_SCREENS:
                // console.log('switching to main screens in app js')
                Navigation.startTabBasedApp({
                    tabs: [
                        // {
                        //     label: 'Snapshot', 
                        //     screen: 'PortfolioApp.SnapshotScreen'
                        // },
                        {
                            label: 'Portfolio',
                            screen: 'PortfolioApp.PortfolioScreen'
                        }
                    ]     
                })
                return
            default:
                return 
        }
    }
}

