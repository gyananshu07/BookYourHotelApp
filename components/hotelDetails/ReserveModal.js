import {
  StyleSheet,
  Alert,
  Modal,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { SearchContext } from "../../context/SearchContext";

const ReserveModal = ({ modalVisible, setModalVisible, hotelId }) => {
  const [roomData, setRoomData] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [text, setText] = useState("");
  const [isChecked, setChecked] = useState(false);

  const { dates, adults, child } = useContext(SearchContext);

  const handleChange = (value) => {
    setSelectedRooms((prevSelectedRooms) =>
      isChecked
        ? [...prevSelectedRooms, value]
        : prevSelectedRooms.filter((item) => item !== value)
    );

    setRoomData((prevRoomData) =>
      prevRoomData.map((room) => ({
        ...room,
        checkboxColor: selectedRooms.includes(value)
          ? "#003B95"
          : room.checkboxColor,
      }))
    );

    setChecked(!isChecked);
  };

  const allDates = [dates?.startDate, dates?.endDate];

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDate.some((date) => {
      date = new Date(date);
      var formattedDate =
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        "/" +
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

      return allDates.includes(formattedDate);
    });

    return !isFound;
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://192.168.180.233:8080/api/rooms/availability/${roomId}`,
            {
              dates: allDates,
            }
          );
        })
      );
      setText(
        `Booking Successful for ${selectedRooms.length} room for ${adults} adults & ${child} child!`
      );
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
      handleRefresh();
    } catch (err) {
      Alert.alert("Something went wrong!");
    }
  };

  useEffect(() => {
    const getRooms = async (values) => {
      try {
        const response = await axios.get(
          `http://192.168.180.233:8080/api/hotels/rooms/${hotelId}`
        );

        if (response.status === 200) {
          const data = response.data;
          setRoomData(
            data.map((room) => ({ ...room, checkboxColor: "#003B95" }))
          );
        } else {
          console.error(
            "Error fetching data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getRooms();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.reserve}>
        <View style={styles.rContainer}>
          <MaterialIcons
            style={styles.rClose}
            onPress={() => setModalVisible(false)}
            name="cancel"
            size={32}
            color="#003B95"
          />

          <Text style={styles.header}>Select Your Rooms:</Text>
          {roomData.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              data={roomData}
              renderItem={({ item }) => {
                const descriptions = item?.description.split(",");
                return (
                  <View style={styles.rItem}>
                    <View style={styles.rItemInfo}>
                      <Text style={styles.rTitle}>
                        Room Name:{" "}
                        <Text style={styles.rName}>{item?.title}</Text>
                      </Text>
                      <Text style={styles.rDesc}>Description of Room: </Text>
                      <View style={styles.rowDesc}>
                        {descriptions.map((des) => {
                          return (
                            <View style={styles.rRow}>
                              <AntDesign
                                name="star"
                                size={18}
                                color="#003B95"
                              />
                              <Text>{des}</Text>
                            </View>
                          );
                        })}
                      </View>

                      <Text style={styles.rMax}>
                        Max People (in a Room):{" "}
                        <Text style={styles.boldText}>{item?.maxPeople}</Text>
                      </Text>
                      <Text style={styles.rPrice}>
                        Price (including taxes):
                        <Text style={styles.boldText}>
                          {" "}
                          Rs.{" "}
                          {item?.price * selectedRooms.length +
                            0.18 * item?.price * selectedRooms.length}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.rSelectRooms}>
                      {item.roomNumbers.map((roomNumber) => (
                        <View style={styles.room} key={roomNumber._id}>
                          <Checkbox
                            value={selectedRooms.includes(roomNumber._id)}
                            onValueChange={() => handleChange(roomNumber._id)}
                            disabled={!isAvailable(roomNumber)}
                            color={selectedRooms.checkboxColor}
                          />
                          <Text style={styles.roomNumberText}>
                            {roomNumber.number}
                          </Text>
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity
                      onPress={handleClick}
                      style={styles.rButton}
                    >
                      <Text style={styles.buttonText}>Reserve Now!</Text>
                    </TouchableOpacity>

                    {text && <Text style={styles.success}>{text}</Text>}
                  </View>
                );
              }}
            />
          ) : (
            <Text style={styles.rTitle}>No Rooms Available</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ReserveModal;

const styles = StyleSheet.create({
  reserve: {
    flex: 1,
    backgroundColor: "#fff",
  },
  rContainer: {
    padding: 20,
  },
  rClose: {
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  header: {
    fontSize: 20,
    color: "#003B95",
    fontWeight: "bold",
    marginBottom: 15,
  },
  rItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    gap: 10,
  },
  rItemInfo: {
    marginBottom: 10,
    gap: 10,
  },
  rTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  rName: { fontSize: 16, fontWeight: "bold", color: "#003B95" },
  rDesc: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#555",
  },
  rowDesc: {
    flexDirection: "column",
    gap: 5,
  },
  rRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rMax: { fontWeight: "bold", fontSize: 14, marginTop: 5 },
  boldText: {
    fontWeight: "500",
  },
  rPrice: { fontWeight: "bold", fontSize: 14, marginTop: 5 },
  rSelectRooms: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  room: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    gap: 5,
  },
  roomNumberText: {
    marginRight: 5,
    fontWeight: "bold",
  },
  rButton: {
    backgroundColor: "#003B95",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  success: {
    color: "green",
    alignSelf: "center",
    textAlign: "center",
  },
});
