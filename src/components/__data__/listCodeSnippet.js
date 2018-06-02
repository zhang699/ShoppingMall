import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: 'white',
    fontSize: 22
  },
  list: {
    padding: 10
  },
  listItem: {
    padding: 10,
    borderColor: 'black'
  }
});
export default class MerchandiseList extends Component {
  state = {
    data: [
      {
        id: 0,
        title: 'item1'
      },
      {
        id: 1,
        title: 'item2'
      }
    ]
  };

  keyExtractor = item => item.id;
  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
  render() {
    return (
      <View>
        <FlatList
          style={styles.list}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
