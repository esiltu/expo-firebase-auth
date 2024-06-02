import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarActiveTintColor: '#f3a683',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="diensten"
        options={{
          title: "Diensten",
          tabBarActiveTintColor: '#f3a683',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="clipboard-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="schema"
        options={{
          title: "Rooster",
          tabBarActiveTintColor: '#f3a683',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="calendar-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profiel"
        options={{
          title: "Profiel",
          tabBarActiveTintColor: '#f3a683',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person-outline" color={color} />,
        }}
      />
      {/* Don't want to see on Tab page maybe? */}
      <Tabs.Screen
        name="app-icoon"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="bestanden-flex"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profiel-inzien"
        options={{
          href: null,
        }}
      />
      {/* End of it! */}
    </Tabs>
  );
}
