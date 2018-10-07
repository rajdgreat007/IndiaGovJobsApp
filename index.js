import { AppRegistry } from 'react-native';
import { YellowBox } from 'react-native';
import App from './App';
import bgMessaging from "./bgMessaging";
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent('IndiaGovJobsApp', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
