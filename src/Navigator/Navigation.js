import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import EditorScreen from '../screen/EditorScreen';
import ExportScreen from '../screen/ExportScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={() => ({
          headerShown: false,
        })}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="EditorScreen" component={EditorScreen} />
        <Stack.Screen name="ExportScreen" component={ExportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
