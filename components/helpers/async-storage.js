import { AsyncStorage } from 'react-native';

export const storeData = async (key, value, callback = ()=>{}) => {
  try {
    await AsyncStorage.setItem(key, value, callback);
  } catch (error) {
    //console.log(error);
  }
}

export const retrieveData = async (key, callback = ()=>{}) => {
  try {
    await AsyncStorage.getItem(key, callback);
  } catch (error) {
    //console.log(error);
  }
}