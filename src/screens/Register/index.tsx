import React, {useState} from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransationTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import { Container, Header, Title, Form, Fields, TransationType } from "./styles";
import { useAuth } from "../../hooks/auth";

interface FormData {
    [key: string]: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor númerico')
            .positive('O valor não pode ser negativo')
            .required('O valor é obrigatório') 
});

type NavigationProps = {
    navigate:(screen:string) => void;
 }

export function Register(){    
    const [ transactionType, setTransactionType ] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name:'Categoria'
    });

    const navigation = useNavigation<NavigationProps>();

    const { user } = useAuth();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransationTypeSelect(type : 'positive' | 'negative'){
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

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }
        
        try {
            const dataKey = `@gofinances:transactions_user=${user.id}`;
            
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                ...currentData,
                newTransaction
            ]

            await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name:'Categoria'
            });

            navigation.navigate('Listagem');
        } catch ( error ) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
    }

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
                                isActive={transactionType === 'positive'}
                                onPress={() => handleTransationTypeSelect('positive')}
                            />
                            <TransationTypeButton 
                                type="down"
                                title="Outcome"
                                isActive={transactionType === 'negative'}
                                onPress={() => handleTransationTypeSelect('negative')}
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