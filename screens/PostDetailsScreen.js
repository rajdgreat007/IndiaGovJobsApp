import React from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import Post from '../components/Post';

const WP_REQUEST_URL_POSTDETAIL = 'https://indiagovjobs.com/wp-json/wp/v2/posts/';


export default class PostDetailsScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
      const title = navigation.getParam('title');
      return {
        title : (title && title.replace(/–.*/,'')) || 'Job Details'
      }
    };

    constructor(props){
        super(props);
        this.state ={
          post : null
        };
    }
  
    componentDidMount(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('key');
        const itemTitle = navigation.getParam('title');
        
        fetch(WP_REQUEST_URL_POSTDETAIL + itemId)
        .then(res => res.json())
        .then(post => this.setState((prevState, props)=>{
            return {post : post}
        }))
    }
  
    renderPost = () => {
      let post = this.state.post;
      return <Post post={post} />
    };
  
    render() {
        return <View style={styles.container}>
            {this.state.post? this.renderPost() : <ActivityIndicator />}
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