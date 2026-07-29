import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, StatusBar, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "../store/useUserStore";
import { useStore } from "zustand";

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

export default function HomeScreen() {
  const setSelectedProduct = useUserStore((state) => state.setSelectedProduct);
  const setName = useUserStore((state) => state.setName);

  const navigation = useNavigation<any>();
  // render item untuk flatlist
  const renderProduct = ({ item }: { item: (typeof DUMMY_POST)[0] }) => (
    <View className="bg-slate-800 flex-row p-4 rounded-2xl items-center">
      <Image source={{ uri: item.image }} className="w-20 h-20 rounded-xl" />

      {/* detail produk */}
      <View className="flex-1 ml-4">
        <Text className="text-xs text-blue-400 font-bold uppercase">{item.category}</Text>
        <Text className="text-xl font-bold text-slate-400 mt-1">{item.title}</Text>
        <Text className="text-base text-green-500 font-semibold mt-2">{item.price}</Text>
      </View>

      <TouchableOpacity
        className="bg-slate-700 px-5 py-3 rounded-xl"
        activeOpacity={0.7}
        onPress={() => {
          setSelectedProduct(item);
          navigation.navigate("Detail");
        }}
      >
        <Text className="text-slate-200 font-bold">Detail</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <StatusBar barStyle="light-content" className="bg-emerald-800" />

      <View className="flex-row justify-between items-center px-5 py-4 border-y border-slate-800">
        <View>
          <Text className="text-xs color-white">Welcome Rey</Text>
          <Text className="text-xl font-bold text-white">Rey App</Text>
        </View>

        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-emerald-500 justify-center items-center"
          onPress={() => {
            setName("Raihan Hamdani");
            navigation.navigate("Profile");
          }}
        >
          <Text className="text-white font-bold text-sm">Rey</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        className="flex-1"
        data={DUMMY_POST}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-6"
        ItemSeparatorComponent={() => <View className="h-6" />}
      />
    </SafeAreaView>
  );
}
