import React, { Component } from 'react';
import Layout from './components/layout';
import ICOForm from './components/icoForm';
import { Header, Message, Icon} from 'semantic-ui-react';
import web3 from '../ethereum/web3/web3';

class TokenSale extends Component {
    state = {
        amount: 0.01,
        account: '',
        loading: false
    }

    async componentDidMount() {
        const account = await web3.eth.getAccounts();
        this.setState({ account });
    }

    render(){
        return(
            <Layout>
                <Header size='medium'>Sang Token Initial Coin Offerings!!</Header>
                <Header size='small'>Token Costs {this.state.amount} in Ether!!</Header>
                <ICOForm />
                <Message icon>
                    <Icon name='ethereum' />
                    <Message.Content>
                        Your Account is 
                        <Message.Header>{this.state.account[0]}</Message.Header>
                    </Message.Content>
                </Message>
            </Layout>
        )
    }
}
export default TokenSale;