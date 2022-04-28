import React, {useState, useEffect} from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm } from "react-hook-form";

import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransationTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import { Container, Header, Title, Form, Fields, TransationType } from "./styles";

interface FormData {
    [key: string]: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor númerico')
            .positive('O valor não pode ser negativo') 
});

export function Register(){    
    const [ transactionType, setTransactionType ] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const dataKey = '@gofinances:transactions';
            
    const [category, setCategory] = useState({
        key: 'category',
        name:'Categoria'
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransationTypeSelect(type : 'up' | 'down'){
        setTransactionType(type)
    }

    function handleOpenSelectcategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectcategoryModal(){
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData){
        if(!transactionType){
            return Alert.alert('Selecione o tipo da transação');
        } 

        if(category.key === 'category'){
            return Alert.alert('Selecione a Categoria')
        }

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
        
        try {
            await AsyncStorage.setItem(dataKey,JSON.stringify(data));

        } catch ( error ) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
    }

    useEffect(() => {
        async function loadData(){
            const data = await AsyncStorage.getItem(dataKey);
            console.log(JSON.parse(data!));
        }

        loadData();
    }, []);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm 
                            name="amount"
                            control={control} 
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
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
        </TouchableWithoutFeedback>
    );
}