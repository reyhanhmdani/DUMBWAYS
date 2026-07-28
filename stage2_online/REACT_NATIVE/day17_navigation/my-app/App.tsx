import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

export type RootStackParalist = {
  MainApp: undefined;
  Detail: { product: any };
  Profile: { id: number; name: string };
};

export type RootTabParamList = {
  HomeTab: undefined;
  Profile: { id: number; name: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParalist>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#1e293b",
          opacity: 0.9,
          borderTopColor: "#1e293b",
          height: 65,
          paddingTop: 8,
          paddingBottom: 10,
        },
        // headerShown: false,
        headerStyle: { backgroundColor: "#0f172a" },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: "Beranda" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainApp">
          <Stack.Screen name="MainApp" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{
              title: `Detail Product`,
              headerStyle: { backgroundColor: "#0f172a" },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
