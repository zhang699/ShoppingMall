import { StackNavigator } from 'react-navigation';

import Home from './containers/Home';
import Counter from './containers/Counter';
import Camera from './components/Camera';
import PersonalInfo from './components/PersonalInfo';
import MerchandiseList from './components/MerchandiseList';
import NewMerchandise from './components/NewMerchandise';
import MerchandiseGrid from './components/MerchandiseGrid';
import MerchandiseDetail from './components/MerchandiseDetail';

const AppNavigator = new StackNavigator(
  {
    Home: { screen: Home },
    Counter: { screen: Counter },
    Camera: { screen: Camera },
    PersonalInfo: { screen: PersonalInfo },
    MerchandiseList: { screen: MerchandiseList },
    NewMerchandise: { screen: NewMerchandise },
    MerchandiseGrid: { screen: MerchandiseGrid },
    MerchandiseDetail: { screen: MerchandiseDetail }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      header: null
    }
  }
);

export default AppNavigator;
