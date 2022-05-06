import React from "react";
import { HistoryCard } from "../../components/HistoryCard";

import { Container, Header, Title, Form} from "./styles";

export function Resume(){
    return(
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            <Form>
                <HistoryCard 
                    title="Casa"
                    amount="R$ 1.500,00"
                    color="black"
                />
                <HistoryCard 
                    title="Carro"
                    amount="R$ 1.500,00"
                    color="green"
                />
                <HistoryCard 
                    title="Livros"
                    amount="R$ 1.500,00"
                    color="blue"
                />
                <HistoryCard 
                    title="Jogos"
                    amount="R$ 1.500,00"
                    color="red"
                />
            </Form>
        </Container>
    );
}