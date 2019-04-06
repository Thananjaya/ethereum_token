import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

export default () => {
    return(
        <div>
            <Header as='h2' icon style={{margin: "30px"}}>
                <Icon name="xing" circular />
                <Header.Content>Sang Token</Header.Content>
            </Header>
        </div>
    )
}