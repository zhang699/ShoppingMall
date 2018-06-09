import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalView: {
    flex: 1,
    backgroundColor: '#333a'
  },
  closeModalView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

const EmptyComponent = () => {};
export default function connectModal(WrappedComponent) {
  return class AppModal extends Component {
    state = {
      visible: false,
      modalView: EmptyComponent
    };
    openModal = ({ modalView, context }) => {
      const ModalView = modalView || EmptyComponent;
      this.setState({
        modalView: () => <ModalView context={context} />,
        visible: true
      });
    };
    closeModal = () => {
      this.setState({
        visible: false
      });
    };
    render() {
      const WrappedContextModalView = this.state.modalView;
      return (
        <View style={styles.container}>
          <WrappedComponent
            {...this.props}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
          <Modal
            animationType="slide"
            transparent
            visible={this.state.visible}
            onRequestClose={() => {
              this.setState({
                visible: false
              });
            }}
          >
            <View style={styles.modalView}>
              <TouchableOpacity onPress={this.closeModal} style={styles.closeModalView} />
              <WrappedContextModalView />
            </View>
          </Modal>
        </View>
      );
    }
  };
}
