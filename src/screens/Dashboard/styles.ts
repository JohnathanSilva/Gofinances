import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.backgruond};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    
    background-color: ${({ theme }) => theme.colors.primary};
    
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const UserWapper = styled.View`
    width: 100%;

    padding: 0 24px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    
    border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;
`;

export const UserGreeting = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    
    color: ${({ theme }) => theme.colors.shape};
`;

export const UserName = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.blod};
    
    color: ${({ theme }) => theme.colors.shape};
`;