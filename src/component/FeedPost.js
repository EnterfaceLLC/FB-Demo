import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import LikeImage from '../../assets/image/like.png';

import {
  Entypo,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useNavigation } from '@react-navigation/native';
import { S3Image } from "aws-amplify-react-native";
import { useState, useEffect } from 'react';
import {DataStore} from 'aws-amplify';
import { User } from '../models';


const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png"
;


export const FeedPost = ({post}) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (!post.postUserId) {
      return;
    }
    DataStore.query(User, post.postUserId).then(setUser);
  },[post.postUserId]);

  return (
    <Pressable style={styles.post}>

      <Pressable 
        style={styles.header} 
        onPress={()=> navigation.navigate('Profile', {id: post.User?.id})}
      >
        {user?.image ? (
          <S3Image imgKey={user.image} style={styles.proImage} />
        ) : (
          <Image
            source={{ uri: dummy_img }}
            style={styles.proImage}
          />  
        )}

        <View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.subtitle}>{post.createdAt}</Text>
        </View>
        <Entypo name="dots-three-horizontal" size={20} color="slateblue" style={styles.icon} />
      </Pressable>

      {/* conditional rendering */}
      <Text style={styles.description}>{post.description}</Text>

      {/* conditional rendering */}
      {post.image && (<S3Image
        imgKey={post.image}
        style={styles.img}
      />)}

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.stats}>
          <Image 
            source={LikeImage}
            style={styles.likeImg}
          />
          <Text style={styles.likes}>RoZam and {post.numberOfLikes} others</Text>
          <Text style={styles.shares}>{post.numberOfShares} shares</Text>
        </View>

        <View style={styles.bttnRow}>
          <View style={styles.iconBttn}>
          <AntDesign name='like2' size={20} color='grey' />
          <Text style={styles.iconTxt}>Like</Text>
          </View>

          <View style={styles.iconBttn}>
          <FontAwesome5 name='comment-alt' size={20} color='grey' />
          <Text style={styles.iconTxt}>comment</Text>
          </View>

          <View style={styles.iconBttn}>
          <MaterialCommunityIcons name='share-outline' size={20} color='grey' />
          <Text style={styles.iconTxt}>share</Text>
          </View>
        </View>

      </View>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  post: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  proImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10
  },
  name: {
    fontWeight: '500'
  },
  subtitle: {
    color: 'grey'
  },
  icon: {
    marginLeft: 'auto'
  },
  description: {
    paddingHorizontal: 10,
    lineHeight: 20,
    letterSpacing: .3,
  },
  img: {
    width: '100%',
    aspectRatio: 1,
    marginTop: 10
  },
  footer: {
    paddingHorizontal: 10 
  },
  stats: {
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgrey'
  },
  likeImg: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  likes: {
    color: 'grey'
  },
  shares: {
    marginLeft: 'auto',
    color: 'grey'
  },
  bttnRow: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  iconBttn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconTxt: {
    marginLeft: 5,
    color: 'grey',
    fontWeight: '500'
  },
});