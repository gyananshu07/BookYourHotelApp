import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";

const Decrement = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <AntDesign name="minuscircleo" size={24} color="black" />
    </Pressable>
  );
};

const Increment = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <AntDesign name="pluscircleo" size={24} color="black" />
    </Pressable>
  );
};

const ModalContentComponent = ({
  rooms,
  adults,
  child,
  setRooms,
  setAdults,
  setChild,
}) => {
  const decrementRooms = () => {
    setRooms((prevRooms) => Math.max(prevRooms - 1, 1));
  };

  const incrementRooms = () => {
    setRooms((prevRooms) => prevRooms + 1);
  };

  const decrementAdults = () => {
    setAdults((prevAdults) => Math.max(prevAdults - 1, 1));
  };

  const incrementAdults = () => {
    setAdults((prevAdults) => prevAdults + 1);
  };

  const decrementChildren = () => {
    setChild((prevChildren) => Math.max(prevChildren - 1, 0));
  };

  const incrementChildren = () => {
    setChild((prevChildren) => prevChildren + 1);
  };

  return (
    <>
      <View style={styles.modalInnerRow}>
        <Text style={styles.headerText}>Rooms: </Text>
        <View style={styles.selectButtonsModal}>
          <Decrement onPress={decrementRooms} />
          <Text style={styles.modalInnerText}>{rooms}</Text>
          <Increment onPress={incrementRooms} />
        </View>
      </View>

      <View style={styles.modalInnerRow}>
        <Text style={styles.headerText}>Adults: </Text>
        <View style={styles.selectButtonsModal}>
          <Decrement onPress={decrementAdults} />
          <Text style={styles.modalInnerText}>{adults}</Text>
          <Increment onPress={incrementAdults} />
        </View>
      </View>

      <View style={styles.modalInnerRow}>
        <Text style={styles.headerText}>Children: </Text>
        <View style={styles.selectButtonsModal}>
          <Decrement onPress={decrementChildren} />
          <Text style={styles.modalInnerText}>{child}</Text>
          <Increment onPress={incrementChildren} />
        </View>
      </View>
    </>
  );
};

export default ModalContentComponent;

const styles = StyleSheet.create({
  modalInnerRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
  },
  modalInnerText: {
    fontSize: 22,
  },
  selectButtonsModal: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});
