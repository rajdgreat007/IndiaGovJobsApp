import React from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import Post from '../components/Post';
import { BannerAd } from '../components/Ads';

const WP_REQUEST_URL_POSTDETAIL = 'https://indiagovjobs.com/wp-json/wp/v2/posts/';


export default class PostDetailsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title');
    return {
      headerTitle: <Header showTitle={true} title={(title && title.replace(/–.*/, '')) || 'Job Details'} />
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      post: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('key');
    const itemTitle = navigation.getParam('title');

    fetch(WP_REQUEST_URL_POSTDETAIL + itemId)
      .then(res => res.json())
      .then(post => this.setState((prevState, props) => {
        return { post: post }
      }))
  }

  renderPost = () => {
    let post = this.state.post;
    return <Post post={post} />
  };

  render() {
    return <View style={styles.container}>
      <BannerAd adUnitID="ca-app-pub-2719503145852588/5952775236" />
      {this.state.post ? this.renderPost() : <ActivityIndicator />}
      <BannerAd adUnitID="ca-app-pub-2719503145852588/1500088977" />      
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