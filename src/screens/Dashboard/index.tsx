import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

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
    TransactionList,
    LoadContainer
} from "./styles";

export interface DataListProps extends TransactionCardProps{
    id: string;     
}

interface HighlightProps{
    amount: string;
    lastTransaction: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensive: HighlightProps;
    total: HighlightProps;
}
export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true);
    const [transaction, setTransaction] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme(); 
    const { user ,signOut } = useAuth();

    function getLastTransactionDate( collection: DataListProps[], type: 'positive' | 'negative'){
        const collectionFilttred = collection
        .filter( transaction => transaction.type === type);

        if(collectionFilttred.length === 0){
            return 0;
        }

        const lastTransaction = new Date(
        Math.max.apply(Math, collectionFilttred
        .filter( transaction => transaction.type === type)
        .map( transaction  => new Date(transaction.date).getTime())));
        
        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`
    }

    async function loadTransaction() {
        const dataKey = `@gofinances:transactions_user=${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesToTal = 0;
        let expensiveTotal = 0;

        const transactionFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
            if (item.type === 'positive'){
                entriesToTal += Number(item.amount);
            }else{
                expensiveTotal +=Number(item.amount);
            }

            
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

        setTransaction(transactionFormatted);

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive') 
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
        const intervalTotal = lastTransactionExpensives === 0 ?  
        'Não há transações'
        : `01 á ${lastTransactionExpensives}`;
        const total = entriesToTal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesToTal.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionEntries === 0 ? 
                'Não há transações'
                : `Última entrada dia ${lastTransactionEntries}`, 
            },
            expensive: {
                amount: expensiveTotal.toLocaleString('pt-BR',{ 
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: lastTransactionExpensives === 0 ?
                'Não há transações'
                : `Última saída dia ${lastTransactionExpensives}`, 
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: intervalTotal,
            }
        });
        
        setIsLoading(false);
    }

    useEffect(() => {
        loadTransaction();
    },[]);

    useFocusEffect(useCallback(() => {
        loadTransaction();
    },[]));

    return(
        <Container>
            {
                isLoading ? 
                <LoadContainer>
                    <ActivityIndicator 
                        color={theme.colors.primary}
                        size="large"
                    />
                </LoadContainer> : 
                <>    
                    <Header>
                        <UserWapper>
                            <UserInfo>
                                <Photo source={ {uri: user.photo }}/>
                                <User>
                                    <UserGreeting>Olá, </UserGreeting>
                                    <UserName>{user.name}</UserName>
                                </User>
                            </UserInfo>
                            <LogoutButton onPress={signOut}>
                                <Icon name="power"/>
                            </LogoutButton>
                        </UserWapper>
                    </Header>
                    <HighlightCards>
                        <HighlightCard 
                            type="up"
                            title="Entradas"
                            amount={highlightData.entries.amount}
                            lastTransaction={highlightData.entries.lastTransaction}
                        />
                        <HighlightCard
                            type="down" 
                            title="Saídas"
                            amount={highlightData.expensive.amount}
                            lastTransaction={highlightData.expensive.lastTransaction}
                        />
                        <HighlightCard 
                            type="total"
                            title="Total"
                            amount={highlightData.total.amount}
                            lastTransaction={highlightData.total.lastTransaction}
                        />
                    </HighlightCards>
                    <Transaction>
                        <Title>Listagem</Title>
                            
                        <TransactionList 
                            data={transaction}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TransactionCard data={item} />}
                            showsVerticalScrollIndicator={false}
                        />
                    </Transaction>
                </>
            }
        </Container>
    );
}
