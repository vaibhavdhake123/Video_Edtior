import {
  StyleSheet,
  View,
  StatusBar,
  Alert,
  Share,
  TouchableOpacity,
  Modal,
  Image,
  Text,
  Linking,
  BackHandler,
} from 'react-native';
import React, {useState} from 'react';
import PickVideo from '../components/PickVideo';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  const [isSettingModalVisible, setSettingModalVisible] = useState(false);

  showSetting = () => setSettingModalVisible(true);
  hideSetting = () => setSettingModalVisible(false);


  const handleAbout = async () => {
    const url = 'https://pawsomecreation.blogspot.com/';
    
    try {
      // Open the URL directly without checking if it can be opened
      console.log('Attempting to open URL...');
      await Linking.openURL(url);
    } catch (error) {
      console.log('Error opening URL:', error);
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };
  

  const handlelegal = async () => {
    const url = 'https://happypawsstudio.blogspot.com/p/cook-crafter-privacy-policy.html';
    try {
      console.log('Attempting to open URL...');
      await Linking.openURL(url);
    } catch (error) {
      console.log('Error opening URL:', error);
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };
  
  const handleRateUs = () => {
    Alert.alert(
      'Rate Us',
      'Thank you for your support! Please rate us on the App Store.',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    );
  };

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this amazing app!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('App shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={false}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={showSetting}>
          <Icon name="settings" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <PickVideo />
      </View>

      <Modal
        transparent={true}
        visible={isSettingModalVisible}
        animationType="fade"
        onRequestClose={hideSetting}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={hideSetting}>
          <View style={styles.modalContent}>

            <TouchableOpacity onPress={handleAbout}>
              <View style={styles.row}>
                <Text style={styles.text}>ABOUT US..!</Text>
                <Image
                  source={require('../assets/images/info.png')}
                  style={styles.img}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRateUs}>
              <View style={styles.row}>
                <Text style={styles.text}>RATE NOW..!</Text>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.img}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleShareApp}>
              <View style={styles.row}>
                <Text style={styles.text}>SHARE NOW..!</Text>
                <Image
                  source={require('../assets/images/send.png')}
                  style={styles.img}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlelegal}>
              <View style={styles.row}>
                <Text style={styles.text}>PRIVACY POLICY</Text>
                <Image
                  source={require('../assets/images/legal.png')}
                  style={styles.img}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                BackHandler.exitApp();
              }}>
              <View style={styles.row}>
                <Text style={styles.text}>Exit</Text>
                <Image
                  source={require('../assets/images/logout.png')}
                  style={styles.img}
                />
              </View>
            </TouchableOpacity>
            
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20,
    paddingRight: 20,
  },
  contentContainer: {
    padding: 15,
    flex: 1,
    alignItems: 'center',
  },
  modalOverlay: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalContent: {
    width: '70%',
    height: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderColor: 'black',
    borderWidth: 0.1,
    borderRadius: 0.1,
  },
  text: {
    color: 'black',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  img: {
    width: 30,
    height: 30,
  },
});
