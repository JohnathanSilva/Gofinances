import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled(RectButton)`
    width: 100%;
    height: 56px;

    background-color: ${({ theme }) => theme.colors.shape};

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 16px;
    border-radius: 5px;
`;

export const ImageContainer = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;

    padding: ${RFValue(16)}px;
    border-color: ${({ theme }) => theme.colors.background};
    border-right-width: 1px;
`;

export const Title = styled.Text`
    flex: 1;
    text-align: center;
    
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.medium};

    color: ${({ theme }) => theme.colors.title};
`;