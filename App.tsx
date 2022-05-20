import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from '@expo-google-fonts/poppins';

import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

import theme  from './src/Global/styles/theme';
import { Routes } from './src/routes';

import { AuthProvider, useAuth } from './src/hooks/auth';

export default function App() {
  const [fontsLoad] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium, 
    Poppins_700Bold
  });

  const { userLoading } = useAuth();

  if (!fontsLoad || userLoading){
    return <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#5636D3'}/>        
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView> 
  );
}
