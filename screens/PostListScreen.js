import React from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import Posts from '../components/Posts';

const WP_REQUEST_URL_POSTS = "https://indiagovjobs.com/wp-json/wp/v2/posts?_embed&per_page=20";

export default class PostListScreen extends React.Component {

  static navigationOptions = {
    title : 'Job Posts'
  };
    
  constructor(props){
    super(props);
    this.state ={
      posts : []
    };
  }

  componentDidMount(){
    fetch(WP_REQUEST_URL_POSTS)
    .then(res => res.json())
    .then(posts => this.setState((prevState, props)=>{
      return {posts : posts.map(this.mapPosts)}
    }))
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
    return <Posts posts = {posts} navigate = {this.props.navigation.navigate}/>
  };

  render() {
    return <View style={styles.container}>
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
    paddingTop : 22
  },

});
