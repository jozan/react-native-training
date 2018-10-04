import { createStackNavigator } from 'react-navigation';
import Main from './screens/Main';
import Person from './screens/Person';

export default createStackNavigator({
  Main: { screen: Main },
  Person: { screen: Person }
});
