import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Main from './screens/Main';
import Person from './screens/Person';
import SignIn from './screens/SignIn';
import Loading from './screens/Loading';
import Settings from './screens/Settings';

const App = createStackNavigator({
  Main: { screen: Main },
  Person
});

const Tabs = createBottomTabNavigator({
  MainApp: { screen: App },
  Settings
});

export default createSwitchNavigator(
  {
    Loading,
    SignIn,
    Tabs
  },
  {
    initialRouteName: 'Loading'
  }
);
