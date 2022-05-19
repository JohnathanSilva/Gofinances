import React, { useContext } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from "../../assets/logo.svg";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";

import { SignInSocialButton } from "../../components/SignInSocialButton";

import { Container, Header, Title, TitleWrapper, SignInTitle, Footer, FooterWrapper } from "./styles";

import { useAuth } from "../../hooks/auth"

export function SignIn(){
    const { signInWithGoogle, signInWithApple } = useAuth(); 
    
    async function  handleSignInWithGoogle() {
        try{
            await signInWithGoogle();

        } catch (error ){
            console.log(error);
            Alert.alert('não foi possível conectar a conta Google');
        }
    }

    async function handleSignInWithApple() {
        try {
            await signInWithApple
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Apple');
        }
    }
    
    return(
        <Container>
            <Header>
                <TitleWrapper> 
                <LogoSvg 
                    width={RFValue(120)}
                    height={RFValue(68)}
                />
                <Title>
                    Controle suas {'\n'}
                    finanças de forma {'\n'}
                    muito simples
                </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton 
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    <SignInSocialButton 
                        title="Entrar com Apple"
                        svg={AppleSvg}
                        onPress={handleSignInWithApple}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    );
}