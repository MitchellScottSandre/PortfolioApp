import { Navigation } from 'react-native-navigation'
import * as AuthScreens from './Auth'

export default (store, Provider) => {
    // Auth Screens
    Navigation.registerComponent('PortfolioApp.WelcomeScreen', () => AuthScreens.WelcomeScreen, store, Provider)
}
