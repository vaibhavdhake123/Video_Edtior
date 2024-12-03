import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import React, {useEffect, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors} from '../constant/Color';
import Video from 'react-native-video';
import Bottom from '../components/Bottom';
import {deviceWidth} from '../constant/Scaling';
import Timeline from '../components/Timeline';
import {generateThumbnails} from '../opreations/generateThumbnails';

const EditorScreen = () => {
  const options = ['480P', '720P', '1080P', '1440P', '2160P'];
  const route = useRoute();
  const {videoUri} = route.params;
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('1080P');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({top: 0, left: 0});
  const dropdownButtonRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const [thumbnail, setThumbnail] = useState([]);

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
    setDuration(meta.duration); // Ensure video duration is correctly set
    const calculatedWidth = (deviceWidth * meta.duration) / 60; // Adjust scaling
    setTimelineWidth(calculatedWidth);
  };
  

  const handleProgress = data => {
    setCurrentTime(data.currentTime);
    if (scrollViewRef.current) {
      const scrollPosition = (data.currentTime / duration) * timelineWidth;
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

  useEffect(() => {
    const outDir = `${RNFS.CachesDirectoryPath}/thumbnails`;
    const interval = 5; // Generate a thumbnail every 5 seconds
  
    const fetchThumbnails = async () => {
      try {
        // Clear old thumbnails if any
        if (await RNFS.exists(outDir)) {
          await RNFS.unlink(outDir);
        }
        await RNFS.mkdir(outDir);
  
        // Generate thumbnails
        const generatedThumbnails = await generateThumbnails(videoUri, interval, duration);
        setThumbnail(generatedThumbnails);
      } catch (error) {
        console.error('Error generating thumbnails:', error);
      }
    };
  
    if (duration > 1) {
      fetchThumbnails();
    }
  }, [videoUri, duration]);
  

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={Colors.BackgroundColor}
        translucent={false}
      />
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
          <TouchableOpacity onPress={() => navigation.navigate('ExportScreen')}>
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
        {thumbnail.length > 0 ? (
          <Timeline thumbnails={thumbnail} />
        ) : (
          <Text style={{color: '#ffffff', textAlign: 'center'}}>
            Generating thumbnails...
          </Text>
        )}
      </View>

      <View style={styles.flexrow4}>
        <Bottom />
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
    flex: 0.5,
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
    flex: 0.33,
    backgroundColor: Colors.BackgroundColor,
    justifyContent: 'center',
  },
  flexrow4: {
    width: '100%',
    flex: 0.1,
    backgroundColor: Colors.BackgroundColor,
  },
});
