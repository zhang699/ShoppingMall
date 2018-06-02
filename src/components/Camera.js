import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  fullContainer: {
    flex: 1
  }
});

export default class Camera extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  takePicture = async () => {
    if (this.camera) {
      const {
        cameraConfig, to, key, onTakePicture
      } = this.props.navigation.state.params;
      const options = cameraConfig || { quality: 0.5, base64: true };

      const data = await this.camera.takePictureAsync(options);
      if (onTakePicture) {
        onTakePicture(key, data.uri);
      }
      //this.props.navigation.navigate(to, { uri: { [key]: data.uri } });
      this.props.navigation.goBack();
    }
  };
  render() {
    return (
      <View style={styles.fullContainer}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          {/*<TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>*/}
          <Icon.Button name="camera" size={72} onPress={this.takePicture} />
        </View>
      </View>
    );
  }
}
