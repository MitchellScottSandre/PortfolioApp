import { Navigation } from 'react-native-navigation'
// import * as AuthScreens from './Auth'
import { WelcomeScreen } from './Auth/WelcomeScreen' 
import LoginUserScreen from './Auth/LoginUserScreen'
import NewUserScreen from './Auth/NewUserScreen' // this uses export default connect

export default (store, Provider) => {
    // Auth Screens
    Navigation.registerComponent('PortfolioApp.WelcomeScreen', () => WelcomeScreen, store, Provider)
    Navigation.registerComponent('PortfolioApp.NewUserScreen', () => NewUserScreen, store, Provider)
    Navigation.registerComponent('PortfolioApp.LoginUserScreen', () => LoginUserScreen, store, Provider)
}
