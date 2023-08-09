import { FlatList, StyleSheet, Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/home/Card";

const HotelsScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await axios.get(
          `http://192.168.180.233:8080/api/hotels/`
        );

        if (response.status === 200) {
          const resp = await response.data;
          setData(resp);
        } else {
          Alert.alert("Data not available!");
          setData([]);
        }
      } catch (error) {
        Alert.alert("Something went wrong!");
        setData([]);
      }
    };
    getHotels();
  }, []);

  return (
    <View style={styles.flatlistContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        data={data}
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
  );
};

export default HotelsScreen;

const styles = StyleSheet.create({
  flatlistContainer: {
    marginHorizontal: 10,
    gap: 20,
    flexDirection: "column",
  },
});
