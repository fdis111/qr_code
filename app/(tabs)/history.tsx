import { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import { useFocusEffect } from "@react-navigation/native";
import useQrHistory from "../../hooks/useQrHistory";

export interface QRItem {
  id: string;
  url: string;
  name: string;
  date: string;
}

export default function HistoryScreen() {
  // const [history, setHistory] = useState<QRItem[]>([]);

  const history = useQrHistory();

  const renderItem = ({ item }: { item: QRItem }) => (
    <Link href={`/codes/${item.id}`}>
      <View style={styles.item}>
        <View style={styles.qrContainer}>
          <QRCode value={item.url} size={100} />
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemUrl}>{item.url}</Text>
          <Text style={styles.itemDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No QR codes generated yet</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  qrContainer: {
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemUrl: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  itemDate: {
    fontSize: 12,
    color: "#999",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});
