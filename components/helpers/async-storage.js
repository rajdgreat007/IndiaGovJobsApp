import { AsyncStorage } from 'react-native';

export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key,value);
    } catch (error) {
      // Error saving data
    }
}

export const retrieveData = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
     } catch (error) {
       return null;
     }
}