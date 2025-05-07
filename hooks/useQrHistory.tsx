import { QRItem } from "@/app/(tabs)/history";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export default function useQrHistory() {
  const [history, setHistory] = useState<QRItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      loadHistory();

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // console.log('ProfileScreen focus effect cleanup');
      };
    }, [])
  );

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem("qrHistory");
      console.log(data);

      if (data) {
        setHistory(JSON.parse(data));
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  };

  return history;
}
