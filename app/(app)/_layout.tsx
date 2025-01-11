// app/(app)/_layout.tsx
import { Stack } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function AppLayout() {
  const { isLogged } = useGlobalContext();

  useEffect(() => {
    if (!isLogged) {
      router.replace('/(auth)/sign-in');
    }
  }, [isLogged]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}