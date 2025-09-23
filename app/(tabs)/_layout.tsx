import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'coral' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <FontAwesome5 name="home" color={color} size={24} />
            ) : (
              <FontAwesome5 name="home" color="gray" size={24} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <FontAwesome5 name="user" color={color} size={24} />
            ) : (
              <FontAwesome5 name="user" color="gray" size={24} />
            );
          },
        }}
      />
    </Tabs>
  );
}
