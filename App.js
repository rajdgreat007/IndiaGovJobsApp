import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';

const WP_REQUEST_URL_POSTS = "http://indiagovjobs.com/wp-json/wp/v2/posts";

const windowSize = Dimensions.get('window');

export default class App extends React.Component {
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
    return {
      key: post.id,
      title : post.title.rendered
    }
  }

  renderLoadingView = () =>{
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  };

  renderPosts = () => {
    let posts = this.state.posts;
    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
        />
      </View>
    );
  };

  render() {
    if(this.state.posts.length === 0){
      return this.renderLoadingView();
    }else{
      return this.renderPosts();
    } 
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
  item: {
    padding: 10,
    fontSize: 18,
    margin : 10,
    backgroundColor : "green",
    color : "#fff"
  },
});
