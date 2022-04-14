import React, {useState} from "react";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransationTypeButton } from "../../components/Form/TransactionTypeButton";

import { Container, Header, Title, Form, Fields, TransationType } from "./styles";
import { CategorySelect } from "../../components/Form/CategorySelect";


export function Register(){
    const [ transactionType, setTransactionType ] = useState('');

    function handleTransationTypeSelect(type : 'up' | 'down'){
        setTransactionType(type)
    }

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input 
                        placeholder="Nome"
                    />
                    <Input 
                        placeholder="Preço"
                    />
                    <TransationType>
                        <TransationTypeButton 
                            type="up"
                            title="Income"
                            isActive={transactionType === 'up'}
                            onPress={() => handleTransationTypeSelect('up')}
                        />
                        <TransationTypeButton 
                            type="down"
                            title="Outcome"
                            isActive={transactionType === 'down'}
                            onPress={() => handleTransationTypeSelect('down')}
                        />
                    </TransationType>
                    
                    <CategorySelect title="Categoria" />
                </Fields>

                <Button title="Enviar" />
            </Form>
        </Container>
    );
}