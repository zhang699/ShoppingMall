import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import RatingBar from 'react-native-star-rating';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  WebView,
  Linking,
  TouchableOpacity,
  Animated
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
    fontSize: 20
  },
  price: {
    alignSelf: 'flex-end'
  },
  metaInfo: {
    fontSize: 20
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
  rating: {
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
    productDetail: MOCK,
    rating: 0,
    scaledValue: new Animated.Value(1)
  };

  componentDidMount() {
    const scaleUp = Animated.timing(this.state.scaledValue, {
      duration: 200,
      toValue: 1.3
    });
    const scaleDown = Animated.timing(this.state.scaledValue, {
      duration: 200,
      toValue: 1
    });
    this.bounceAnimation = Animated.sequence([scaleUp, scaleDown]);
   
  }
  onReplyPress = () => {};
  addComment = () => {};
  addToCart = () => {};
  goPhoneURL = (phone) => {
    Linking.openURL(`tel://${phone}`);
  };
  render() {
    const { productDetail, rating } = this.state;
    const showAddToCart = false;
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
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
              <TouchableOpacity
                onPress={() => {
                  this.goPhoneURL(productDetail.user.phone);
                }}
              >
                <Text style={[styles.title]}>{`電話${productDetail.user.phone}`}</Text>
              </TouchableOpacity>
            </View>
            <Animated.View
              style={[styles.rating, { transform: [{ scale: this.state.scaledValue }] }]}
            >
              <RatingBar
                selectedStar={() => {
                  this.setState({
                    rating: rating === 0 ? 1 : 0
                  });
                  this.bounceAnimation.start(() => {
                    this.bounceAnimation.reset();
                  });
                }}
                maxStars={1}
                rating={rating}
                iconSet="FontAwesome"
              />
            </Animated.View>
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
          <View style={styles.product}>
            <Text style={styles.title}>{productDetail.title}</Text>

            <Text style={[styles.price, styles.metaInfo]}>{`$${productDetail.price}元`}</Text>

            <Text style={[styles.count, styles.metaInfo]}>{`剩餘數量:${productDetail.count}`}</Text>
          </View>

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
              size={28}
            />

            {showAddToCart && (
              <Icon.Button borderRadius={0} onPress={this.addToCart} name="plus" size={28} />
            )}
          </View>
        </View>
      </View>
    );
  }
}
