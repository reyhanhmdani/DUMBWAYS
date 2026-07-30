import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../App";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

import { useContext } from "react";

type Props = BottomTabScreenProps<RootTabParamList, "Profile">;

export default function Profile({ route, navigation }: Props) {

  const { user, signOut } = useContext(AuthContext);
  return (
    <SafeAreaView className="flex-1 bg-slate-900 border-t border-t-slate-600">
      <View className="flex-grow p-5">
        <View className="bg-slate-800 rounded-2xl shadow-lg shadow-emerald-500 flex-row items-center p-5 mb-4 border border-slate-700">
          <View className="flex-1 ml-4">
            <Text className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">User Profile</Text>
            <Text className="text-xl font-bold text-slate-50 mt-1">{user?.name || "Rey App"}</Text>
          </View>

          <View className="w-14 h-14 rounded-full bg-emerald-500 justify-center items-center">
            <MaterialIcons name="person" size={32} color="white" />
          </View>
        </View>

        {/* grid */}
        <View className="flex-row flex-wrap justify-between gap-y-4 mb-4">
          <View className="bg-slate-800 rounded-2xl p-4 shadow-lg shadow-emerald-500/20 w-[48%] border border-slate-700">
            <View className="flex-row justify-between items-start mb-4">
              <MaterialIcons name="code" size={24} color="#38bdf8" />
              <View className="flex-row items-center bg-emerald-500/20 px-2 py-0.5 rounded-xl border border-emerald-500/40">
                <MaterialIcons name="arrow-upward" size={12} color="#10b981" />
                <Text className="text-emerald-400 text-xs ml-0.5 font-bold">10%</Text>
              </View>
            </View>
            <Text className="text-zinc-100 text-2xl font-bold mb-1">18</Text>
            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Projects</Text>
          </View>

          <View className="bg-slate-800 rounded-2xl p-4 shadow-lg shadow-emerald-500/20 w-[48%] border border-slate-700">
            <View className="flex-row justify-between items-start mb-4">
              <MaterialIcons name="local-fire-department" size={24} color="#f97316" />
              <View className="flex-row items-center bg-orange-500/20 px-2 py-0.5 rounded-xl border border-orange-500/40">
                <MaterialIcons name="whatshot" size={12} color="#f97316" />
                <Text className="text-orange-400 text-xs ml-0.5 font-bold">14 Days</Text>
              </View>
            </View>
            <Text className="text-zinc-100 text-2xl font-bold mb-1">342</Text>
            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Git Commits</Text>
          </View>

          <View className="bg-slate-800 rounded-2xl p-4 shadow-lg shadow-emerald-500/20 w-[48%] border border-slate-700">
            <View className="flex-row justify-between items-start mb-4">
              <MaterialIcons name="school" size={24} color="#a855f7" />
              <View className="flex-row items-center bg-purple-500/20 px-2 py-0.5 rounded-xl border border-purple-500/40">
                <MaterialIcons name="check-circle" size={12} color="#c084fc" />
                <Text className="text-purple-300 text-xs ml-0.5 font-bold">Active</Text>
              </View>
            </View>
            <Text className="text-zinc-100 text-2xl font-bold mb-1">Stage 2</Text>
            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Bootcamp</Text>
          </View>

          <View className="bg-slate-800 rounded-2xl p-4 shadow-lg shadow-emerald-500/20 w-[48%] border border-slate-700">
            <View className="flex-row justify-between items-start mb-4">
              <MaterialIcons name="coffee" size={24} color="#eab308" />
              <View className="flex-row items-center bg-amber-500/20 px-2 py-0.5 rounded-xl border border-amber-500/40">
                <Text className="text-amber-400 text-xs font-bold">⚡ 99%</Text>
              </View>
            </View>
            <Text className="text-zinc-100 text-2xl font-bold mb-1">120+ hrs</Text>
            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Hours Coded</Text>
          </View>
        </View>

        {/* Tombol Logout */}
        <TouchableOpacity
          className="bg-red-500 py-3.5 px-10 rounded-xl items-center self-center mt-auto"
          activeOpacity={0.8}
          onPress={() => {
            signOut();
            navigation.navigate("HomeTab");
          }}
        >
          <Text className="text-white font-bold">← LogOut</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
