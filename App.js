import { StatusBar } from 'expo-status-bar';



import { StyleSheet, View } from 'react-native';

import Navigator from './src/navigation/index';

import {Amplify, Auth} from 'aws-amplify';

import awsconfig from './src/aws-exports';

import {withAuthenticator} from 'aws-amplify-react-native';

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

 function App() {

  // Auth.currentAuthenticatedUser().then((data) => console.log(data));
  return (
    <Navigator>
      <View style={styles.container}>

        {/* <CreatePostScreen/> */}
        {/* <FeedScreen/> */}

        <StatusBar style="auto" />
      </View>
    </Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App);
