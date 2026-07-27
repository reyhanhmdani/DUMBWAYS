import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

interface Post {
  id: string;
  author: string;
  content: string;
}



const Dummy_Post: Post[] = Array.from({ length: 50 }).map((_, index) => ({
  id: index.toString(),
  author: `Pengguna ke - ${index + 1}`,
  content: `Content ke - ${index + 1}`,
}));

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: "grey" }}>
        <FlatList
          data={Dummy_Post}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.author}>{item.author}</Text>
              <Text>{item.content}</Text>
            </View>
          )}
        ></FlatList>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  author: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
});
