import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, FlatList, Image, Button, TouchableOpacity } from 'react-native';
import MOCK from './__data__/merchandise_list.json';
import connectModal from './hoc/connectModal';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemText: {
    color: 'black',
    fontSize: 22,
    flex: 0.8
  },
  thumbnail: {
    width: 72,
    height: 72,
    flex: 0.2
  },
  list: {
    padding: 10
  },
  listItem: {
    padding: 10,
    borderColor: 'black',
    height: 100,
    flexDirection: 'row'
  },
  modal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1
  }
});

class MerchandiseList extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
  };
  state = {
    data: MOCK
  };

  keyExtractor = item => item.price;

  goMerchandiseList = () => {
    this.props.navigation.navigate('NewMerchandise');
  };

  onMerchandisePress = (item) => {
    this.props.openModal({ modalView: this.modal, context: item });
  };

  removeItem = (item) => {};
  modal = ({ context }) => (
    <View style={styles.modal}>
      <View style={styles.buttonContainer}>
        <Button
          color="red"
          title={`刪除 ${context.title}`}
          onPress={() => {
            this.removeItem(context);
            this.props.closeModal();
          }}
        />
      </View>
    </View>
  );
  renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => {
        this.onMerchandisePress(item);
      }}
      onPress={() => {}}
      activeOpacity={0.7}
    >
      <View style={styles.listItem}>
        <Image style={styles.thumbnail} source={{ uri: item.picture_url }} />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          keyExtractor={this.keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem}
        />

        <Button onPress={this.goMerchandiseList} title="新增商品" />
      </View>
    );
  }
}

export default connectModal(MerchandiseList);
