import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from './screens/Main';
import Person from './screens/Person';
import SignIn from './screens/SignIn';
import Loading from './screens/Loading';
import Settings from './screens/Settings';

const icons = {
  MainApp: ({ tintColor }) => (
    <Icon name="md-contacts" size={24} color={tintColor} />
  ),
  Settings: ({ tintColor }) => (
    <Icon name="md-settings" size={24} color={tintColor} />
  )
};

const App = createStackNavigator({
  Main: { screen: Main },
  Person
});

const Tabs = createBottomTabNavigator(
  {
    MainApp: { screen: App },
    Settings
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato'
    },
    navigationOptions: ({ navigation }) => {
      const {
        state: { routeName }
      } = navigation;

      return {
        tabBarIcon: icons[routeName]
      };
    }
  }
);

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
