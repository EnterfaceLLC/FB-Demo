import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {FontAwesome} from "@expo/vector-icons";

import FeedScreen from "../screen/FeedScreen"
import CreatePostScreen from "../screen/CreatePostScreen";
import ProfileScreen from '../screen/ProfileScreen';
import UpdateProfileScreen from '../screen/UpdateProfileScreen';

const Stack = createNativeStackNavigator();


const Navigator = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Feed"
          component={FeedScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <FontAwesome
                onPress={() => navigation.navigate("Profile")}
                name="user"
                size={24}
                color="gray"
              />
            ),
          })}  
        />
        <Stack.Screen name="Post" component={CreatePostScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Update Profile" component={UpdateProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;