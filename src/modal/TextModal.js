import React, { useRef }  from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { iconsize } from '../constant/Scaling';

const TextModal = ({ visible, onClose }) => {


  const inputRef = useRef(null);

  const handleKeyboardPress = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus on TextInput
    }
  };

  const handleTextFormatPress = () => {
    // Add text formatting logic here
    console.log("Text Format icon pressed");
  };

  const handleColorTextPress = () => {
    // Add text color change logic here
    console.log("Color Text icon pressed");
  };
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
                paddingHorizontal:25,
              }}>
              
              <TouchableOpacity style={{alignItems: 'center'}} onPress={handleKeyboardPress} >
              <Icon name="keyboard" color={'black'} size={iconsize} />
              <Text style={{fontSize: 14, color: 'black'}}>Text</Text>
              </TouchableOpacity>
              

              <View style={{alignItems: 'center'}}>
              <Icon name="text-format" color={'black'} size={iconsize}/>
              <Text style={{fontSize: 14, color: 'black'}}>Fonts</Text>
              </View>

              
              <View style={{alignItems: 'center'}}>
              <Icon name="format-color-text" color={'black'} size={iconsize} />
              <Text style={{fontSize: 14, color: 'black'}}>Color</Text>
              </View>

            </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

export default TextModal

const styles = StyleSheet.create({
    modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
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