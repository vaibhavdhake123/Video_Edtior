import {StyleSheet, View,StatusBar} from 'react-native';
import React from 'react';
import PickVideo from '../components/PickVideo';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
    <StatusBar barStyle='dark-content' hidden={false} backgroundColor='white' translucent={false} />
      <View style={styles.iconContainer}>
        <Icon name="settings" size={30} color="#000" />
      </View>
      <View style={styles.contentContainer}>
        <PickVideo />
      </View>
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
});
