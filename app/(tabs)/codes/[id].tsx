import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { QRItem } from "../history";
import useQrHistory from "@/hooks/useQrHistory";
import QRCode from "react-native-qrcode-svg";

export default function Details() {
  const { id } = useLocalSearchParams();
  const history = useQrHistory();

  const item = history.find((code) => code.id === id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item?.name}</Text>
      <View style={styles.image}>
        <QRCode size={300} value={item?.url} />
      </View>
      <View>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Share Qr Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    paddingTop: 15,
    paddingBottom: 40,
    fontSize: 32,
    fontWeight: 600,
    textAlign: "center",
  },
  image: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    backgroundColor: "#007AFF",
    marginTop: 50,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
