// src/screens/QRScannerScreen.tsx
import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function QRScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // 1. Jika Izin Kamera Belum Diberikan
  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 12 }}>Akses Kamera Diperlukan</Text>
        <Button title="Beri Izin Kamera" onPress={requestPermission} />
      </View>
    );
  }

  // 2. Fungsi saat QR Code Terdeteksi
  const handleScan = (result: any) => {
    setScanned(true); // Kunci agar tidak ter-scan 50x per detik
    Alert.alert("QR Terbaca!", result.data, [{ text: "Scan Lagi", onPress: () => setScanned(false) }]);
  };

  // 3. Tampilan Scanner
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <CameraView
        style={{ flex: 1 }} 
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleScan}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />
    </View>
  );
}
