import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes, Text, FlatList, Button } from 'react-native';
import MOCK from './__data__/shopping_cart';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row'
  },
  header: {
    flexDirection: 'row'
  },
  item: {
    fontSize: 18,
    flex: 0.3
  },
  itemTitle: {
    flex: 0.7
  },
  itemHeaderText: {
    fontSize: 32,
    textAlign: 'center'
  },
  itemText: {
    fontSize: 22,
    textAlign: 'center'
  },
  listview: {
    padding: 10,
    flex: 0
  },
  total: {
    fontSize: 30,
    alignSelf: 'flex-end'
  }
});
const Header = () => (
  <View style={styles.header}>
    <Text style={[styles.itemTitle, styles.itemHeaderText]}>品名</Text>
    <Text style={[styles.item, styles.itemHeaderText]}>價格與數量</Text>
  </View>
);
export default class ShoppingCart extends Component {
  state = {
    data: MOCK
  };
  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.itemTitle, styles.itemText]}>
        {item.title}
      </Text>
      <View style={styles.item}>
        <Text style={[styles.itemText]}>{`NT$${item.price}`}</Text>
        <Text style={[styles.itemText]}>{`x${item.buy_count}`}</Text>
      </View>
    </View>
  );

  render() {
    const total = this.state.data.reduce((accum, item) => accum + item.price, 0);
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View>
            <FlatList
              ListHeaderComponent={Header}
              renderItem={this.renderItem}
              data={this.state.data}
            />
          </View>

          <View>
            <FlatList />
          </View>
          <View style={styles.buyerDetail}>
            <Text style={styles.total}>{`總計：${total}`}</Text>
          </View>
        </View>

        <Button title="確認購買" />
      </View>
    );
  }
}
