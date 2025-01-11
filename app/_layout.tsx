// app/_layout.tsx
import { Stack } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';
import { ROUTES } from './routes';
import '../global.css';

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="category/[id]"
          options={({ route }) => ({
            title: `Category ${route.params.id}`,
            headerBackTitle: 'Back',
            // You can add more styling here
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: '#000000',
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="product/[id]"
          options={({ route }) => ({
            title: `Product ${route.params.id}`,
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: '#000000',
            headerShadowVisible: false,
          })}
        />
      </Stack>
    </GlobalProvider>
  );
}