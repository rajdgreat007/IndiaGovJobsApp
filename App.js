import { createStackNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import PostListScreen from './screens/PostListScreen';
import PostDetailsScreen from './screens/PostDetailsScreen';

const windowSize = Dimensions.get('window');

const App = createStackNavigator(
  {
    Home : {screen : PostListScreen},
    PostDetails : {screen : PostDetailsScreen},
  },
  {
    navigationOptions : {
      headerStyle: {
        backgroundColor: 'lightgreen',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }
);

export default App;
