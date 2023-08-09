import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.homeRow}>
      <Pressable style={styles.pressable}>
        <Ionicons name="bed" size={24} color="white" />
        <Text style={styles.text}>Stays</Text>
      </Pressable>

      <Pressable style={styles.pressable}>
        <MaterialIcons name="flight" size={24} color="white" />
        <Text style={styles.text}>Flights</Text>
      </Pressable>

      <Pressable style={styles.pressable}>
        <AntDesign name="car" size={24} color="white" />
        <Text style={styles.text}>Car Rentals</Text>
      </Pressable>

      <Pressable style={styles.pressable}>
        <FontAwesome name="taxi" size={24} color="white" />
        <Text style={styles.text}>Taxis</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  homeRow: {
    backgroundColor: "#003B95",
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pressable: {
    alignItems: "center",
  },
  text: {
    color: "white",
    marginTop: 5,
  },
});
export default Header;
