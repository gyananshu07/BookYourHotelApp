import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthContext";

const EditSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
});

const EditScreen = () => {
  const [avatar, setAvatar] = useState(user?.profileImage);
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);

  const handleEdit = async ({ username, email, phone, country, city }) => {
    try {
      if (username && email && phone && country && city) {
        const response = await axios.put(
          `http://192.168.180.233:8080/api/users/${user._id}`,
          {
            username: username,
            email: email,
            phone: phone,
            country: country,
            city: city,
            profileImage: avatar,
          }
        );

        if (response.status === 200) {
          Alert.alert("Updated Successfully!");
          setUser(response.data);
          navigation.navigate("Profile");
        } else {
          Alert.alert("Something went wrong!");
        }
      }
    } catch (error) {
      Alert.alert("Something went wrong!");
    }
  };

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
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
          username: user.username,
          email: user.email,
          phone: user.phone,
          country: user.country,
          city: user.city,
        }}
        validationSchema={EditSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleEdit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Text style={styles.heading}>Edit Profile</Text>

            <View style={styles.inputGroup}>
              <Pressable style={styles.uploadButton} onPress={pickImage}>
                <Image
                  style={styles.avatar}
                  source={{ uri: user.profileImage || user.avatar }}
                />
              </Pressable>
              {avatar && (
                <Text style={styles.uploadText}>
                  Uploaded Image Successfully!
                </Text>
              )}
            </View>

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

            <Pressable
              style={styles.registerButton}
              onPress={() => handleEdit(values)}
            >
              <Text style={styles.buttonText}>Save</Text>
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
    marginBottom: 15,
  },
  uploadButtonText: { fontWeight: "bold", color: "#003B95" },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderColor: "#003B95",
    borderWidth: 2,
  },
  errorText: { marginTop: 5, color: "red" },
});

export default EditScreen;
