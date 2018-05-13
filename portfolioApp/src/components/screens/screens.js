import { Navigation } from 'react-native-navigation'
import WelcomeScreen from './Auth/WelcomeScreen' 
import LoginUserScreen from './Auth/LoginUserScreen'
import NewUserScreen from './Auth/NewUserScreen'
import PortfolioScreen from './Cards/Portfolio/PortfolioScreen'
import SnapshotScreen from './Cards/Snapshot/SnapshotScreen'

// Register screens so they can be navigated to using React Native Navigation
export default (store, Provider) => {
    // Auth Screens
    Navigation.registerComponent('PortfolioApp.WelcomeScreen', () => WelcomeScreen, store, Provider)
    Navigation.registerComponent('PortfolioApp.NewUserScreen', () => NewUserScreen, store, Provider)
    Navigation.registerComponent('PortfolioApp.LoginUserScreen', () => LoginUserScreen, store, Provider)

    // Card Screens
    Navigation.registerComponent('PortfolioApp.PortfolioScreen', () => PortfolioScreen, store, Provider)
    Navigation.registerComponent('PortfolioApp.SnapshotScreen', () => SnapshotScreen, store, Provider)
}
