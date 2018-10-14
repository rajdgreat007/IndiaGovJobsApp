import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

export const createNotificationForDisplay = (message) => {
    if (Platform.OS === 'android') {
        const data = JSON.parse(message.data.data);
        return new firebase.notifications.Notification()
            .setNotificationId(message.messageId)
            .setTitle(data.title)
            .setBody(data.message || 'India Gov. Jobs')
            .setSound('default')
            .setData({
                id: data.postId
            })
            .android.setPriority(firebase.notifications.Android.Priority.High)
            // .android.setSmallIcon("@drawable/ic_stat_work")
            .android.setColor('#6a5acd')
            .android.setChannelId('indiagovjobsnotifications');
    }
}