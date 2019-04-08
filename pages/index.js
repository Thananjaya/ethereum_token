import React, { Component } from 'react';
import Layout from './components/layout';
import ICOForm from './components/icoForm';
import Admin from './components/admin';
import { Header, Message, Icon, Progress} from 'semantic-ui-react';
import web3 from '../ethereum/web3/web3';
import instance from '../ethereum/web3/sangTokenSale';

class TokenSale extends Component {
    state = {
        amount: null,
        adminAccount: '',
        tokensold:'',
        tokensForSale: '',
        currentUserAccount: '',
        message: '',
    }

    async componentDidMount() {
        const currentUserAccount = await web3.eth.getAccounts();
        const adminAccount = await instance.methods.admin().call();
        const tokenPrice = await instance.methods.tokenPrice().call();
        const tokenSold = await instance.methods.tokensSold().call();
        const tokensForSale = await instance.methods.tokensForSale().call();
        this.setState({ 
            currentUserAccount, 
            adminAccount, 
            amount: web3.utils.fromWei(tokenPrice, 'ether'),
            tokenSold,
            tokensForSale
        });
    }

    setTotalTokens = async (totalTokens) => {
        this.setState({ message: '', ts_status: false });
        try{
            await instance.methods.setNumberOfTokensForSale(totalTokens).send({
                from: this.state.currentUserAccount[0],
            });
            return true
        } catch(err) {
            this.setState({ message: err.message });
            return false;
        }
    }

    setTokenPrice = async (declaredPrice) => {
        this.setState({ amount: declaredPrice, message: '' });
        try {
            await instance.methods.setTokenPrice(web3.utils.toWei(declaredPrice, 'ether')).send({
                from: this.state.currentUserAccount[0],
            });
            return true;
        } catch(err) {
            this.setState({ message: err.message });
            return false;
        }
    }

    renderMessage(){
        if(this.state.message) {
            return(
                <Message icon>
                    <Icon 
                        name='ethereum'
                    />
                    <Message.Content>
                        Your Account is 
                        <Message.Header>{this.state.message}</Message.Header>
                    </Message.Content>
                </Message> 
            )
        }
    }

    render(){
        const tokenPercentile = (this.state.tokenSold * 100)/this.state.tokensForSale
        console.log(tokenPercentile)
        return(
            <Layout>
                <Header size='medium'>Sang Token Initial Coin Offerings!!</Header>
                <Header size='small'>Token Costs {this.state.amount} in Ether!!</Header>
                { this.state.adminAccount === this.state.currentUserAccount[0] ? 
                    <Admin 
                        currentUserAccount={this.state.currentUserAccount[0]} 
                        adminAccount={this.state.adminAccount}
                        setToken={(tokenPrice) => this.setTokenPrice(tokenPrice)}
                        totalTokens = {(totalTokens) => this.setTotalTokens(totalTokens)}
                    />
                    :
                    <ICOForm />
                }
                <Progress 
                    percent={tokenPercentile} 
                    indicating
                />
                <Message icon>
                    <Icon 
                        name='ethereum'
                    />
                    <Message.Content>
                        Your Account is 
                        <Message.Header>{this.state.currentUserAccount[0]}</Message.Header>
                    </Message.Content>
                </Message>
                {this.renderMessage()}
            </Layout>
        )
    }
}
export default TokenSale;