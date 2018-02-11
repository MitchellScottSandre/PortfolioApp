import { Navigation } from 'react-native-navigation'
import App from './src/App'

// AppRegistry.registerComponent('portfolioApp', () => App)

Navigation.registerComponent('portfolioApp', () => App)
Navigation.startSingleScreenApp({
  screen: {
    screen: 'portfolioApp',
    title: 'Welcome'
  }
})
