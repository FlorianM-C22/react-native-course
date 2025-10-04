import { databases, DB_ID, HABITS_COLLECTION_ID } from '@/lib/appwrite';
import { useAuth } from '@/lib/auth-context';
import { Habit } from '@/types/database.type';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Query } from 'react-native-appwrite';
import { Button, Text } from 'react-native-paper';

export default function Index() {
  const { user, signOut } = useAuth();

  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    fetchHabits();
  }, [user]);

  const fetchHabits = async () => {
    if (!user) {
      return;
    }
    try {
      const response = await databases.listDocuments(
        DB_ID,
        HABITS_COLLECTION_ID,
        [Query.equal('user_id', user.$id ?? '')]
      );
      setHabits(response.documents as unknown as Habit[]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Today's Habits</Text>
        <Button mode="text" onPress={signOut} icon="logout">
          Sign Out
        </Button>
      </View>
      {habits.length === 0 ? (
        <View>
          <Text>No habits yet, add your first one!</Text>
          <Button mode="contained" onPress={() => router.push('/add-habit')}>
            Let's Go!
          </Button>
        </View>
      ) : (
        <View style={styles.habitsContainer}>
          {habits.map(habit => (
            <View key={habit.$id} style={styles.habitContainer}>
              <Text>{habit.title}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  habitsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
