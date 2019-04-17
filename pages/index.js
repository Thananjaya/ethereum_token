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
        message: null,
        adminAccount: '',
        tokensSold:'',
        tokensForSale: '',
        currentUserAccount: '',
    }

    async componentDidMount() {
        const currentUserAccount = await web3.eth.getAccounts();
        const adminAccount = await instance.methods.admin().call();
        this.setState({
            currentUserAccount, 
            adminAccount
        })
        this.getTokenInformation();    
    }

    getTokenInformation = async ()  => {
        const tokensSold = await instance.methods.tokensSold().call();
        const tokensForSale = await instance.methods.tokensForSale().call();
        const tokenPrice = await instance.methods.tokenPrice().call();
        this.setState({ 
            tokensSold,
            tokensForSale,
            amount: web3.utils.fromWei(tokenPrice, 'ether')
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

    renderMessage = (message) => {
        if(message !== null) {
            return(
                <Message icon warning>
                    <Icon 
                        name='ethereum'
                    />
                    <Message.Content>
                        Error been detected
                        <Message.Header>{message}</Message.Header>
                    </Message.Content>
                </Message> 
            )
        }
    }

    render(){
        const tokenPercentile = 25;
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
                    <ICOForm 
                        currentUserAccount = {this.state.currentUserAccount}
                        tokenPrice = {this.state.amount}
                        success={() => this.getTokenInformation()}
                    />
                }
                <Progress 
                    percent={tokenPercentile}
                    progress 
                    indicating
                >
                Total tokens sold {this.state.tokensSold} / {this.state.tokensForSale}
                </Progress>
                <Message icon>
                    <Icon 
                        name='ethereum'
                    />
                    <Message.Content>
                        Your Account is 
                        <Message.Header>{this.state.currentUserAccount[0]}</Message.Header>
                        <p>For your kind notice, Sang Token is been deployed on Rinkeby Test Network!!</p>
                    </Message.Content>
                </Message>
                {this.renderMessage(this.state.message)}
            </Layout>
        )
    }
}
export default TokenSale;