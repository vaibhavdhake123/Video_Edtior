import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import { Colors } from '../constant/Color';
import Video from 'react-native-video';
import Timeline from '../components/Timeline';
import Bottom from '../components/Bottom';


const EditorScreen = () => {
 
  const options = ['480P', '720P', '1080P', '1440P', '2160P'];
  const route = useRoute();
  const {videoUri} = route.params;
  const scrollViewRef = useRef(null);
  const videoRef = useRef(null);
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('1080P');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({top: 0, left: 0});
  const dropdownButtonRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);

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

  const handleLoad = meta => {
    setDuration(meta.duration); // Set duration when video loads
  };

  const handleTimelinePress = time => {
    setCurrentTime(time);
    videoRef.current?.seek(time); // Ensure the video jumps to the pressed time
  };

  const handleProgress = data => {
    setCurrentTime(data.currentTime);

    if (scrollViewRef.current) {
      const thumbnailWidth = 75; // Ensure this matches the width of each thumbnail in the timeline
      const scrollPosition =
        (data.currentTime / duration) * (thumbnailWidth * 10); // Assuming 10 thumbnails
      scrollViewRef.current.scrollTo({x: scrollPosition, animated: true});
    }
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
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.BackgroundColor} translucent={false} />
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
          <TouchableOpacity onPress={()=>navigation.navigate('ExportScreen')}>
          <Icon
            name="start"
            size={25}
            color="#ffffff"
            style={{marginLeft: 20, transform: [{rotate: '270deg'}]}}
          />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.flexrow2}>
        {videoUri ? (
          <Video
            source={{uri: videoUri}}
            style={styles.video}
            controls={false}
            resizeMode="none"
            onProgress={handleProgress}
            onLoad={handleLoad}
            paused={!isPlaying}
            volume={volume}
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
      <View style={styles.flexrow3}>
        <Timeline
          videoUri={videoUri}
          currentTime={currentTime}
          onThumbnailPress={handleTimelinePress}
          scrollViewRef={scrollViewRef}
          duration={duration}
        />
      </View>
      <View style={styles.flexrow4}>
        <Bottom/>
      </View>
    </View>
  );
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
    backgroundColor: Colors.BackgroundColor,
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
    backgroundColor: Colors.BackgroundColor,
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
    backgroundColor: Colors.BackgroundColor,
  },
  flexrow3: {
    width: '100%',
    flex: 0.43,
    backgroundColor: Colors.BackgroundColor,
  },
  flexrow4: {
    width: '100%',
    flex: 0.1,
    backgroundColor: Colors.BackgroundColor,
  },
});
