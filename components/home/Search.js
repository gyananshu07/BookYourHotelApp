import React, { useContext, useState } from "react";
import { View, StyleSheet, TextInput, Text, Pressable } from "react-native";

import DatePicker from "react-native-date-ranges";
import {
  BottomModal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
} from "react-native-modals";
import ModalContentComponent from "./ModalContentComponent";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SearchContext } from "../../context/SearchContext";

const SearchHotels = ({ onSearch, onDestinationChange }) => {
  const [destination, onChangeText] = useState("New Delhi");
  const [selectedDates, setSelectedDates] = useState([]);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [child, setChild] = useState(0);

  const { dispatch } = useContext(SearchContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const submitButton = (onConfirm) => (
    <Pressable onPress={onConfirm} style={styles.calendarButton}>
      <Text style={styles.text}>Apply</Text>
    </Pressable>
  );

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates: selectedDates, rooms, adults, child },
    });
    onSearch(destination, rooms, adults, child);
  };

  return (
    <View style={styles.searchHotels}>
      <View style={styles.row}>
        <Ionicons name="location" size={28} color="#003B95" />
        <TextInput
          style={styles.input}
          placeholder="Enter your destination!"
          placeholderTextColor="gray"
          value={destination}
          onChangeText={(text) => {
            onChangeText(text);
            onDestinationChange(text);
          }}
        />
      </View>

      <View style={styles.row}>
        <Ionicons name="calendar" size={28} color="#003B95" />
        <DatePicker
          style={{
            width: "max-content",
            height: 30,
            borderWidth: 0,
            borderRadius: 0,
            fontSize: 16,
          }}
          customStyles={{
            placeholderText: { fontSize: 16, color: "gray" },
            headerStyle: {
              backgroundColor: "#003B95",
            },
            headerMarkTitle: { color: "white" },
          }}
          markText="Select your start and end date!"
          centerAlign
          allowFontScaling={true}
          placeholder={"Check Available Dates!"}
          mode={"range"}
          blockBefore={true}
          selectedBgColor="#003B95"
          selectedTextColor="white"
          dateSplitter={"-"}
          calendarBgColor="#003B95"
          customButton={(onConfirm) => submitButton(onConfirm)}
          onConfirm={(startDate, endDate) =>
            setSelectedDates(startDate, endDate)
          }
        />
      </View>

      <Pressable
        style={styles.row}
        onPress={() => setIsModalVisible(!isModalVisible)}
      >
        <Ionicons name="people" size={28} color="#003B95" />
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="1 Room(s) + 2 Adults + 0 Children"
          placeholderTextColor="gray"
          value={`${rooms} Room(s) + ${adults} Adults + ${child} Children`}
        />
      </Pressable>
      <BottomModal
        visible={isModalVisible}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        onHardwareBackPress={() => setIsModalVisible(!isModalVisible)}
        onTouchOutside={() => setIsModalVisible(!isModalVisible)}
        modalTitle={<ModalTitle title="Select No. of Rooms and Guests" />}
        footer={
          <ModalFooter>
            <ModalButton
              text="Cancel"
              onPress={() => setIsModalVisible(!isModalVisible)}
            />
            <ModalButton
              text="Apply"
              onPress={() => {
                setRooms(rooms);
                setAdults(adults);
                setChild(child);
                setIsModalVisible(!isModalVisible);
              }}
            />
          </ModalFooter>
        }
      >
        <ModalContent>
          <ModalContentComponent
            rooms={rooms}
            adults={adults}
            child={child}
            setRooms={setRooms}
            setAdults={setAdults}
            setChild={setChild}
          />
        </ModalContent>
      </BottomModal>

      <Pressable style={styles.searchButton} onPress={handleSearch}>
        <AntDesign name="search1" size={22} color="white" />
        <Text style={styles.text}>Search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchHotels: {
    marginVertical: 10,
    borderWidth: 4,
    borderColor: "#FFB700",
    height: "max-content",
  },
  row: {
    gap: 15,
    borderBottomWidth: 0.5,
    borderColor: "grey",
    flexDirection: "row",
    height: "max-content",
    alignItems: "center",
    padding: 15,
  },
  input: {
    fontSize: 16,
  },
  calendarButton: {
    backgroundColor: "#003B95",
    gap: 5,
    flexDirection: "row",
    height: "max-content",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 35,
    backgroundColor: "#003B95",
    borderRadius: 5,
  },
  searchButton: {
    gap: 5,
    flexDirection: "row",
    height: "max-content",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#003B95",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});

export default SearchHotels;
