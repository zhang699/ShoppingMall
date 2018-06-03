import { NavigationActions } from 'react-navigation/src/react-navigation';
import AppNavigator from '../navigator';

const initialNavState = AppNavigator.router.getStateForAction(NavigationActions.reset({
  index: 0,
  key: 'Init',
  actions: [
    NavigationActions.reset({
      routeName: 'App',
      params: {}
    })
  ]
}));

/*const initialNavState = {
  index: 0,
  key: 'Init',
  routes: [{ routeName: 'App', params: {} }]
};*/

export default (state = initialNavState, action) =>
  AppNavigator.router.getStateForAction(action, state) || state;
