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
import { Link, router,Redirect } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { signIn, getCurrentUser } from '@/lib/handleAuth';

const SignIn = () => {  
  const { setUser, setIsLogged,isLogged } = useGlobalContext();
  if(isLogged) {
      return <Redirect href="/home" />;
     }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignup = async() => {
    // Add your signup logic here
    console.log('login pressed');
     if (email === "" || password === "" ) {
            Alert.alert("Error", "Please fill in all fields");
          }
   

          try {
            await signIn(email,password);
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
  
              
              
  
                {/* Signup Button */}
                <TouchableOpacity
                  className="w-full bg-blue-500 py-4 rounded-lg mt-6"
                  onPress={handleSignup}
                  activeOpacity={0.8}
                >
                  <Text className="text-white text-center font-semibold text-base">
                    Login
                  </Text>
                </TouchableOpacity>
  
                {/* Login Link */}
                <View className="flex-row justify-center mt-4">
                  <Text className="text-gray-600">Don't have an account? </Text>
                  <Link href="/(auth)/sign-up">
                    <Text className="text-blue-500 font-semibold">create a new account</Text>
                  </Link>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

    );

}
export default SignIn;