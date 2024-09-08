import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="add-plan" options={{ title: "Add Travel Plan" }} />
      <Tabs.Screen name="itinerary" options={{ title: "Itinerary" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
    </Tabs>
  );
}
