import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../Global/styles/theme";


export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.backgruond};
    
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;

    background-color: ${({ theme }) => theme.colors.primary};

    align-items: center;
    justify-content: flex-end;
    padding: 19px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.shape};
`;

export const Form = styled.View`
    flex: 1;

    padding: 0 24px 31px;

    justify-content: flex-end;
`;
