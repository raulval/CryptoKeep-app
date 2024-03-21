import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { theme } from "@/theme";
import { View } from "react-native";
import { ThemeEnum, useThemeStore } from "@/store/themeStore";

export default function TabLayout() {
  const { theme: colorTheme } = useThemeStore();
  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
            borderRadius: 26,
            marginBottom: 22,
            marginHorizontal: 12,
            justifyContent: "center",
            alignItems: "center",
            borderBlockColor: "transparent",
            backgroundColor:
              colorTheme === ThemeEnum.LIGHT
                ? theme.colors.light.bottomNav
                : theme.colors.dark.bottomNav,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          },
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: "Poppins_500Medium",
          },
          tabBarItemStyle: {
            height: 70,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            title: "Activity",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="exchange" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
