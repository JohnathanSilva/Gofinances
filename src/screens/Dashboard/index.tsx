import React from "react";
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
    const data: DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: "Desenvolvimento de site", 
            amount:"R$ 12.000,00" ,
            category:{
                icon: 'dollar-sign',
                name: 'Vendas',
            },
            date: "05/04/2022",
        },
        {   
            id: '2',
            type: 'negative',
            title: "Hamburgueria Pizzy", 
            amount:"R$ 59,00" ,
            category:{
                icon: 'coffee',
                name: 'Alimentação',
            },
            date: "05/04/2022",
        },
        {   
            id: '3',
            type: 'negative',
            title: "Aluguel do apartamento", 
            amount:"R$ 1.200,00" ,
            category:{
                icon: 'shopping-bag',
                name: 'Alugel',
            },
            date: "05/04/2022",
        },
    ];

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
                        renderItem={({ item }:{item : DataListProps}) => <TransactionCard data={ item } />}
                        Extractor={({ item}:{item: DataListProps})  => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </Transaction>
        </Container>
    );
}
