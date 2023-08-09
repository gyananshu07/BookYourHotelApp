import { FlatList, Image, StyleSheet, View, ScrollView } from "react-native";
import React from "react";

import HotelDetails from "../components/hotelDetails/HotelDetails";

const HotelDetailsScreen = ({ route }) => {
  const { hotelDetails } = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.wrapper}>
        <FlatList
          contentContainerStyle={styles.flatList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          data={hotelDetails.photos}
          renderItem={({ item }) => {
            return <Image style={styles.image} source={{ uri: item }} />;
          }}
        />
        <HotelDetails hotelDetails={hotelDetails} />
      </View>
    </ScrollView>
  );
};

export default HotelDetailsScreen;

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  wrapper: {
    gap: 10,
  },
  flatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  image: { width: 120, height: 120, borderRadius: 5 },
});
