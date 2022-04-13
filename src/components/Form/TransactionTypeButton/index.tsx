import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title, Icon} from './styles';

const icons = {
    up: "arrow-up-circle",
    down: "arrow-down-circle"
}

interface Props extends TouchableOpacityProps{
    type: 'up' | 'down';
    title: string;
    isActive: boolean;
}

export function TransationTypeButton({ type, title, isActive, ...rest } : Props){
    return(
        <Container 
            {...rest} 
            type={type}
            isActive={isActive}
        >
            <Icon 
                name={icons[type]}
                type={type}
            />
            <Title>{title}</Title>
        </Container>
    );
}