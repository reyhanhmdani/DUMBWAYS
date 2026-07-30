import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const DUMMY_POST = [
  {
    id: "1",
    title: "Nike Air Max",
    category: "Sepatu",
    price: "2.500.000",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWRpZGFzJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "2",
    title: "Adidas Ultraboost",
    category: "Sepatu",
    price: "3.000.000",
    image:
      "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWRpZGFzJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "3",
    title: "Puma RS-X",
    category: "Sepatu",
    price: "1.800.000",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVtYSUyMHNob2VzfGVufDB8fDB8fHww",
  },
  {
    id: "4",
    title: "MacBook Pro M3 Max",
    category: "Laptop",
    price: "Rp 35.000.000",
    image: "https://picsum.photos/id/1/200/200",
  },
  {
    id: "5",
    title: "Keyboard mekanik",
    category: "Accessories",
    price: "Rp 1.500.000",
    image: "https://picsum.photos/id/2/200/200",
  },
  {
    id: "6",
    title: "Logitech Mouse",
    category: "Accessories",
    price: "Rp 1.800.000",
    image: "https://picsum.photos/id/3/200/200",
  },
  {
    id: "7",
    title: "Monitor 4K",
    category: "Display",
    price: "Rp 8.500.000",
    image: "https://picsum.photos/id/4/200/200",
  },
];

export default function App() {
  // render item untuk flatlist
  const renderProduct = ({ item }: { item: (typeof DUMMY_POST)[0] }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />

      {/* detail produk */}
      <View style={styles.cardDetail}>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardPrize}>{item.price}</Text>
      </View>

      <TouchableOpacity style={styles.buyButton} activeOpacity={0.7} onPress={() => alert(`Kamu memilih ${item.title}`)}>
        <Text style={styles.buyButtonText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#347a0fff" />

        <View style={styles.header}>
          <View>
            <Text style={styles.textSelamat}>Welcome Rey</Text>
            <Text style={styles.usernameText}>Rey App</Text>
          </View>

          <TouchableOpacity style={styles.avatarButton} onPress={() => alert("Profil DI klik")}>
            <Text style={styles.avatarText}>Rey</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={DUMMY_POST}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomColor: "#1e293b",
    borderBottomWidth: 1,
  },
  textSelamat: {
    fontSize: 12,
    color: "#94a3b8",
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f8fafc",
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  listContainer: {
    padding: 25,
  },
  card: {
    backgroundColor: "#1e293b",
    flexDirection: "row",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  cardImage: {
    width: 65,
    height: 65,
    borderRadius: 12,
  },
  cardDetail: {
    flex: 1,
    marginLeft: 12,
  },
  cardCategory: {
    fontSize: 10,
    color: "#38bdf8",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f8fafc",
    marginTop: 2,
  },
  cardPrize: {
    fontSize: 12,
    color: "#10b981",
    fontWeight: "600",
    marginTop: 4,
  },
  buyButton: {
    backgroundColor: "#334155",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buyButtonText: {
    color: "#f8fafc",
    fontSize: 12,
    fontWeight: "bold",
  },
});
