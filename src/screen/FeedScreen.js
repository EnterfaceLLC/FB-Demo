import React, {useState, useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Image, Text } from 'react-native';
import { FeedPost } from '../component/FeedPost';
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { DataStore, Predicates, SortDirection } from 'aws-amplify';
import { Post } from '../models';

// import posts from '../../assets/data/posts.json';

const img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";

const FeedScreen = () => {
  const navigation = useNavigation();
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const subscription = DataStore.observeQuery(Post, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    }).subscribe(({ items }) => setPosts(items));
  
    return () => subscription.unsubscribe();
  }, []);

  const createPost = () => {
    navigation.navigate("Post");
  };


  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <FeedPost post={item} />}
      ListHeaderComponent={() => (
        <Pressable onPress={createPost} style={styles.header}>
          <Image source={{ uri: img }} style={styles.profileImage} />
          <Text style={styles.name}>What's on your mind?</Text>
          <Entypo
            name="images"
            size={24}
            color="limegreen"
            style={styles.icon}
          />
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    color: "gray",
  },
  icon: {
    marginLeft: "auto",
  },
});

export default FeedScreen;