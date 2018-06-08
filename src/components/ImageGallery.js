import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  Easing
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
  },
  animatedIcon: {
    height: 50,
    width: 50
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    contentContainerStyle: ViewPropTypes.style.isRequired
  };

  state = {
    currentIdx: 0,
    scaleAnimatedValue: new Animated.Value(1)
  };

  componentDidMount = () => {
    const DURATION = 1000;
    const toBig = Animated.timing(this.state.scaleAnimatedValue, {
      duration: DURATION,
      easing: Easing.linear,
      toValue: 1.3
    });
    const toSmall = Animated.timing(this.state.scaleAnimatedValue, {
      duration: DURATION,
      easing: Easing.linear,
      toValue: 1
    });

    const breathe = Animated.loop(Animated.sequence([toBig, toSmall]));
    breathe.start();
  };
  next = (nextInc) => {
    const { currentIdx } = this.state;
    const next =
      currentIdx + nextInc < 0 || currentIdx + nextInc >= this.props.images.length
        ? 0
        : currentIdx + nextInc;
    return next;
  };

  toRight = () => {
    this.setState({
      currentIdx: this.next(1)
    });
  };
  toLeft = () => {
    this.setState({
      currentIdx: this.next(-1)
    });
  };
  render() {
    const { currentIdx, scaleAnimatedValue } = this.state;
    const currentImageUri = this.props.images[currentIdx];
    const scaleAnimation = {
      transform: [{ scale: scaleAnimatedValue }]
    };

    return (
      <View style={[this.props.contentContainerStyle]}>
        <Image style={styles.image} source={{ uri: currentImageUri }} />
        <View style={[styles.container, styles.iconContainer]}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.iconRight, styles.center, styles.animatedIcon]}
            onPress={this.toRight}
          >
            <Animated.View style={[scaleAnimation]}>
              <Icon size={28} color="#ccc" name="arrow-right" />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.iconLeft, styles.center, styles.animatedIcon]}
            onPress={this.toLeft}
          >
            <Animated.View style={[scaleAnimation]}>
              <Icon size={28} color="#ccc" name="arrow-left" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
