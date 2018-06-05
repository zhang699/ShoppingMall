import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function connect(WrappedComponent) {
  return class HighOrderComponent extends Component {
    static propTypes = {};
    static defaultProps = {};
    state = {};
    render() {
      return (
        <View style={styles.container}>
          <WrappedComponent {...this.props} />
        </View>
      );
    }
  };
}
