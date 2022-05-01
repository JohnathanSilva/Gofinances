import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from "@react-navigation/native";

import { HighlightCard } from "../../components/HighlightCard/";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import { 
    Container, 
    Header, 
    UserWapper, 
    UserInfo, 
    Photo, 
    User, 
    UserGreeting, 
    UserName,
    LogoutButton, 
    Icon, 
    HighlightCards, 
    Transaction, 
    Title,
    TransactionList
} from "./styles";

export interface DataListProps extends TransactionCardProps{
    id: string;     
}

export function Dashboard(){
    const [data, setData] = useState<DataListProps[]>([]);

    async function loadTransaction() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transaction = response ? JSON.parse(response) : [];
        const transactionFormatted: DataListProps[] = transaction.map((item: DataListProps) => {
            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR',{
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));
            
            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }
        }); 

        setData(transactionFormatted);
    }

    useEffect(() => {
        loadTransaction();
    },[]);

    useFocusEffect(useCallback(() => {
        loadTransaction();
    },[]))

    return(
        <Container>
            <Header>
                <UserWapper>
                    <UserInfo>
                        <Photo source={{uri: 'https://avatars.githubusercontent.com/u/61166807?v=4'}}/>
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Johanthan</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power"/>
                    </LogoutButton>
                </UserWapper>
            </Header>
            <HighlightCards>
                <HighlightCard 
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down" 
                    title="Saídas"
                    amount="R$ 1.250,00"
                    lastTransaction="Última saída dia 13 de abril"
                />
                <HighlightCard 
                    type="total"
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction="01 à 16 abril"
                />
            </HighlightCards>
                <Transaction>
                    <Title>Listagem</Title>
                    
                    <TransactionList 
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <TransactionCard data={item} />}
                        showsVerticalScrollIndicator={false}
                    />
                </Transaction>
        </Container>
    );
}
