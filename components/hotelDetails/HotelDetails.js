import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ReserveModal from "./ReserveModal";

const HotelDetails = ({ hotelDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleBooking = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Text style={styles.headerText}>{hotelDetails.name}</Text>
      <Text style={styles.titleText}>{hotelDetails.title}</Text>

      <View style={styles.location}>
        <Ionicons name="ios-location-sharp" size={24} color="#d23540" />
        <Text style={{ flex: 1, flexWrap: "wrap" }}>
          {hotelDetails.address}
        </Text>
      </View>

      <Text style={styles.description}>{hotelDetails.description}</Text>

      <Pressable style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>
          Book a night @ Rs. {hotelDetails.price}
        </Text>
      </Pressable>

      <ReserveModal
        modalVisible={isOpen}
        setModalVisible={setIsOpen}
        hotelId={hotelDetails.hotelId}
      />
    </>
  );
};

export default HotelDetails;

const styles = StyleSheet.create({
  headerText: { color: "#003B95", fontWeight: "800", fontSize: 24 },
  titleText: {
    fontWeight: "500",
    color: "gray",
    fontSize: 16,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  description: { textAlign: "justify" },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 5,
    backgroundColor: "#003B95",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});
