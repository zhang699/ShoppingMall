import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  target: {
    alignSelf: 'flex-start'
  },
  reply: {
    alignSelf: 'flex-end'
  },
  message: {
    borderRadius: 10
  },
  messageText: {
    color: '#fff',
    fontSize: 26
  },
  messageContainer: {
    padding: 10
  },
  replyButton: {
    alignSelf: 'flex-end',
    flex: 0.2
  }
});

const Message = ({ backgroundColor, text }) => (
  <View style={[styles.message, { backgroundColor }]}>
    <Text style={styles.messageText}>{text}</Text>
  </View>
);
Message.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    showReplyButton: PropTypes.bool,
    onReplyPress: PropTypes.func.isRequired
  };

  static defaultProps = {
    showReplyButton: false
  };
  state = {};

  onReplyPress = (comment) => {
    this.props.onReplyPress(comment);
  };
  render() {
    const { comments } = this.props;
    return (
      <View style={styles.container}>
        {comments.map(comment => (
          <View key={comment.from}>
            <View style={[styles.target, styles.messageContainer]}>
              <Message text={comment.content} backgroundColor="#ccc" />
            </View>
            {comment.replies.map(reply => (
              <View style={[styles.reply, styles.messageContainer]}>
                <Message text={reply.content} backgroundColor="#111" />
              </View>
            ))}

            <View style={styles.replyButton}>
              {this.props.showReplyButton && (
                <Icon.Button
                  onPress={() => {
                    this.onReplyPress(comment);
                  }}
                  name="reply"
                  backgroundColor="transparent"
                  color="black"
                  activeOpacity={0.7}
                  size={28}
                />
              )}
            </View>
          </View>
        ))}
      </View>
    );
  }
}
