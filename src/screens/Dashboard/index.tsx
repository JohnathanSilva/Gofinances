import React from "react";
import { HighlightCard } from "../../components/HighlightCard/";
import { TransactionCard } from "../../components/TransactionCard";

import { 
    Container, 
    Header, 
    UserWapper, 
    UserInfo, 
    Photo, 
    User, 
    UserGreeting, 
    UserName, 
    Icon, 
    HighlightCards, 
    Transaction, 
    Title
} from "./styles";

export function Dashboard(){
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
                    <Icon name="power"/>
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

                <TransactionCard />
            </Transaction>
        </Container>
    );
}
