import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

const styles = StyleSheet.create({
  tabBar: {
    height: 52
  },
  tabLabel: {
    fontSize: 16
  },
  badge: {
    position: 'absolute',
    right: -20,
    top: -10,
    borderRadius: 10,
    width: 20,
    height: 20,
    backgroundColor: '#e12',
    color: 'white',
    textAlign: 'center',
    fontSize: 14
  }
});

const BadgeIcon = (props) => {
  const { numberOfBadges } = props;
  const show = !!numberOfBadges;
  return (
    <View>
      <Icon {...props} />
      {show && <Text style={styles.badge}> {`${numberOfBadges}`}</Text>}
    </View>
  );
};

const AppNavigator = new TabNavigator(
  {
    PersonalInfo: {
      screen: new StackNavigator(
        {
          PersonalInfo: {
            screen: PersonalInfo,
            navigationOptions: { title: '個人資訊' }
          },
          MerchandiseList: {
            screen: MerchandiseList,
            navigationOptions: { title: '我的商品', tabBarVisible: false }
          },
          NewMerchandise: {
            screen: NewMerchandise,
            navigationOptions: { title: '建立商品', tabBarVisible: false }
          }
        },
        { headerMode: 'screen' }
      ),
      navigationOptions: { title: '個人資訊' }
    },

    MerchandiseGrid: new StackNavigator(
      {
        MerchandiseGrid: {
          screen: MerchandiseGrid,
          navigationOptions: { title: '商城', header: null } // disable header but open all headers in here
        },
        MerchandiseDetail: {
          screen: MerchandiseDetail,
          navigationOptions: { title: '商品詳細', tabBarVisible: false }
        }
      },
      {
        headerMode: 'screen'
      }
    ),
    Home: {
      screen: Home
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
          MerchandiseGrid: 'th',
          TransactionRecord: 'list',
          ShoppingCart: 'shopping-cart',
          Home: 'home'
        };
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        const routeParams = navigation.state.params || {};

        return (
          <BadgeIcon
            name={ICON_MAP[routeName] || ''}
            size={24}
            color={tintColor}
            numberOfBadges={routeParams.numberOfBadges}
          />
        );
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
    App: { screen: AppNavigator },
    Home: { screen: Home },
    Counter: { screen: Counter },
    Camera: { screen: Camera }
  },
  {
    headerMode: 'none'
  }
);

export default RootNavigator;
