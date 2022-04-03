import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from '@expo-google-fonts/poppins';


import theme  from './src/Global/styles/theme';
import { Dashboard } from './src/screens/Dashboard';



export default function App() {
  const [fontsLoad] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium, 
    Poppins_700Bold
  });

  if (!fontsLoad){
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>  
  );
}
