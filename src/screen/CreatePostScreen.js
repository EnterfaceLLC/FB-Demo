import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';
import React, {useState, useEffect} from 'react';
import {Entypo} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {useNavigation } from "@react-navigation/native";
import {DataStore, Auth, Storage } from 'aws-amplify';
import { Post, User } from '../models';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";


// const user = {
//   id: 'u1',
//   name: 'JR ZAM',
//   image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
// };

const CreatePostScreen = () => {

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useNavigation();

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      const dbUser = await DataStore.query(User, userData.attributes.sub);
      if (dbUser) {
        setUser(dbUser);
        console.log(dbUser);
      } else {
        navigation.navigate('Update Profile');
      }
    };
  
    fetchUser();
  }, []);
  

  const onPost = async () => {
    // const userData = await Auth.currentAuthenticatedUser();

    const newPost = {
      description: description,
      numberOfLikes: 1050,
      numberOfShares: 1050,
      postUserId: user.id,
      _version: 1,
    };
    if (image) {
      newPost.image = await uploadFile(image);
    }
    await DataStore.save(new Post(newPost));
    setDescription('');
    setImage('');
    navigation.goBack();
  };

  const uploadFile = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;
      await Storage.put(key, blob, {
        contentType: "image/png", // contentType is optional
      });
      return key;
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.img}
          source={{ uri: user?.image}}/>
        <Text style={styles.name}>{user?.name}</Text>
        <Entypo
          onPress={pickImage}
          name="images"
          size={24}
          color="limegreen"
          style={styles.icon}
        />
      </View>

      <TextInput 
        value={description}
        onChangeText={setDescription}
        placeholder='What is on your mind?'
        multiline
      />

      {image && 
        <Image 
          source={{uri: image}}
          style={styles.postImg}
        />
      }

      <View style={styles.button}>
        <Button
          title='Post'
          onPress={onPost}
          color={'tomato'}
          disabled={!description}
        />
      </View>
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    paddingTop: 30,
    backgroundColor: 'white'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10
  },
  name: {
    fontWeight: '500'
  },
  button: {
    marginTop: 'auto'
  },
  icon: {
    marginLeft: 'auto'
  },
  postImg: {
    width: '50%',
    aspectRatio: 3/4,
  }
});