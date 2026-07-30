import { ActivityIndicator, Text, View, Image, TouchableOpacity, FlatList, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "../store/useUserStore";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../config/api";

export default function HomeScreen() {
  const setSelectedProduct = useUserStore((state) => state.setSelectedProduct);

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchProduct = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const token = await SecureStore.getItemAsync("userToken");
      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.data);
    } catch (error: any) {
      console.log("Fetch Error", error);
      Alert.alert("Access gagal", error.response?.data?.message || "failed ambil data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchProduct();
    setIsRefreshing(false);
  };

  const navigation = useNavigation<any>();
  // render item untuk flatlist
  const renderProduct = ({ item }: { item: any }) => (
    <View className="bg-slate-800 flex-row p-4 rounded-2xl items-center">
      <Image
        source={{
          uri: `http://10.59.111.108:3000${item.productImage}`,
        }}
        className="w-20 h-20 rounded-xl"
      />

      {/* detail produk */}
      <View className="flex-1 ml-4">
        <Text className="text-xs text-blue-400 font-bold uppercase">{item.category}</Text>
        <Text className="text-xl font-bold text-slate-400 mt-1">{item.name}</Text>
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

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-900">
        <ActivityIndicator size="large" color="#2FD3FA" />
      </View>
    );
  }

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
            // setName("Raihan Hamdani");
            navigation.navigate("Profile");
          }}
        >
          <Text className="text-white font-bold text-sm">Rey</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        className="flex-1"
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="p-6"
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ItemSeparatorComponent={() => <View className="h-6" />}
      />
    </SafeAreaView>
  );
}
