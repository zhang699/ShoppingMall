import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import TabBar from './TabBar';
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
  },
  assistContainer: {
    backgroundColor: '#26f',
    padding: 10
  },
  searchInput: {
    fontSize: 36
  }
});

const TABS = MOCK_CATAGORIES;
export default class MerchandiseGrid extends Component {
  state = {
    data: MOCK,
    refreshing: false
  };

  keyExtractor = item => item.price;
  goMerchandiseDetail = () => {};

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
  onTabPress = (tab) => {
    console.warn('press tab', tab);
    this.onRefresh();
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={this.goMerchandiseDetail} style={styles.listItem}>
      <Image source={{ uri: item.picture_url }} style={styles.thumbnail} resizeMode="cover" />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={styles.price}>{`$${item.price}`}</Text>
    </TouchableOpacity>
  );
  render() {
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
