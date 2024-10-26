import {
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import {Colors} from '../constant/Color';
import {deviceWidth, deviceHeight} from '../constant/Scaling';
import {Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const EditorScreen = () => {

  const iconsize = screenWidth * 0.07;
  const options = ['480P', '720P', '1080P', '1440P', '2160P'];
  const {videoUri} = route.params;
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedOption, setSelectedOption] = useState('1080P');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({top: 0, left: 0});
  const dropdownButtonRef = useRef(null); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); 
  const [currentTime, setCurrentTime] = useState(0);

  const handleOptionSelect = option => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  const openDropdown = () => {
    dropdownButtonRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownPosition({top: y + height, left: x});
      setDropdownVisible(true);
    });
  };

  const handleProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexrow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={25} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.rightContainer}>
          <TouchableOpacity
            ref={dropdownButtonRef}
            style={styles.dropdownButton}
            onPress={openDropdown}>
            <Text style={styles.selectedText}>{selectedOption}</Text>
            <Icon name="arrow-drop-down" size={20} color="#ffffff" />
          </TouchableOpacity>

          {dropdownVisible && (
            <Modal transparent={true} animationType="fade">
              <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setDropdownVisible(false)}>
                <View
                  style={[
                    styles.dropdown,
                    {
                      position: 'absolute',
                      top: dropdownPosition.top,
                      left: dropdownPosition.left,
                    },
                  ]}>
                  {options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.option}
                      onPress={() => handleOptionSelect(option)}>
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            </Modal>
          )}

          <Icon
            name="start"
            size={25}
            color="#ffffff"
            style={{marginLeft: 10, transform: [{rotate: '270deg'}]}}
          />
        </View>
      </View>

      <View style={styles.flexrow2}>
        {videoUri ? (
          <Video
            source={{uri: videoUri}}
            style={styles.video}
            controls={false}
            resizeMode="none"
            volume={volume} 
            onProgress={handleProgress} 
            paused={!isPlaying}
          />
        ) : (
          <Text>No Video</Text>
        )}
      </View>

      <View style={styles.flexrowControl}>
        <View style={styles.customControls}>
          <Text style={{color: '#ffffff', marginLeft: 20}}>
            {formatTime(currentTime)}
          </Text>
          <TouchableOpacity
            onPress={handlePlayPause}
            style={{marginHorizontal: 10}}>
            <Icon
              name={isPlaying ? 'pause' : 'play-arrow'}
              size={30}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.flexrow3}></View>
      <View style={styles.flexrow4}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.iconstyle}>
            {[
              'Text',
              'Canvas',
              'Ratio',
              'Filter',
              'Freeze',
              'Music',
              'Volume',
              'Crop',
              'Split',
              'Sticker',
              'PIP',
            ].map((label, index) => (
              <View style={styles.iconContainer} key={index}>
                <Icon
                  name={getIconName(label)}
                  size={iconsize}
                  style={styles.icon}
                />
                <Text style={styles.label}>{label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const getIconName = label => {
  switch (label) {
    case 'Text':
      return 'text-fields';
    case 'Canvas':
      return 'brush';
    case 'Ratio':
      return 'aspect-ratio';
    case 'Filter':
      return 'filter';
    case 'Freeze':
      return 'ac-unit';
    case 'Music':
      return 'music-note';
    case 'Volume':
      return 'volume-up';
    case 'Crop':
      return 'crop';
    case 'Split':
      return 'content-cut';
    case 'Sticker':
      return 'emoji-emotions';
    case 'PIP':
      return 'picture-in-picture';
    default:
      return 'help';
  }
};

export default EditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  flexrow: {
    width: '100%',
    flex: 0.07,
    backgroundColor: 'black',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedText: {
    color: '#ffffff',
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    paddingHorizontal: 8,
    backgroundColor: '#333333',
    paddingVertical: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    color: '#ffffff',
  },
  flexrow2: {
    width: '100%',
    flex: 0.4,
    padding: 15,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  flexrowControl: {
    width: '100%',
  },
  customControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 35,
    backgroundColor: 'grey',
  },
  flexrow3: {
    width: '100%',
    flex: 0.43,
    backgroundColor: 'blue',
  },
  flexrow4: {
    width: '100%',
    flex: 0.1,
    backgroundColor: 'black',
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
});
