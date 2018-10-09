import React from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Alert } from 'react-native';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import firebase, { RemoteMessage, Notification, NotificationOpen } from 'react-native-firebase';
import Posts from '../components/Posts';
import { BannerAd } from '../components/Ads';
import { storeData, retrieveData } from '../components/helpers/async-storage';
import { createNotificationForDisplay } from '../components/helpers/common-functions';

const WP_REQUEST_URL_POSTS = "https://indiagovjobs.com/wp-json/wp/v2/posts?_embed";
const WP_POSTS_PER_PAGE = 10;
//const WP_REGISTER_DEVICE_URL = "https://indiagovjobs.com/wp-json/apnwp/register?os_type=android&device_token=";
const WP_REGISTER_DEVICE_URL = "https://indiagovjobs.com//wp-json/pd/fcm/subscribe";

export default class PostListScreen extends React.Component {

  static navigationOptions = {
    title: 'Job Posts'
  };

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.loading = false;
    this.page = 1;
  }

  // callback = (error, result) => {
  //   console.log('hjkkk');
  //   if (error || !result) {

  //     firebase.messaging().requestPermission()
  //       .then(() => {
  //         // User has authorised  


  //       })
  //       .catch(error => {
  //         // User has rejected permissions  
  //       });
  //   }
  // };

  // saveDeviceId = params => {
  //   retrieveData('deviceId', this.callback);
  // };

  fetchPosts = params => {
    if (!this.loading) {
      this.loading = true;
      if (params && params.refetch) {
        this.page = 1;
      }
      const requestUrl = WP_REQUEST_URL_POSTS + '&per_page=' + WP_POSTS_PER_PAGE + '&page=' + this.page;
      fetch(requestUrl)
        .then(res => res.json())
        .then(posts => {
          this.loading = false;
          let newPosts = posts.map(this.mapPosts);
          this.page++;
          this.setState((prevState, props) => {
            if (params && params.loadMore) {
              newPosts = prevState.posts.concat(newPosts);
            }
            return { posts: newPosts }
          })
        });
    }
  }

  saveDeviceIdToBackend = () => {
    firebase.messaging().getToken()
      .then(fcmToken => {
        if (fcmToken) {
          fetch(WP_REGISTER_DEVICE_URL + '?user_email=' + fcmToken + '@gmail.com&device_token=' + fcmToken + '&subscribed=all')
            .then(
              res => {
                //console.log(res);
                //storeData('deviceId', '1');
              }
            )
            .catch(
              err => {
                //console.log(err);
              }
            );
        } else {
          // user doesn't have a device token yet
        }
      });
  }

  checkPermissions = () => {
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions
          this.saveDeviceIdToBackend();
        } else {
          // user doesn't have permission
          firebase.messaging().requestPermission()
            .then(() => {
              // User has authorised  
              this.saveDeviceIdToBackend();
            })
            .catch(error => {
              // User has rejected permissions  
            });
        }
      });
  };

  componentWillMount() {
    OneSignal.init("615a66b4-f74b-461d-b45e-1871c3ae7f33");
    //this.saveDeviceId();
    this.checkPermissions();
  }

  componentDidMount() {
    this.fetchPosts();
    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
      const newNotification = createNotificationForDisplay(message);
      return firebase.notifications().displayNotification(newNotification);
    });

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      //this is called automatically when the notification reaches user's device
      //Alert.alert('notification displayed');
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      //Alert.alert('notification received');

      // Process your notification as required
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      //const action = notificationOpen.action;
      // Get information about the notification that was opened
      //const notification: Notification = notificationOpen.notification;
      // this.props.navigation.navigate('PostDetails', {
      //   key: '1719',
      //   title: 'yo title'
      // });
      //Alert.alert('notification opened fg');
      
    });

    firebase.notifications().getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notification: Notification = notificationOpen.notification;  
          //Alert.alert('notification opened bg');
          
        }
      });


  }

  componentWillUnmount() {
    //this.messageListener();
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  mapPosts = (post) => {
    let imagePath = null;
    try {
      imagePath = post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['thumbnail']['source_url'];
    } catch (e) { }
    return {
      key: post.id.toString(),
      title: post.title.rendered,
      imagePath: imagePath
    }
  }

  renderPosts = () => {
    let posts = this.state.posts;
    return <Posts
      posts={posts}
      navigate={this.props.navigation.navigate}
      loading={this.loading}
      refetch={() => this.fetchPosts({ refetch: true })}
      loadMore={() => this.fetchPosts({ loadMore: true })}
    />
  };

  render() {
    return <View style={styles.container}>
      <BannerAd adUnitID="ca-app-pub-2719503145852588/5952775236" />
      {/* <BannerAd adUnitID = "ca-app-pub-3940256099942544/6300978111" /> */}
      {this.state.posts.length === 0 ? <ActivityIndicator /> : this.renderPosts()}
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5
  },

});
