import React, {useState} from "react";
import { Modal } from "react-native";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Form/Input";
import { InputForm } from "../../components/InputForm";
import { Button } from "../../components/Form/Button";
import { TransationTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import { Container, Header, Title, Form, Fields, TransationType } from "./styles";

interface FormData {
    [key: string]: string;
}

export function Register(){
    const [category, setCategory] = useState({
        key: 'category',
        name:'Categoria'
    });

    const {
        control,
        handleSubmit
    } = useForm();

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

    function handleRegister(form: FormData){
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
        
        console.log(data);
    }

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <InputForm 
                        name="name"
                        control={control}
                        placeholder="Nome"
                    />
                    <InputForm 
                        name="amount"
                        control={control} 
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

                <Button 
                    title="Enviar" 
                    onPress={handleSubmit(handleRegister)}
                />
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