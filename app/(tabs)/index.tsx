import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function Index() {
  const [url, setUrl] = useState("");
  const [qrCodeName, setQrCodeName] = useState("");
  const [generatedQrCode, setGeneratedQrCode] = useState("");

  const createQrCode = async () => {
    if (!url || !qrCodeName) {
      Alert.alert("Error: Please fill both url and name fields");
      return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      Alert.alert(
        "Error",
        "Please enter a valid URL starting with http:// or https://"
      );
      return;
    }

    setGeneratedQrCode(url);

    try {
      const existingData = await AsyncStorage.getItem("qrHistory");
      const history = existingData ? JSON.parse(existingData) : [];

      const newQrCode = {
        id: Date.now().toString(),
        url,
        name: qrCodeName,
        date: new Date().toISOString(),
      };

      await AsyncStorage.setItem(
        "qrHistory",
        JSON.stringify([newQrCode, ...history])
      );

      setUrl("");
      setQrCodeName("");

      Alert.alert("Success", "QR Code generated and saved!");
    } catch (error) {
      Alert.alert("Error", "Failed to save QR code");
      // Alert.alert(`Error: ${JSON.stringify(error)}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate Qr Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter URL"
        autoCapitalize="none"
        value={url}
        keyboardType="url"
        onChangeText={setUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your qr's code name"
        autoCapitalize="none"
        value={qrCodeName}
        keyboardType="default"
        onChangeText={setQrCodeName}
      />
      <TouchableOpacity onPress={createQrCode} style={styles.button}>
        <Text style={styles.buttonText}>Generate Qr Code</Text>
      </TouchableOpacity>
      {generatedQrCode && (
        <View style={styles.qrContainer}>
          <QRCode size={200} value={generatedQrCode} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  qrContainer: {
    marginTop: 30,
    alignItems: "center",
  },
});
