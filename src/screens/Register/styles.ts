import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.backgruond};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;

    background-color: ${({ theme }) => theme.colors.primary};

    justify-content: flex-end;
    align-items: center;
    padding: 19px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.shape};
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    justify-content: space-between;
    padding: 24px;
`; 

export const Fields = styled.View``;

export const TransationType = styled.View`
    flex-direction: row;
    justify-content: space-between;
    
    margin-top: 8px;
    margin-bottom: 16px;
`;