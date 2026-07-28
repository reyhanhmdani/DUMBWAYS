import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParalist } from "../../App";

type Props = NativeStackScreenProps<RootStackParalist, "Detail">;

export default function DetailScreen({ navigation, route }: Props) {
  // ambil data product yang di pilih
  const { product } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card Utama */}
        <View style={styles.card}>
          <Image source={{ uri: product?.image }} style={styles.cardImage} />

          <View style={styles.detailContainer}>
            <Text style={styles.category}>{product?.category}</Text>
            <Text style={styles.title}>{product?.title}</Text>
            <Text style={styles.price}>{product?.price}</Text>

            <View style={styles.garis} />

            <Text style={styles.descriptionLabel}>Deskripsi Produk</Text>
            <Text style={styles.descriptionText}>
              Produk {product?.title} berkualitas tinggi dari kategori {product?.category} dengan harga terbaik.
            </Text>
          </View>
        </View>

        {/* Tombol Kembali */}
        <TouchableOpacity style={styles.backButton} activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Kembali ke Beranda</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderTopColor: "#64666aff",
    borderTopWidth: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
  },
  detailContainer: {
    padding: 20,
  },
  category: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#38bdf8",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f8fafc",
    marginTop: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10b981",
    marginTop: 8,
  },
  garis: {
    height: 1,
    backgroundColor: "#657181ff",
    marginVertical: 16,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94a3b8",
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 14,
    color: "#cbd5e1",
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: "#334155",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  backButtonText: {
    color: "#f8fafc",
    fontSize: 14,
    fontWeight: "bold",
  },
});
