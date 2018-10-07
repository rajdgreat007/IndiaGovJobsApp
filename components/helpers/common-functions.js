import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

export const createNotificationForDisplay = (message) => {
    if (Platform.OS === 'android') {
        const data = JSON.parse(message.data.data);
        return new firebase.notifications.Notification()
            .setNotificationId(message.messageId)
            .setTitle(data.title)
            .setBody(data.message)
            .setSound('default')
            .setData({
                id: data.postId,
                title: data.postId
            })
            .setSubtitle(data.postId)
            .android.setPriority(firebase.notifications.Android.Priority.High)
            .android.setChannelId('alert');
    }
}