import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import {Sticker} from '../constant/Sticker';
import { Colors } from '../constant/Color';

const StickerModal = ({visible, onClose}) => {
  const renderSticker = ({item}) => (
    <TouchableOpacity>
      <Image source={item.img} style={styles.stickerImage} />
    </TouchableOpacity>
  );

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
          <FlatList
            data={Sticker}
            renderItem={renderSticker}
            keyExtractor={item => item.id.toString()}
            numColumns={5}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default StickerModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '90%',
    padding: 15,
    height: 300,
    backgroundColor: Colors.BackgroundColor,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 20,
  },
  flatListContent: {
    justifyContent: 'center',
  },
  stickerImage: {
    width: 35,
    height: 35,
    padding: 20,
    margin: 10,
  },
});
