import React, { useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import Header from "../components/home/Header";
import SearchHotels from "../components/home/Search";
import Card from "../components/home/Card";

import axios from "axios";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [destination, setDestination] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://192.168.180.233:8080/api/hotels?city=${destination}&min=0&max=99999`
      );

      if (response.status === 200) {
        const resp = await response.data;
        setData(resp);
      } else {
        Alert.alert(
          "Data not available for your query, please try another destination!"
        );
        setData([]);
      }
    } catch (error) {
      Alert.alert("Something went wrong!");
      setData([]);
    }
  };

  return (
    <>
      <Header />

      <View style={styles.flatlistContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          data={data}
          ListHeaderComponent={
            <SearchHotels
              onSearch={handleSearch}
              onDestinationChange={setDestination} // Pass the destination change function
            />
          }
          renderItem={({ item }) => {
            return (
              <Card
                hotelId={item._id}
                photos={item.photos}
                image={item.photos[0]}
                name={item.name}
                rating={item.rating}
                title={item.title}
                address={item.address}
                description={item.description}
                price={item.cheapestPrice}
              />
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    marginHorizontal: 10,
    gap: 20,
    flexDirection: "column",
    marginBottom: 80,
  },
});

export default HomeScreen;
