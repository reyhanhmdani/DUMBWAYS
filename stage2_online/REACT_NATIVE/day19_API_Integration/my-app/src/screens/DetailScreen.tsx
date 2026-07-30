import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParalist } from "../../App";
import { useUserStore } from "../store/useUserStore";

type Props = NativeStackScreenProps<RootStackParalist, "Detail">;

export default function DetailScreen({ navigation, route }: Props) {
  // ambil data product yang di pilih
  const product = useUserStore((state) => state.selectedProduct);

  return (
    <SafeAreaView className="flex-1 bg-slate-900 border-t border-slate-600">
      <View className="flex-grow justify-center p-8">
        {/* Card Utama */}
        <View className="bg-slate-800 rounded-3xl overflow-hidden mb-5">
          <Image
            source={{
              uri: `http://10.59.111.108:3000${product.productImage}`,
            }}
            className="w-full h-72"
            resizeMode="cover"
          />

          <View className="p-5">
            <Text className="text-xs font-bold text-sky-500 uppercase tracking-widest">{product?.category}</Text>
            <Text className="text-xl font-bold text-zinc-300 mt-1">{product?.name}</Text>
            <Text className="text-base font-bold text-emerald-600 mt-2">{product?.price}</Text>

            <View className="h-px bg-slate-600 my-4" />

            <Text className="text-base font-semibold text-slate-400 mb-1.5">Deskripsi Produk</Text>
            <Text className="text-sm text-slate-300 leading-5">
              Produk {product?.title} berkualitas tinggi dari kategori {product?.category} dengan harga terbaik.
            </Text>
          </View>
        </View>

        {/* Tombol Kembali */}
        <TouchableOpacity className="bg-slate-600 py-3.5 rounded-xl items-center" activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Text className="text-zinc-100 text-base font-bold">← Kembali ke Beranda</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
