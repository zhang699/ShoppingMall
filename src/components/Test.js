import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  Image,
  TouchableHighlight,
  Button
} from 'react-native';

const cover = require('./__data__/colorado_landscape_4k-750x1334.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 500,
    height: 320,
    borderColor: 1
  }
});
export default class Test extends Component {
  onPress = () => {
    console.warn('onPress..');
  };
  render() {
    return (
      <View style={styles.container}>
        <View />
        <Button title="Test" />
      </View>
    );
  }
}
