import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  formInput: {
    width: 320,
    height: 60,
    marginVertical: 20,
    fontSize: 22
  },
  nameInput: {
    width: 300,
    height: 50,
    fontSize: 22,
    textAlign: 'center'
  },
  borderInputItem: {
    borderColor: 'transparent',
    borderWidth: 3,
    borderBottomColor: 'white'
  },
  container: {
    flex: 1
  },
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderColor: 'white',
    borderWidth: 2,
    position: 'absolute'
  },
  cameraContainer: {
    width: 128,
    height: 128,
    justifyContent: 'flex-end'
  },
  cameraIcon: {
    alignSelf: 'flex-end'
  },
  person: {
    alignItems: 'center'
  },
  control: {
    flexDirection: 'row',
    margin: 40
  }
});

const cover = require('./__data__/colorado_landscape_4k-750x1334.jpg');
const emptyAvatar = require('./__data__/icons8-user-filled-50.png');

export default class PersonalInfo extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  state = {
    form: {
      tel: '',
      name: '',
      address: ''
    },
    avatarUri: ''
  };

  fillForm = name => (text) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: text
      }
    });
  };

  goMerchandiseList = () => {
    this.props.navigation.navigate('MerchandiseList');
  };

  goAvatarCamera = () => {
    const onTakePicture = async (key, uri) => {
      this.setState({
        avatarUri: uri,
        uploading: true
      });
      // upload to Google Cloud Storage

      const result = await RNFetchBlob.fetch(
        'POST',
        `https://www.googleapis.com/upload/storage/v1/b/staging.auctionmall-53ad1.appspot.com/o?uploadType=media&name=${new Date().getTime()}`,
        {
          Authorization:
            'Bearer ya29.GlzSBZwYYOh-VJhv3c8hEU8zlQpjjDxrkxjC1-69l8IC6RbQQ2ecmHuAyy2wGBdkIYo1AL7CRKtIqPtQO-5uII0z93lQp20pq2DQhcQ74e4gdD5LFr-Fxk4TVbKwHg'
        },
        RNFetchBlob.wrap(uri)
      );
      if (result.error) {
        this.setState({
          uploadError: true
        });
      }
      this.setState({
        uploading: false
      });
    };
    this.props.navigation.navigate('Camera', { key: 'avatar', onTakePicture });
  };
  renderPersonAvatar = (name) => {
    const { avatarUri } = this.state;
    const avatarSouce = avatarUri ? { uri: avatarUri } : emptyAvatar;
    return (
      <View style={styles.person}>
        <TouchableOpacity onPress={this.goAvatarCamera} style={styles.cameraContainer}>
          <Image style={styles.avatar} resizeMode="cover" source={avatarSouce} />
          <Icon style={styles.cameraIcon} name="camera" size={30} />
        </TouchableOpacity>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.fillForm('name')}
          value={name}
          placeholder="請點擊設定姓名"
          placeholderTextColor="white"
          returnKeyType="next"
          underlineColorAndroid="transparent"
          ref={(ref) => {
            this.nameRef = ref;
          }}
          onSubmitEditing={() => {
            this.addressRef.focus();
          }}
          blurOnSubmit={false}
        />
      </View>
    );
  };
  render() {
    /** resizeMode: 'cover' 'stretch' */
    const { form } = this.state;
    const formInputStyle = [styles.formInput, styles.borderInputItem];
    return (
      <View style={[styles.container]}>
        <Image style={styles.cover} blurRadius={5} resizeMode="cover" source={cover} />
        <View style={styles.form}>
          {this.renderPersonAvatar(form.name)}
          <TextInput
            onChangeText={this.fillForm('address')}
            style={formInputStyle}
            value={form.address}
            placeholder="請設定地址"
            placeholderTextColor="white"
            returnKeyType="next"
            underlineColorAndroid="transparent"
            ref={(ref) => {
              this.addressRef = ref;
            }}
            onSubmitEditing={() => {
              this.telRef.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={this.fillForm('tel')}
            style={formInputStyle}
            value={form.tel}
            placeholder="請設定電話"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            ref={(ref) => {
              this.telRef = ref;
            }}
          />
        </View>
        <Button
          disabled={this.state.uploading}
          title="前往商品清單"
          onPress={this.goMerchandiseList}
        />
      </View>
    );
  }
}
