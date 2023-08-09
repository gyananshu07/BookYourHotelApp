import React, { useContext } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { Ionicons as Icon } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token").then(
      await SecureStore.deleteItemAsync("user_id").then(
        setUser(null),
        !user && navigation.navigate("Login")
      )
    );
  };

  return (
    <ScrollView>
      {user ? (
        <View style={styles.avatarRow}>
          <View style={styles.userDetails}>
            <Image source={{ uri: user.profileImage }} style={styles.avatar} />
            <View>
              <Text style={styles.greetingText}>Hello!</Text>
              <Text style={styles.usernameText}>{user.username}</Text>
              <Text style={styles.usernameText}>{user.email}</Text>
            </View>
          </View>

          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.avatarRow}>
          <Text style={styles.greetingText}>Hello User!</Text>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.logoutButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <Text style={{ fontWeight: "bold" }}>or</Text>

            <Pressable
              style={styles.logoutButton}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
          </View>
        </View>
      )}

      <View style={styles.container}>
        <Pressable
          style={styles.accountRow}
          onPress={() =>
            user ? navigation.navigate("Profile") : Alert("Please login first!")
          }
        >
          <Icon name="person" size={24} color="#003B95" />
          <Text style={styles.option}>My Profile</Text>
        </Pressable>

        <Pressable style={styles.accountRow}>
          <Icon name="notifications" size={24} color="#003B95" />
          <Text style={styles.option}>Notifications</Text>
        </Pressable>

        <Pressable style={styles.accountRow}>
          <Icon name="ios-heart" size={24} color="#003B95" />
          <Text style={styles.option}>Favorites</Text>
        </Pressable>

        <Pressable style={styles.accountRow}>
          <Icon name="md-people-sharp" size={24} color="#003B95" />
          <Text style={styles.option}>About Us</Text>
        </Pressable>

        <Pressable style={styles.accountRow}>
          <Icon name="call" size={24} color="#003B95" />
          <Text style={styles.option}>Contact Us</Text>
        </Pressable>

        <Pressable style={styles.accountRow}>
          <Icon name="star" size={24} color="#003B95" />
          <Text style={styles.option}>Rate Us</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 16,
    borderColor: "#003B95",
    borderWidth: 2,
  },
  greetingText: {
    fontWeight: "bold",
    color: "#003B95",
    fontSize: 18,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 13,
  },
  logoutButton: {
    backgroundColor: "#003B95",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "max-content",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  accountRow: {
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
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default AccountScreen;
