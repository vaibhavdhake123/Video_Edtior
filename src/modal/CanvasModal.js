import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { iconsize } from '../constant/Scaling';

const CanvasModal = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}>
        <View style={styles.modalContent}>
        <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal:20,
              }}>
              <View style={{alignItems: 'center'}}>
                <Icon name="crop-square" size={iconsize} color={'black'} />
                <Text style={{fontSize: 14, color: 'black'}}>1:1</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Icon name="crop-portrait" size={iconsize} color={'black'} />
                <Text style={{fontSize: 14, color: 'black'}}>4:5</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Icon name="crop-din" size={iconsize} color={'black'} />
                <Text style={{fontSize: 14, color: 'black'}}>3:4</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Icon name="stay-primary-portrait" size={iconsize} color={'black'} />
                <Text style={{fontSize: 14, color: 'black'}}>9:16</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Icon name="crop-landscape" size={iconsize} color={'black'} />
                <Text style={{fontSize: 14, color: 'black'}}>16:9</Text>
              </View>
            </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    margin: 100,
  },
});

export default CanvasModal;
