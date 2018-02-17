import { Navigation } from 'react-native-navigation'
import { WelcomeScreen } from './Auth/WelcomeScreen'  // // import * as AuthScreens from './Auth'
import LoginUserScreen from './Auth/LoginUserScreen'
import NewUserScreen from './Auth/NewUserScreen' // this uses export default connect
import PortfolioScreen from './Cards/Portfolio/PortfolioScreen'
import SnapshotScreen from './Cards/Snapshot/SnapshotScreen'


export default (store, Provider) => {
    // Auth Screens
    Navigation.registerComponent('PortfolioApp.WelcomeScreen', () => WelcomeScreen, store, Provider)
    Navigation.registerComponent('PortfolioApp.NewUserScreen', () => NewUserScreen, store, Provider)
    Navigation.registerComponent('PortfolioApp.LoginUserScreen', () => LoginUserScreen, store, Provider)

    // Card Screens
    Navigation.registerComponent('PortfolioApp.PortfolioScreen', () => PortfolioScreen, store, Provider)
    Navigation.registerComponent('PortfolioApp.SnapshotScreen', () => SnapshotScreen, store, Provider)
}
