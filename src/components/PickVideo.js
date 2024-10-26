import { Alert, StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native'; 
import { deviceHeight, deviceWidth } from '../constant/Scaling';
import { Colors } from '../constant/Color';

const PickVideo = () => {
  const [videoUri, setVideoUri] = useState(null);
  const navigation = useNavigation();

  const pickVideoGallery = () => {
    const options = {
      mediaType: 'video',
      videoQuality: 'high',
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response) => {
      console.log('Image Picker Response:', response);

      if (response.didCancel) {
        Alert.alert('Cancelled', 'No video was selected.');
      } else if (response.errorCode) {
        Alert.alert('Error', `Error picking video: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        const selectedVideoUri = response.assets[0].uri;
        if (selectedVideoUri) {
          setVideoUri(selectedVideoUri);
          console.log('Selected Video URI:', selectedVideoUri);
          navigation.navigate('EditorScreen', { videoUri: selectedVideoUri });
        } else {
          Alert.alert('Error', 'No video URI found.');
        }
      } else {
        Alert.alert('Error', 'Unexpected error occurred while selecting the video.');
      }
    });
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const permission = Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission, {
          title: 'Gallery Permission',
          message: 'App needs access to your photo gallery to select videos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission granted');
          pickVideoGallery();
        } else {
          console.log('Permission denied');
          Alert.alert('Permission Denied', 'You need to grant permission to access the gallery.');
        }
      } catch (err) {
        console.warn('Error while requesting permission:', err);
        Alert.alert('Permission Error', 'Something went wrong while requesting permissions.');
      }
    } else {
      pickVideoGallery(); // No permission required for iOS
    }
  };

  return (
    <TouchableOpacity onPress={requestPermission} style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[Colors.StartColor, Colors.EndColor]}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <Icon name="add-circle" size={30} color="black" />
          <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
            New Project
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PickVideo;

const styles = StyleSheet.create({
  container: {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.175,
    borderRadius: 20,
    marginVertical: 10,
  },
  gradient: {
    flex: 1,
    padding: 15,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
