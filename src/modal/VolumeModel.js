import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React from 'react'

const VolumeModel = ({ visible, onClose }) => {
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
                padding: 15,
              }}>
              
            </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

export default VolumeModel

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
})