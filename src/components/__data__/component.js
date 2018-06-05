import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default class ClassName extends Component {
  static propTypes = {};

  static defaultProps = {};
  render() {
    return (
      <View style={styles.container}>
        <Text />
      </View>
    );
  }
}
