import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  WebView,
  Linking
} from 'react-native';
import ImageGallery from './ImageGallery';
import Comments from './Comments';

import myAvatar from './__data__/myAvatar.png';
import MOCK from './__data__/merchandise_detail.json';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageGallery: {
    width: '100%',
    height: 400
  },
  control: {
    flexDirection: 'row',
    backgroundColor: '#ddd'
  },
  controlContainer: {
    flexDirection: 'row',
    flex: 1
  },
  commentInput: {
    flex: 1,
    fontSize: 22
  },
  iconButton: {
    borderRadius: 0
  },
  title: {
    fontSize: 30
  },
  price: {
    alignSelf: 'flex-end'
  },
  metaInfo: {
    fontSize: 24
  },
  product: {
    padding: 10,
    backgroundColor: 'white'
  },
  count: {
    alignSelf: 'flex-end'
  },
  description: {
    height: 300
  },
  meta: {
    flexDirection: 'column',
    flex: 0.7
  },
  seller: {
    flexDirection: 'row',
    marginVertical: 10
  },
  sellerAvatarContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sellerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  scrollView: {}
});
export default class MerchandiseDetail extends Component {
  state = {
    productDetail: MOCK
  };

  onReplyPress = () => {};
  addComment = () => {};
  addToCart = () => {};
  render() {
    const { productDetail } = this.state;
    const showAddToCart = false;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ImageGallery
            contentContainerStyle={styles.imageGallery}
            images={productDetail.picture_urls}
          />

          <View style={styles.seller}>
            <View style={styles.sellerAvatarContainer}>
              <Image
                resizeMode="cover"
                style={styles.sellerAvatar}
                source={myAvatar || { uri: productDetail.user.avatar }}
              />
            </View>
            <View style={styles.meta}>
              <Text style={[styles.sellerTitle, styles.title]}>{productDetail.user.name}</Text>
              <Text style={[styles.evaluationTitle, styles.title]}>
                {`評價：${productDetail.user.evaluation}`}
              </Text>
            </View>
          </View>

          <View style={styles.product}>
            <Text style={styles.title}>{productDetail.title}</Text>

            <Text style={[styles.price, styles.metaInfo]}>{`$${productDetail.price}元`}</Text>
            <Text style={[styles.count, styles.metaInfo]}>{`剩餘數量:${productDetail.count}`}</Text>
          </View>

          <WebView
            scrollEnabled
            style={styles.description}
            source={{ html: productDetail.description, baseUrl: '' }}
            ref={(ref) => {
              this.webview = ref;
            }}
            onNavigationStateChange={(event) => {
              if (event.url.indexOf('about:blank') < 0) {
                this.webview.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          />
          <View style={styles.comment}>
            <Comments
              onReplyPress={this.onReplyPress}
              showReplyButton
              comments={productDetail.comments}
            />
          </View>
        </ScrollView>

        <View style={styles.control}>
          <View style={styles.controlContainer}>
            <TextInput style={styles.commentInput} placeholder="輸入留言" />

            <Icon.Button
              activeOpacity={0.7}
              borderRadius={0}
              onPress={this.addComment}
              name="comments"
              size={56}
            />

            {showAddToCart && (
              <Icon.Button borderRadius={0} onPress={this.addToCart} name="plus" size={56} />
            )}
          </View>
        </View>
      </View>
    );
  }
}
