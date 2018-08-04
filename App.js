import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import PostListScreen from './screens/PostListScreen';
import PostDetailsScreen from './screens/PostDetailsScreen';
import Header from './components/Header';

const windowSize = Dimensions.get('window');

const App = createStackNavigator(
  {
    Home : {screen : PostListScreen},
    PostDetails : {screen : PostDetailsScreen},
  },
  {
    navigationOptions : {
      headerStyle: {
        backgroundColor: '#6A5ACD',
      },
      headerTitle : <Header showLogo = {true} />,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#fff'
    }
  }
);

export default App;
