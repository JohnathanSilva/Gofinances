import React from "react";

import { Container, Header, UserWapper, UserInfo, Photo, User, UserGreeting, UserName, Icon} from "./styles";

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
        </Container>
    );
}
