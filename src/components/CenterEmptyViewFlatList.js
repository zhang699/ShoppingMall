import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes, Text, FlatList } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default class CenterEmptyViewFlatList extends FlatList {
  static propTypes = {};

  static defaultProps = {};
  render() {
    const { data, ListEmptyComponent } = this.props;
    if (data.length === 0 && ListEmptyComponent) {
      return (
        <View style={styles.container}>
          <ListEmptyComponent />
        </View>
      );
    }
    return super.render();
  }
}
