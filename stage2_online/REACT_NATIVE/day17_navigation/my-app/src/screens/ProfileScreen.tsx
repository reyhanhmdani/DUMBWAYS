import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../App";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = BottomTabScreenProps<RootTabParamList, "Profile">;

export default function Profile({ route, navigation }: Props) {
  const { name } = route.params || {};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card Utama */}
        <View style={styles.card}>
          <Text style={styles.title}>Name : {name}</Text>
        </View>

        {/* Tombol Kembali */}
        <TouchableOpacity style={styles.logOut} activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Text style={styles.logOutText}>← LogOut</Text>
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
    alignItems: "center",
    marginBottom: 16,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f8fafc",
    letterSpacing: 1,
  },
  logOut: {
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  logOutText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
