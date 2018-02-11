import { Navigation } from 'react-native-navigation'
import PortfolioTab from './PortfolioTab'
import * as AuthScreens from './Auth'

export default (store, Provider) => {
    Navigation.registerComponent('PortfolioApp.WelcomeScreen', () => AuthScreens.WelcomeScreen, store, Provider)

    Navigation.registerComponent('PortfolioApp.PortfolioTab', () => PortfolioTab, store, Provider)
}
