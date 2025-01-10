import react from 'react';

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
import { Link, router } from 'expo-router';

import { useGlobalContext } from '../../context/GlobalProvider';
import { createUser } from '../../lib/handleAuth';
const SignUp = () => {  
    const { setUser, setIsLogged } = useGlobalContext();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup =  async() => {
    // Add your signup logic here
    if (email === "" || password === "" || confirmPassword === "") {
        Alert.alert("Error", "Please fill in all fields");
      }

      try {
        const result = await createUser(email,password);
        setUser(result);
        setIsLogged(true);
                    Alert.alert("Success", "User signed in successfully");
        router.replace("/home");
      } catch (error) {
        
      }
  
    console.log('Signup pressed');
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
                Create Account
              </Text>
  
              {/* Form Container */}
              <View className="space-y-4">
                {/* Email Input */}
                <View>
                  <Text className="text-sm font-medium mb-1 text-gray-700">
                    Email Address
                  </Text>
                  <TextInput
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
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
  
                {/* Confirm Password Input */}
                <View>
                  <Text className="text-sm font-medium mb-1 text-gray-700">
                    Confirm Password
                  </Text>
                  <TextInput
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
  
                {/* Signup Button */}
                <TouchableOpacity
                  className="w-full bg-blue-500 py-4 rounded-lg mt-6"
                  onPress={handleSignup}
                  activeOpacity={0.8}
                >
                  <Text className="text-white text-center font-semibold text-base">
                    Sign Up
                  </Text>
                </TouchableOpacity>
  
                {/* Login Link */}
                <View className="flex-row justify-center mt-4">
                  <Text className="text-gray-600">Already have an account? </Text>
                  <Link href="/(auth)/sign-in">
                    <Text className="text-blue-500 font-semibold">Log In</Text>
                  </Link>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

    );

}
export default SignUp;