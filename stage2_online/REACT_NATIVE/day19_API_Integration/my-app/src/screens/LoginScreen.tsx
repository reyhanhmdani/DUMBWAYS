import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { api } from "../config/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email & Password is required");
      return;
    }
    try {
      const response = await api.post("/users/login", {
        email: email,
        password: password,
      });
      signIn(response.data.token);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "ada sesuatu yang ga beres";
      Alert.alert("Login Gagal", errorMessage);
    }
  };

  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-[#09111E]">
      <StatusBar barStyle="light-content" backgroundColor="#09111E" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: Platform.OS === "android" ? 30 : 20,
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Main Content Card Wrapper */}
          <View className="flex-1 justify-center">
            {/* Header Shield Logo */}
            <View className="items-center mb-6">
              <View className="w-20 h-20 rounded-3xl bg-[#132032] justify-center items-center border border-[#1F314A]">
                <MaterialCommunityIcons name="shield-half-full" size={40} color="#2FD3FA" />
              </View>
            </View>

            {/* Title & Subtitle */}
            <Text className="text-2xl font-bold text-white text-center tracking-tight mb-2">Selamat Datang</Text>
            <Text className="text-xs text-[#8A99AD] text-center leading-5 mb-8">Silakan masuk untuk melanjutkan masuk ke{"\n"}halaman web</Text>

            {/* Form Fields */}
            <View className="w-full">
              {/* Email Field */}
              <View className="mb-4">
                <Text className="text-xs font-semibold text-[#CBD5E1] mb-2">Email</Text>
                <View className="flex-row items-center bg-[#0E1A2B] border border-[#1F314A] rounded-xl px-4 h-[52px]">
                  <TextInput
                    className="flex-1 text-white text-sm pr-3"
                    placeholder="nama@email.com"
                    placeholderTextColor="#3A4D68"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <Feather name="mail" size={18} color="#3A4D68" />
                </View>
              </View>

              {/* Password Field */}
              <View className="mb-2">
                <Text className="text-xs font-semibold text-[#CBD5E1] mb-2">Password</Text>
                <View className="flex-row items-center bg-[#0E1A2B] border border-[#1F314A] rounded-xl px-4 h-[52px]">
                  <TextInput
                    className="flex-1 text-white text-sm pr-3"
                    placeholder="••••••••"
                    placeholderTextColor="#3A4D68"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#3A4D68" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity className="self-end mt-2 mb-6" activeOpacity={0.7}>
                <Text className="text-[#2FD3FA] text-xs font-bold">Lupa Password?</Text>
              </TouchableOpacity>

              {/* Submit Button */}
              <TouchableOpacity
                className="bg-[#2FD3FA] h-[52px] rounded-xl flex-row justify-center items-center shadow-lg"
                onPress={handleLogin}
                activeOpacity={0.85}
              >
                <Text className="text-[#09111E] text-sm font-extrabold mr-2">Masuk</Text>
                <Feather name="arrow-right" size={18} color="#09111E" />
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-7">
              <View className="flex-1 h-[1px] bg-[#1F314A]" />
              <Text className="text-[#52647C] text-[11px] font-bold mx-4 tracking-widest">ATAU</Text>
              <View className="flex-1 h-[1px] bg-[#1F314A]" />
            </View>

            {/* Social Logins */}
            <View className="flex-row justify-center gap-4 mb-8">
              <TouchableOpacity className="w-14 h-14 rounded-full bg-[#132032] border border-[#1F314A] justify-center items-center" activeOpacity={0.8}>
                <FontAwesome name="google" size={20} color="#EA4335" />
              </TouchableOpacity>
              <TouchableOpacity className="w-14 h-14 rounded-full bg-[#132032] border border-[#1F314A] justify-center items-center" activeOpacity={0.8}>
                <FontAwesome name="apple" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View className="items-center mb-6">
              <Text className="text-xs text-[#8A99AD]">
                Belum punya akun? <Text className="text-[#2FD3FA] font-bold">Daftar Baru</Text>
              </Text>
            </View>
          </View>

          {/* Bottom Footer Floating Icons (Edge to Edge) */}
          <View className="flex-row justify-between items-center pt-2">
            <TouchableOpacity
              className="w-12 h-12 rounded-2xl bg-[#2FD3FA] justify-center items-center"
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("QRScanner");
              }}
            >
              <Ionicons name="camera" size={26} color="#09111E" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="finger-print-outline" size={26} color="#3A4D68" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
