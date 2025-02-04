import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router, Redirect } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { signIn, getCurrentUser } from '@/lib/handleAuth';

const SignIn = () => {  
  const { setUser, setIsLogged, isLogged } = useGlobalContext();
  
  // Redirect if already logged in
  if (isLogged) {
    return <Redirect href="/home" />;
  }

  const [phone, setPhone] = useState('');  // Replacing email with phone
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (phone === "" || password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      // Pass phone and password for login validation
      await signIn(phone, password);

      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      Alert.alert("Success", "User login successfully");
      router.replace("/home");

    } catch (error: any) {
      Alert.alert("Error", error?.message || "An error occurred");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerClassName="flex-grow justify-center"
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 py-8 flex-1 justify-center">
            {/* Header */}
            <Text className="text-3xl font-bold mb-8 text-center text-gray-800">
              Login
            </Text>

            {/* Form Container */}
            <View className="space-y-4">
              {/* Phone Input */}
              <View>
                <Text className="text-sm font-medium mb-1 text-gray-700">
                  Phone Number
                </Text>
                <TextInput
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"  // Use phone number keyboard
                  autoCapitalize="none"
                />
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-sm font-medium mb-1 text-gray-700">
                  Password
                </Text>
                <TextInput
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              {/* Login Button */}
              <TouchableOpacity
                className="w-full bg-blue-500 py-4 rounded-lg mt-6"
                onPress={handleLogin}  // Handle login logic here
                activeOpacity={0.8}
              >
                <Text className="text-white text-center font-semibold text-base">
                  Login
                </Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View className="flex-row justify-center mt-4">
                <Text className="text-gray-600">Don't have an account? </Text>
                <Link href="/(auth)/sign-up">
                  <Text className="text-blue-500 font-semibold">Create a new account</Text>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
