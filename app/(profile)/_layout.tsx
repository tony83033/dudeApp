// app/(profile)/_layout.tsx
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="orders"
        options={{
          title: 'My Orders',
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#000000',
          headerShadowVisible: false,
        }}
      />
      {/* <Stack.Screen
        name="earnings"
        options={{
          title: 'My Earnings',
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#000000',
          headerShadowVisible: false,
        }}
      /> */}
      {/* <Stack.Screen
        name="referral"
        options={{
          title: 'My Referral',
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#000000',
          headerShadowVisible: false,
        }}
      /> */}
      <Stack.Screen
        name="addresses"
        options={{
          title: 'My Addresses',
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#000000',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          title: 'Customer Support',
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#000000',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          title: 'Change Language',
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#000000',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="terms"
        options={{
          title: 'Terms & Conditions',
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#000000',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          title: 'Account Privacy',
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#000000',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}