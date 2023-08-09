import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import ReadMore from "@fawazahmed/react-native-read-more";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Card = ({
  name,
  rating,
  title,
  image,
  address,
  description,
  price,
  photos,
  hotelId,
}) => {
  const hotelDetails = {
    name,
    rating,
    title,
    photos,
    address,
    description,
    price,
    hotelId,
  };

  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Image
        style={styles.thumbnail}
        source={{
          uri: image,
        }}
      />

      <View style={styles.headerTextRow}>
        <Text style={styles.headerText}>{name}</Text>
        <Text style={styles.rating}>{rating}</Text>
      </View>

      <Text style={styles.titleText}>{title}</Text>

      <View style={styles.location}>
        <Ionicons name="ios-location-sharp" size={24} color="#d23540" />
        <Text style={{ flex: 1, flexWrap: "wrap" }}>{address}</Text>
      </View>

      <ReadMore
        numberOfLines={3}
        animate
        style={styles.description}
        seeMoreStyle={{ color: "#003B95", fontWeight: "600" }}
        seeLessStyle={{ color: "#003B95", fontWeight: "600" }}
      >
        {description}
      </ReadMore>

      <View style={styles.priceRow}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: "#003B95",
          }}
        >
          Cheapest Price:
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Rs. {price}
        </Text>
      </View>

      <Pressable
        style={styles.availability}
        onPress={() => navigation.navigate("Hotel", { hotelDetails })}
      >
        <Text style={styles.text}>See Availability</Text>
      </Pressable>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 5,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "white",
    marginVertical: 10,
    gap: 15,
  },
  thumbnail: {
    borderRadius: 10,
    width: "100%",
    height: 250,
    marginBottom: 10,
  },
  headerTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
  },
  rating: {
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#003B95",
    borderRadius: 5,
    color: "white",
  },
  titleText: {
    fontWeight: "600",
    fontSize: 18,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  availability: {
    gap: 5,
    flexDirection: "row",
    height: "max-content",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 12,
    width: "50%",
    borderRadius: 5,
    backgroundColor: "#003B95",
    marginBottom: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});
