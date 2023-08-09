import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons as Icon } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image style={styles.bigAvatar} source={{ uri: user.profileImage }} />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.location}>
          {user.city}, {user.country}
        </Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.col}>
          <Text style={styles.mainText}>170</Text>
          <Text>Points</Text>
        </View>

        <View style={styles.col}>
          <Text style={styles.mainText}>10</Text>
          <Text>Transactions</Text>
        </View>

        <View style={styles.col}>
          <Text style={styles.mainText}>15</Text>
          <Text>Fav Destinations</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.row}>
          <Icon name="person" size={24} color="#003B95" />
          <Text style={styles.option}>{user.username}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="mail" size={24} color="#003B95" />
          <Text style={styles.option}>{user.email}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="call" size={24} color="#003B95" />
          <Text style={styles.option}>{user.phone}</Text>
        </View>

        <View style={styles.row}>
          <Fontisto name="world" size={24} color="#003B95" />
          <Text style={styles.option}>{user.country}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="location-sharp" size={24} color="#003B95" />
          <Text style={styles.option}>{user.city}</Text>
        </View>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Edit")}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
    gap: 10,
  },
  bigAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
    borderColor: "#003B95",
    borderWidth: 2,
  },
  username: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#003B95",
  },
  location: {
    fontWeight: "600",
    fontSize: 15,
    color: "gray",
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  col: {
    alignItems: "center",
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#003B95",
  },

  details: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
    gap: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 15,
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  option: {
    fontSize: 16,
    alignSelf: "center",
  },

  button: {
    backgroundColor: "#003B95",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    width: 200,
    alignSelf: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
