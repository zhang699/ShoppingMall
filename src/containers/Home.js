import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, PixelRatio } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#eee',
    marginBottom: 5
  }
});

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  toCamera = () => {
    this.props.navigation.navigate('Camera');
  };

  render() {
    const yourWindow = Dimensions.get('window');
    const instructionStyle = StyleSheet.flatten(styles.instructions);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {`Welcome to React Native Boilerplate!, your dimesnion is ${yourWindow.width}, ${
            yourWindow.height
          }`}
        </Text>
        <Text>{`density is ${PixelRatio.get()}`}</Text>
        <TouchableOpacity onPress={this.toCamera}>
          <Text style={{ ...instructionStyle, color: '#aba' }}>Test your Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
