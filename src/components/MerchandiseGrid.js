import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';

import MOCK from './__data__/merchandise_list.json';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    borderColor: '#aaa',

    backgroundColor: 'white',
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    margin: 10,
    flex: 0.5
  },
  thumbnail: {
    height: 150
  },
  title: {
    fontSize: 22
  },
  price: {
    alignSelf: 'flex-start',
    fontSize: 22
  },
  merchandiseGrid: {
    padding: 20
  }
});
export default class MerchandiseGrid extends Component {
  state = {
    data: MOCK,
    refreshing: false
  };

  keyExtractor = item => item.price;
  goMerchandiseDetail = () => {};
  renderItem = ({ item }) => (
    <TouchableOpacity onPress={this.goMerchandiseDetail} style={styles.listItem}>
      <Image source={{ uri: item.picture_url }} style={styles.thumbnail} resizeMode="cover" />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={styles.price}>{`$${item.price}`}</Text>
    </TouchableOpacity>
  );

  shuffle = arr => arr.sort(() => Math.random() - 0.5);
  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    setTimeout(() => {
      this.setState({
        refreshing: false,
        data: this.shuffle(this.state.data)
      });
    }, 1);
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
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
