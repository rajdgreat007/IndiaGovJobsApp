import firebase from 'react-native-firebase';
import { createNotificationForDisplay } from './components/helpers/common-functions';

export default async (message) => {
    const newNotification = createNotificationForDisplay(message);
    return firebase.notifications().displayNotification(newNotification);
}