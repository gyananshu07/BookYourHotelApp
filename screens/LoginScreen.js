import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is a required field"),
  password: Yup.string()
    .min(5, "Too Short Password!")
    .max(1024, "Too Long Password!")
    .required("Password is a required field"),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values) => {
    try {
      setIsLoading(true); // Start loading state

      const response = await axios.post(
        `http://192.168.180.233:8080/api/auth/login`,
        values
      );

      if (response.status === 200) {
        const userDetails = await response.data.details;

        const accessToken = await response.data.access_token;
        await SecureStore.setItemAsync("access_token", accessToken);
        await SecureStore.setItemAsync("user_id", userDetails._id);

        setUser(userDetails);
      } else {
        Alert.alert("Wrong Credentials, user not found!");
      }
    } catch (error) {
      Alert.alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      navigation.navigate("Account");
    }, 1500);
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <FontAwesome5 name="hotel" size={52} color="#003B95" />
        <Text style={styles.loginText}>Login Now</Text>
        <Text style={styles.loginHelperText}>
          Please sign in to continue using our app
        </Text>
      </View>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
              autoCompleteType="password"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Pressable
              style={styles.loginButton}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Logging in..." : "Login"}
              </Text>
            </Pressable>
          </>
        )}
      </Formik>

      <Text>or</Text>

      <Pressable style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register/Signup</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  heading: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  loginText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#003B95",
  },
  loginHelperText: {
    fontSize: 16,
    color: "gray",
  },
  input: {
    width: "100%",
    height: 60,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#003B95",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    alignSelf: "flex-start",
    textAlign: "left",
    color: "#ff3333",
    marginTop: -10,
    marginBottom: 10,
  },
});

export default LoginScreen;
