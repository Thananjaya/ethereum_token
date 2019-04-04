import React, { Component } from 'react';
import Layout from './components/layout';
import ICOForm from './components/icoForm';
import { Header, Form} from 'semantic-ui-react';

class TokenSale extends Component {
    state = {
        amount: 0.01
    }

    render(){
        return(
            <Layout>
                <Header size='medium'>Sang Token Initial Coin Offerings!!</Header>
                <Header size='small'>Token Costs {this.state.amount} in Ether!!</Header>
                <ICOForm />
            </Layout>
        )
    }
}
export default TokenSale;