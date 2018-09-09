import React from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Alert } from 'react-native';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import firebase from 'react-native-firebase';
import Posts from '../components/Posts';
import {BannerAd} from '../components/Ads';
import {storeData, retrieveData} from '../components/helpers/async-storage';

const WP_REQUEST_URL_POSTS = "https://indiagovjobs.com/wp-json/wp/v2/posts?_embed";
const WP_POSTS_PER_PAGE = 10;
const WP_REGISTER_DEVICE_URL = "https://indiagovjobs.com/wp-json/apnwp/register?os_type=android&device_token=";

export default class PostListScreen extends React.Component {

  static navigationOptions = {
    title : 'Job Posts'
  };
    
  constructor(props){
    super(props);
    this.state ={
      posts : []
    };
    this.loading = false;
    this.page = 1;
  }

  saveDeviceId = params => {
    const callback = (error, result) => {
      if(error || !result){
        firebase.messaging().getToken()
        .then(fcmToken => {
          if (fcmToken) {
            const requestUrl = WP_REGISTER_DEVICE_URL + fcmToken;
            fetch(requestUrl)
            .then(res => {
              storeData('deviceId', '1');
            })
          } else {
            // user doesn't have a device token yet
          } 
        });
      }
    };
    retrieveData('deviceId', callback);
  };

  fetchPosts = params =>{
    if(!this.loading){
      this.loading = true;
      if(params && params.refetch){
        this.page = 1;
      }
      const requestUrl = WP_REQUEST_URL_POSTS + '&per_page='+ WP_POSTS_PER_PAGE + '&page=' + this.page;
      fetch(requestUrl)
      .then(res => res.json())
      .then(posts => {
        this.loading = false;
        let newPosts = posts.map(this.mapPosts);
        this.page++;
        this.setState((prevState, props)=>{
          if(params && params.loadMore){
            newPosts = prevState.posts.concat(newPosts);
          }
          return {posts : newPosts}
        })
      });
    }
  }

  componentWillMount() {
    OneSignal.init("615a66b4-f74b-461d-b45e-1871c3ae7f33");
    this.saveDeviceId();
  }

  componentDidMount(){
    this.fetchPosts();
  }

  mapPosts = (post) => {
    let imagePath = null;
    try{
      imagePath = post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['thumbnail']['source_url'];
    }catch(e){}
    return {
      key: post.id.toString(),
      title : post.title.rendered,
      imagePath : imagePath
    }
  }

  renderPosts = () => {
    let posts = this.state.posts;
    return <Posts 
      posts = {posts} 
      navigate = {this.props.navigation.navigate}
      loading = {this.loading}
      refetch = {()=>this.fetchPosts({refetch:true})}
      loadMore = {()=>this.fetchPosts({loadMore : true})}
    />
  };

  render() {
    return <View style={styles.container}>
      <BannerAd adUnitID = "ca-app-pub-2719503145852588/5952775236" />
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
    paddingTop : 5
  },

});
