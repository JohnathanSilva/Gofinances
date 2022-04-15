import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from '@expo-google-fonts/poppins';


import theme  from './src/Global/styles/theme';
import { CategorySelect } from './src/screens/CategorySelect';



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
      <StatusBar 
        style='light'
        translucent
      />
      <CategorySelect />
    </ThemeProvider> 
  );
}
