import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  TouchableHighlight,
  ScrollView
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  tab: {
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 30,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  }
});
export default class TabBar extends Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    onTabPress: PropTypes.func.isRequired
  };
  state = {
    selected: {}
  };

  onTabPress = (tab) => {
    this.setState({
      selected: {
        [tab.type]: true
      }
    });
    this.props.onTabPress(tab);
  };
  render() {
    const { tabs } = this.props;
    const { selected } = this.state;
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {tabs.map(tab => (
          <TouchableHighlight
            underlayColor="transparent"
            activeOpacity={1}
            onPress={() => {
              this.onTabPress(tab);
            }}
            style={[styles.tab, selected[tab.type] && { borderColor: 'white' }]}
            key={tab.type}
          >
            <View>
              <Text style={styles.text}>{tab.text}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    );
  }
}
