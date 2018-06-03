import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  Image,
  Animated,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  iconLeft: {
    left: 10,
    position: 'absolute'
  },
  iconRight: {
    right: 10,
    position: 'absolute'
  },
  iconContainer: {
    justifyContent: 'center'
  }
});
export default class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    contentContainerStyle: ViewPropTypes.style.isRequired
  };

  state = {
    currentIdx: 0
  };

  toRight = () => {
    this.setState({
      currentIdx: (this.state.currentIdx + 1) % this.props.images.length
    });
  };
  toLeft = () => {
    this.setState({
      currentIdx: (this.state.currentIdx - 1) % this.props.images.length
    });
  };
  render() {
    const { currentIdx } = this.state;
    const currentImageUri = this.props.images[currentIdx];
    return (
      <View style={[this.props.contentContainerStyle]}>
        <Image style={styles.image} source={{ uri: currentImageUri }} />
        <View style={[styles.container, styles.iconContainer]}>
          <TouchableOpacity style={styles.iconRight} onPress={this.toRight}>
            <Icon size={56} color="#777" name="arrow-right" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconLeft} onPress={this.toLeft}>
            <Icon size={56} color="#777" name="arrow-left" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
