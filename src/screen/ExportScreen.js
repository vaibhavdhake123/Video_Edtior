import { StyleSheet, Text, View ,StatusBar, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../constant/Color'
import {deviceHeight,deviceWidth} from '../constant/Scaling'
import { useNavigation } from '@react-navigation/native';

const ExportScreen = () => {
const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <StatusBar barStyle='dark-content' hidden={false} backgroundColor='white' translucent={false} />
      <View style={styles.contentContainer}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[Colors.ExStartColor, Colors.ExEndColor]}
        style={styles.gradient}
      >
      <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>
      <Icon name='home' size={35} color={'white'} />
      </TouchableOpacity>
      </LinearGradient>
      </View>
    </View>
  )
}

export default ExportScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    justifyContent :'flex-start',
    alignItems:'center',
  },
  contentContainer:{
    width: deviceWidth * 0.85,
    height: deviceHeight * 0.175,
    backgroundColor:'black',
    borderRadius:15,
    marginTop:50,
    justifyContent:'center',
    alignItems:'center'
    
  },
  gradient: {
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
  },
})