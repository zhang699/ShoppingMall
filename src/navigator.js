import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom, TabBarTop } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './containers/Home';
import Counter from './containers/Counter';
import Camera from './components/Camera';
import PersonalInfo from './components/PersonalInfo';
import MerchandiseList from './components/MerchandiseList';
import NewMerchandise from './components/NewMerchandise';
import MerchandiseGrid from './components/MerchandiseGrid';
import MerchandiseDetail from './components/MerchandiseDetail';
import TransactionRecord from './components/TransactionRecord';
import ShoppingCart from './components/ShoppingCart';
import Test from './components/Test';

const styles = StyleSheet.create({
  tabBar: {
    height: 90
  },
  tabLabel: {
    fontSize: 16
  }
});

const AppNavigator = new TabNavigator(
  {
    Test: {
      screen: Test
    },
    PersonalInfo: {
      screen: new StackNavigator({
        PersonalInfo: { screen: PersonalInfo, navigationOptions: { title: '個人資訊' } },
        MerchandiseList: { screen: MerchandiseList, navigationOptions: { title: '我的商品' } },
        NewMerchandise: { screen: NewMerchandise, navigationOptions: { title: '建立商品' } }
      }),
      navigationOptions: { title: '個人資訊' }
    },
    MerchandiseGrid: { screen: MerchandiseGrid, navigationOptions: { title: '商城' } },
    MerchandiseDetail: {
      screen: MerchandiseDetail,
      navigationOptions: { title: '商品詳細' }
    },
    TransactionRecord: {
      screen: TransactionRecord,
      navigationOptions: { title: '交易紀錄' }
    },
    ShoppingCart: {
      screen: ShoppingCart,
      navigationOptions: { title: '購物車' }
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;

        const ICON_MAP = {
          PersonalInfo: 'user',
          MerchandiseList: 'archive',
          NewMerchandise: 'plus',
          MerchandiseGrid: 'th',
          MerchandiseDetail: 'info-circle',
          TransactionRecord: 'list',
          ShoppingCart: 'shopping-cart'
        };
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={ICON_MAP[routeName] || ''} size={42} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      style: styles.tabBar,
      labelStyle: styles.tabLabel,
      showLabel: false
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
);

const RootNavigator = new StackNavigator(
  {
    Home: { screen: Home },
    App: { screen: AppNavigator },
    Counter: { screen: Counter },
    Camera: { screen: Camera }
  },
  {
    headerMode: 'none'
  }
);

export default RootNavigator;
