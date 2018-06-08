import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  defaultSize: {
    width: 64,
    height: 64
  },
  dashBorder: {
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: 'black'
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  photo: {
    width: 64,
    height: 64
  }
});
export default class PhotoItem extends Component {
  static propTypes = {
    displayAdd: PropTypes.bool,
    onPress: PropTypes.func.isRequired
  };

  static defaultProps = {
    displayAdd: false
  };
  render() {
    const { displayAdd, uri } = this.props;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.defaultSize, styles.dashBorder, styles.itemContainer]}
      >
        {displayAdd && <Icon size={22} name="plus" />}
        {uri && <Image source={{ uri }} style={styles.photo} resizeMode="cover" />}
      </TouchableOpacity>
    );
  }
}
