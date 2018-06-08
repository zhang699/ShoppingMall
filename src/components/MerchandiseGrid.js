import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  AppState,
  NetInfo
} from 'react-native';
import TabBar from './TabBar';
import CenterEmptyViewFlatList from './CenterEmptyViewFlatList';
import MOCK from './__data__/merchandise_list.json';
import MOCK_CATAGORIES from './__data__/merchandise_catagories.json';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    borderColor: '#aaa',
    backgroundColor: 'white',
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    flex: 0.5,
    margin: 10
  },
  thumbnailContainer: {
    height: 150,
    alignItems: 'flex-end'
  },
  thumbnail: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  title: {
    fontSize: 22,
    textDecorationLine: 'underline'
  },
  price: {
    alignSelf: 'flex-start',
    fontSize: 22
  },
  merchandiseGrid: {
    padding: 20
  },
  assistContainer: {
    backgroundColor: '#26f',
    padding: 10
  },
  searchInput: {
    fontSize: 20
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  discount: {
    backgroundColor: 'red',
    color: 'white',
    width: 60
  }
});

const TABS = MOCK_CATAGORIES;

const CONNECTION_ERROR = {
  offline: '網路斷線了',
  unknown: '未知的錯誤'
};
export default class MerchandiseGrid extends Component {
  state = {
    data: MOCK,
    refreshing: false,
    appState: AppState.currentState
  };

  goMerchandiseDetail = () => {
    this.props.navigation.navigate('MerchandiseDetail');
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivity);
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivity);
  }

  shuffle = arr => arr.sort(() => Math.random() - 0.5);
  refresh = (add) => {
    this.setState({
      refreshing: true
    });
    setTimeout(() => {
      const mock = this.shuffle(MOCK.map(item => ({ ...item, id: new Date().getTime() })));

      this.setState(
        {
          refreshing: false,
          data: add ? this.state.data.concat(mock) : mock
        },
        () => {
          console.warn('this.data', this.state.data.length);
        }
      );
    }, 1000);
  };
  onTabPress = (tab) => {
    this.refresh();
  };

  keyExtractor = item => item.id;
  emptyView = () => {
    const { error } = this.state;
    return (
      <View style={[styles.container, styles.center]}>
        <Text>{CONNECTION_ERROR[error]}</Text>
      </View>
    );
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={this.goMerchandiseDetail} style={styles.listItem}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.picture_url }} style={styles.thumbnail} resizeMode="cover" />
        {item.discount && <Text style={styles.discount}> {` ${item.discount * 10} 折`} </Text>}
      </View>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={styles.price}>{`$${item.price}`}</Text>
    </TouchableOpacity>
  );

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.refresh();
    }
  };

  handleConnectivity = (isConnected) => {
    if (!isConnected) {
      this.setState({
        data: [],
        error: 'offline'
      });
    } else {
      // refetch your data
      this.refresh();
    }
    this.setState({
      isConnected
    });
  };

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.assistContainer}>
          <TextInput
            placeholder="輸入要搜尋的關鍵字"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={this.onSearchTextChange}
            style={styles.searchInput}
          />
          <TabBar tabs={TABS} onTabPress={this.onTabPress} />
        </View>
        <FlatList
          onEndReached={() => {
            this.refresh(true);
          }}
          scrollEventThrottle={200}
          onEndReachedThreshold={1}
          ListEmptyComponent={this.emptyView}
          refreshing={this.state.refreshing}
          onRefresh={this.refresh}
          contentContainerStyle={styles.merchandiseGrid}
          columnWrapperStyle={styles.column}
          keyExtractor={this.keyExtractor}
          numColumns={2}
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
