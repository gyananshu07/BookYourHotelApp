import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ModalPortal } from "react-native-modals";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import HomeScreen from "./screens/HomeScreen";
import HotelsScreen from "./screens/HotelsScreen";
import AccountScreen from "./screens/AccountScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditScreen from "./screens/EditScreen";
import HotelDetailsScreen from "./screens/HotelDetailsScreen";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "./context/AuthContext";

import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "absolute" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="md-home-sharp" size={24} color="white" />
            ) : (
              <Ionicons name="md-home-outline" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Hotels"
        component={HotelsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Hotels",
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="md-bed" size={24} color="white" />
            ) : (
              <Ionicons name="md-bed-outline" size={24} color="white" />
            ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Account",
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="white" />
            ) : (
              <Ionicons name="person-outline" size={24} color="white" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { setUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    const checkForUser = async () => {
      let result = await SecureStore.getItemAsync("access_token");
      let uid = await SecureStore.getItemAsync("user_id");

      try {
        if (result && uid) {
          const response = await axios.get(
            `http://192.168.180.233:8080/api/users/${uid}`
          );

          if (response.status === 200) {
            const userDetails = await response.data;

            setUser(userDetails);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    checkForUser();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerMode: "screen",
              title: "BookYourHotel",
              headerStyle: {
                backgroundColor: "#003B95",
                height: 150,
              },
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen
              name="Main"
              component={BottomTab}
              options={{ headerShadowVisible: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerBackVisible: false,
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShadowVisible: false }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShadowVisible: false }}
            />
            <Stack.Screen
              name="Edit"
              component={EditScreen}
              options={{ headerShadowVisible: false }}
            />
            <Stack.Screen
              name="Hotel"
              component={HotelDetailsScreen}
              options={{ headerShadowVisible: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
      <ModalPortal />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarStyle: {
    backgroundColor: "#003B95",
    height: 60,
    paddingVertical: 5,
  },
  tabBarLabelStyle: {
    fontWeight: "bold",
    color: "white",
    paddingBottom: 10,
    fontSize: 12,
  },
});
