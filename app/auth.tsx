import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function AuthScreen() {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>('');

  const handleSwitchMode = () => {
    setIsSignup(prev => !prev);
  };

  const handleAuth = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignup ? 'Sign Up' : 'Welcome Back !'}
        </Text>
        <TextInput
          placeholder="example@mail.com"
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
          onChangeText={setEmail}
        />
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          mode="outlined"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />
        <Button mode="contained" style={styles.button} onPress={handleAuth}>
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Button>
        <Button
          mode="text"
          onPress={handleSwitchMode}
          style={styles.switchModeButton}
        >
          {isSignup
            ? 'Already have an account? Sign In'
            : "Don't have an account? Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 8,
  },
});
