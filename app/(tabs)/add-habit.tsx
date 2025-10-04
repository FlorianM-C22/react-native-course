import { databases, DB_ID, HABITS_COLLECTION_ID } from '@/lib/appwrite';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ID } from 'react-native-appwrite';
import {
  Button,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

const FREQUENCIES = ['daily', 'weekly', 'monthly'];
type Frequency = (typeof FREQUENCIES)[number];

export default function AddHabitScreen() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [frequency, setFrequency] = useState<Frequency>('daily');
  const [error, setError] = useState<string>('');

  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!user) {
      return;
    }
    try {
      await databases.createDocument(DB_ID, HABITS_COLLECTION_ID, ID.unique(), {
        user_id: user.$id,
        title,
        description,
        streak_count: 0,
        last_completed: new Date().toISOString(),
        frequency,
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
      });
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      } else {
        setError('An error occurred while adding the habit');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        placeholder="Habit Name"
        mode="outlined"
        style={styles.input}
        onChangeText={setTitle}
      />
      <TextInput
        label="Description"
        placeholder="Description"
        mode="outlined"
        style={styles.input}
        onChangeText={setDescription}
      />
      <View>
        <SegmentedButtons
          buttons={FREQUENCIES.map(frequency => ({
            value: frequency,
            label: frequency.charAt(0).toUpperCase() + frequency.slice(1),
          }))}
          style={styles.frequencyContainer}
          value={frequency}
          onValueChange={value => setFrequency(value as Frequency)}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={!title || !description}
        style={styles.button}
      >
        Add Habit
      </Button>
      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  frequencyContainer: {
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
  },
});
