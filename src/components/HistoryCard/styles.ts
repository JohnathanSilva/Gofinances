import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps{
    color: string
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    
    background-color: ${({ theme }) => theme.colors.shape};
    
    padding: 13px 24px;

    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    
    border-radius: 5px;
    border-left-width: 5px;
    border-left-color: ${({color}) => color};

    margin-bottom: 8px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.title}
`;

export const Amount = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.bold};

    color: ${({ theme }) => theme.colors.title};
`;