import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {iconsize} from '../constant/Scaling';

const Bottom = () => {
  const navigation = useNavigation();
  const [isCanvasModalVisible, setCanvasModalVisible] = useState(false);
  const [isTextModalVisible, setTextModalVisible] = useState(false);
  const [isStickerModalVisible, setStickerModalVisible] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isMusicModalVisible, setMusicModalVisible] = useState(false);
  const [isVolumeModalVisible, setVolumeModalVisible] = useState(false);
  const [isCropModalVisible, setCropModalVisible] = useState(false);
  const [isSplitModalVisible, setSplitModalVisible] = useState(false);
  const [isPIPModalVisible, setPIPModalVisible] = useState(false);
  const [isFreezeModalVisible, setFreezeModalVisible] = useState(false);

  const showCanvasModal = () => setCanvasModalVisible(true);
  const hideCanvasModal = () => setCanvasModalVisible(false);

  const showTextModal = () => setTextModalVisible(true);
  const hideTextModal = () => setTextModalVisible(false);

  const showStickerModal = () => setStickerModalVisible(true);
  const hideStickerModal = () => setStickerModalVisible(false);

  const showFilterModal = () => setFilterModalVisible(true);
  const hideFilterModal = () => setFilterModalVisible(false);

  const showMusicModal = () => setMusicModalVisible(true);
  const hideMusicModal = () => setMusicModalVisible(false);

  const showVolumeModal = () => setVolumeModalVisible(true);
  const hideVolumeModal = () => setVolumeModalVisible(false);

  const showCropModal = () => setCropModalVisible(true);
  const hideCropModal = () => setCropModalVisible(false);

  const showSplitModal = () => setSplitModalVisible(true);
  const hideSplitModal = () => setSplitModalVisible(false);

  const showPIPModal = () => setPIPModalVisible(true);
  const hidePIPModal = () => setPIPModalVisible(false);

  const showFreezeModal = () => setFreezeModalVisible(true);
  const hideFreezeModal = () => setFreezeModalVisible(false);

  const iconActions = [
    {
      label: 'Canvas',
      iconName: 'aspect-ratio',
      onPress: showCanvasModal,
    },
    {
      label: 'Text',
      iconName: 'text-fields',
      onPress: showTextModal,
    },
    {
      label: 'Sticker',
      iconName: 'emoji-emotions',
      onPress: showStickerModal,
    },
    {
      label: 'Filter',
      iconName: 'filter',
      onPress: showFilterModal,
    },
    {
      label: 'Music',
      iconName: 'music-note',
      onPress: showMusicModal,
    },
    {
      label: 'Volume',
      iconName: 'volume-up',
      onPress: showVolumeModal,
    },
    {
      label: 'Crop',
      iconName: 'crop',
      onPress: showCropModal,
    },
    {
      label: 'Split',
      iconName: 'content-cut',
      onPress: showSplitModal,
    },
    {
      label: 'PIP',
      iconName: 'picture-in-picture',
      onPress: showPIPModal,
    },
    {
      label: 'Freeze',
      iconName: 'ac-unit',
      onPress: showFreezeModal,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconstyle}>
          {iconActions.map((item, index) => (
            <View style={styles.iconContainer} key={index}>
              <TouchableOpacity onPress={item.onPress}>
                <Icon
                  name={item.iconName}
                  size={iconsize}
                  style={styles.icon}
                />
                <Text style={styles.label}>{item.label}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/*Canvas Modal*/}
      <Modal
        transparent={true}
        visible={isCanvasModalVisible}
        animationType="fade"
        onRequestClose={hideCanvasModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={hideCanvasModal}>
          <View style={styles.modalContent}></View>
        </TouchableOpacity>
      </Modal>

      {/* Text Modal */}
      <Modal
        transparent={true}
        visible={isTextModalVisible}
        animationType="fade"
        onRequestClose={hideTextModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={hideTextModal}>
          <View style={styles.modalContent}></View>
        </TouchableOpacity>
      </Modal>

      {/* Sticker */}
      <Modal
        transparent={true}
        visible={isStickerModalVisible}
        animationType="fade"
        onRequestClose={hideStickerModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={hideStickerModal}>
          <View style={styles.modalContent}></View>
        </TouchableOpacity>
      </Modal>

      {/* Filter */}
      <Modal
        transparent={true}
        visible={isFilterModalVisible}
        animationType="fade"
        onRequestClose={hideFilterModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={hideFilterModal}>
          <View style={styles.modalContent}></View>
        </TouchableOpacity>
      </Modal>

      {/* Music */}
      <Modal
        transparent={true}
        visible={isMusicModalVisible}
        animationType="fade"
        onRequestClose={hideMusicModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={hideMusicModal}>
          <View style={styles.modalContent}></View>
        </TouchableOpacity>
      </Modal>


      {/* Volume */}
      <Modal
        transparent={true}
        visible={isVolumeModalVisible}
        animationType="fade"
        onRequestClose={hideVolumeModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={hideVolumeModal}>
          <View style={styles.modalContent}></View>
        </TouchableOpacity>
      </Modal>

      {/* Crop */}
      <Modal
        transparent={true}
        visible={isCropModalVisible}
        animationType="fade"
        onRequestClose={hideCropModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={hideCropModal}>
          <View style={styles.modalContent}></View>
        </TouchableOpacity>
      </Modal>

      {/* Split */}
      <Modal
        transparent={true}
        visible={isSplitModalVisible}
        animationType="fade"
        onRequestClose={hideSplitModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={hideSplitModal}>
          <View style={styles.modalContent}></View>
        </TouchableOpacity>
      </Modal>

      {/* PIP */}
      <Modal
        transparent={true}
        visible={isPIPModalVisible}
        animationType="fade"
        onRequestClose={hidePIPModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={hidePIPModal}>
          <View style={styles.modalContent}></View>
        </TouchableOpacity>
      </Modal>

      {/* Freeze */}
      <Modal
        transparent={true}
        visible={isFreezeModalVisible}
        animationType="fade"
        onRequestClose={hideFreezeModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={hideFreezeModal}>
          <View style={styles.modalContent}></View>
        </TouchableOpacity>
      </Modal>


    </View>
  );
};

export default Bottom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  iconstyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  icon: {
    color: '#ffffff',
  },
  label: {
    marginTop: 5,
    color: '#ffffff',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    margin: 100,
  },
});
