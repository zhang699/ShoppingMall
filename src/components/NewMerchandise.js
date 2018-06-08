import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, TextInput, ScrollView, Button, AsyncStorage } from 'react-native';
import PhotoItem from './PhotoItem';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  form: {
    padding: 10
  },
  photoSelect: {
    flexDirection: 'row'
  },
  photos: {},
  merchandiseName: {
    height: 70
  },
  descriptionToolBar: {
    flexDirection: 'row',
    margin: 10
  },
  description: {}
});

const STORE_KEY = 'NewMerchandise';
export default class NewMerchandise extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    const LIMIT = 3;

    this.state = {
      photos: Array.from({ length: LIMIT }, () => ({ empty: true })),
      description: '',
      descriptionStart: 0,
      descriptionEnd: 0,
      title: ''
    };
  }

  async componentWillMount() {
    //this.props.navigation.addListener('focus', () => {});

    const form = await AsyncStorage.getItem(STORE_KEY);
    if (form) {
      this.setState({
        ...this.state,
        ...JSON.parse(form)
      });
    }
  }

  onTitleChange = (text) => {
    this.setState(
      {
        title: text
      },
      () => {
        AsyncStorage.setItem(STORE_KEY, this.composeStringForm());
      }
    );
  };

  onDescriptionSelectionChange = ({ nativeEvent }) => {
    const { start, end } = nativeEvent.selection;
    this.setState({
      descriptionStart: start,
      descriptionEnd: end
    });
  };

  onDescriptionChange = (text) => {
    this.setState({
      description: text
    });
    this.descriptionScrollRef.scrollToEnd();
  };

  composeStringForm = () => {
    const { description, title, photos } = this.state;
    return JSON.stringify({
      description,
      title,
      photos
    });
  };

  attachLink = () => {
    const { description, descriptionStart, descriptionEnd } = this.state;

    const selectionString = description.substring(descriptionStart, descriptionEnd);
    const ANCHOR_LINK = `<a href="http://www.google.com.tw">${selectionString}</a>`;

    this.setState({
      description: description.replace(selectionString, ANCHOR_LINK)
    });
  };
  bolderSelection = () => {};

  goMerchandiseCamera = (i) => {
    const { photos } = this.state;

    const isContainEmpty = photos[i].empty;
    if (isContainEmpty) {
      const onTakePicture = (key, uri) => {
        const newPhotos = [...photos];
        newPhotos[i].empty = false;
        newPhotos[i].uri = uri;
        this.setState(
          {
            photos: newPhotos
          },
          () => {
            AsyncStorage.setItem(STORE_KEY, this.composeStringForm());
          }
        );
      };
      this.props.navigation.navigate('Camera', {
        to: 'NewMerchandise',
        key: i,
        onTakePicture
      });
    }
  };

  render() {
    const { photos } = this.state;
    return (
      <View style={[styles.container]}>
        <ScrollView style={[styles.form, styles.container]}>
          <TextInput
            placeholder="輸入商品名稱"
            value={this.state.title}
            style={styles.merchandiseName}
            onChangeText={this.onTitleChange}
          />
          <View style={styles.photoSelect}>
            {photos.map((photo, i) => (
              <PhotoItem
                key={`photo-${i}`}
                onPress={() => {
                  this.goMerchandiseCamera(i);
                }}
                displayAdd={photo.empty}
                uri={photo.uri}
              />
            ))}
          </View>
          <View>
            <TextInput
              placeholder="請輸入商品數量"
              value={this.state.count}
              onChangeText={this.countChange}
            />
          </View>
          <ScrollView
            ref={(ref) => {
              this.descriptionScrollRef = ref;
            }}
          >
            <TextInput
              onFocus={() => {
                this.setState({
                  showToolBar: true
                });
              }}
              onBlur={() => {
                this.setState({
                  showToolBar: false
                });
              }}
              multiline
              placeholder="請輸入商品敘述"
              value={this.state.description}
              style={styles.description}
              onChangeText={this.onDescriptionChange}
              onSelectionChange={this.onDescriptionSelectionChange}
              ref={(ref) => {
                this.description = ref;
              }}
            />
          </ScrollView>
        </ScrollView>

        {this.state.showToolBar && (
          <View style={styles.descriptionToolBar}>
            <Icon.Button onPress={this.attachLink} color="white" name="link" size={22} />
          </View>
        )}

        <Button title="上傳" onPress={this.upload} />
      </View>
    );
  }
}
