import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { BottomTabs } from "@/components/nav";

export default function TabLayout() {
  return (
    <BottomTabs>
      <BottomTabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Icon name="cog" size={24} color={color} />
          ),
        }}
      />
    </BottomTabs>
  );
}
