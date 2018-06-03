import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes, Text, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MOCK from './__data__/transaction_list.json';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    marginVertical: 10
  },
  itemImage: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute'
  },
  itemImageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end'
  },
  commentActionContainer: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  commentAction: {
    alignSelf: 'center'
  },
  actionText: {
    fontSize: 22,
    alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'flex-end',
    backgroundColor: '#0004'
  },
  listview: {
    padding: 10
  }
});
export default class TransactionRecord extends Component {
  state = {
    data: MOCK
  };

  onLike = () => {
    console.warn('like the seller');
  };
  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.itemImageContainer}>
        <Image style={styles.itemImage} source={{ uri: item.picture_url }} resizeMode="cover" />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {item.title}
        </Text>
      </View>
      {!item.evaluate && (
        <View style={styles.commentActionContainer}>
          <Icon.Button
            color="#ccc"
            style={styles.commentAction}
            backgroundColor="transparent"
            name="thumbs-up"
            size={36}
            underlayColor="transparent"
            activeOpacity={0.7}
            onPress={this.onLike}
          >
            <Text style={styles.actionText}>給予賣家好評</Text>
          </Icon.Button>
        </View>
      )}
      {item.evaluate && <Text style={styles.actionText}>已給評</Text>}
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.listview} renderItem={this.renderItem} data={this.state.data} />
      </View>
    );
  }
}
