import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";

import { Feather } from "@expo/vector-icons";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  phone: Yup.string().required("Phone number is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
});

const RegisterScreen = () => {
  const [avatar, setAvatar] = useState(null);
  const navigation = useNavigation();

  const handleSubmit = async ({
    username,
    email,
    password,
    phone,
    country,
    city,
  }) => {
    try {
      const response = await axios.post(
        "http://192.168.180.233:8080/api/auth/register",
        {
          username: username,
          email: email,
          password: password,
          phone: phone,
          country: country,
          city: city,
          profileImage: avatar,
          isAdmin: false,
        }
      );

      if (response.status === 200) {
        Alert.alert("Registered Successfully!");
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1500);
      } else {
        Alert.alert("Could not registered user!");
      }
    } catch (error) {
      Alert.alert("Something went wrong!");
    }
  };

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      let data = {
        file: base64Img,
        upload_preset: "upload",
      };

      fetch("https://api.cloudinary.com/v1_1/daxilgrvn/image/upload", {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(async (r) => {
          let data = await r.json();

          setAvatar(data.secure_url);
        })
        .catch((err) => console.log(err));
    } else {
      Alert.alert("Delete", "Are you sure you want to delete the image?", [
        { text: "Yes", onPress: () => setAvatar(null) },
        { text: "No" },
      ]);
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          phone: "",
          country: "",
          city: "",
        }}
        validationSchema={RegisterSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Text style={styles.heading}>Register Now</Text>
            <Text style={styles.helperText}>
              Please sign up to become an user
            </Text>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                autoCapitalize="none"
                keyboardAppearance="dark"
              />
              {errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
                keyboardType="email-address"
                keyboardAppearance="dark"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
                autoCapitalize="none"
                keyboardAppearance="dark"
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Phone"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                keyboardType="phone-pad"
                keyboardAppearance="dark"
              />
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Country"
                onChangeText={handleChange("country")}
                onBlur={handleBlur("country")}
                value={values.country}
                autoCapitalize="words"
                keyboardAppearance="dark"
              />
              {errors.country && (
                <Text style={styles.errorText}>{errors.country}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="City"
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
                value={values.city}
                autoCapitalize="words"
                keyboardAppearance="dark"
              />
              {errors.city && (
                <Text style={styles.errorText}>{errors.city}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Pressable style={styles.uploadButton} onPress={pickImage}>
                <Feather name="upload-cloud" size={24} color="#003B95" />
                <Text style={styles.uploadButtonText}>Upload Avatar</Text>
              </Pressable>
              {avatar && (
                <Text style={styles.uploadText}>
                  Uploaded Image Successfully!
                </Text>
              )}
            </View>

            <Pressable style={styles.registerButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003B95",
    marginBottom: 15,
    alignSelf: "center",
  },
  helperText: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    alignSelf: "center",
  },
  inputGroup: {
    marginBottom: 16,
    width: "100%",
  },
  input: {
    width: "100%",
    height: 60,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  registerButton: {
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
  uploadButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#003B95",
    marginBottom: 25,
  },
  uploadButtonText: { fontWeight: "bold", color: "#003B95" },
  errorText: { marginTop: 5, color: "red" },
});

export default RegisterScreen;
