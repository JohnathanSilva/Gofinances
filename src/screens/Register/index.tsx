import React, {useState} from "react";
import { Modal } from "react-native";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransationTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import { Container, Header, Title, Form, Fields, TransationType } from "./styles";



export function Register(){
    const [category, setCategory] = useState({
        key: 'category',
        name:'Categoria'
    });
    const [ transactionType, setTransactionType ] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    function handleTransationTypeSelect(type : 'up' | 'down'){
        setTransactionType(type)
    }

    function handleOpenSelectcategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectcategoryModal(){
        setCategoryModalOpen(false);
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
                    
                    <CategorySelectButton 
                        title={category.name} 
                        onPress={handleOpenSelectcategoryModal}
                    />
                </Fields>

                <Button title="Enviar" />
            </Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                    category={ category }
                    setCategory={ setCategory }
                    CloseSelectCategory={ handleCloseSelectcategoryModal }
                />
            </Modal>
        </Container>
    );
}