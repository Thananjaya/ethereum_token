import React, { Component } from 'react';
import { Form, Message, Icon } from 'semantic-ui-react';
import web3 from '../../ethereum/web3/web3';
import instance from '../../ethereum/web3/sangTokenSale';

class ICOForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            message: null,
            loading: false
        }
    }

    purchaseToken = async () => {
        const totalAmount = this.props.tokenPrice * this.state.value
        this.setState({ loading: true, message: null });
        try {
            await instance.methods.buyTokens(this.state.value).send({
                from: this.props.currentUserAccount[0],
                value: web3.utils.toWei(String(totalAmount), 'ether')
            });
            this.props.success();
        } catch(error) {
            this.setState({ message: error.message })
        }
        this.setState({ loading: false, value: '' });
    }

    render(){
        return(
            <div>
                <Form>
                    <Form.Group>
                        <Form.Input 
                            placeholder="Get your tokens!!"
                            onChange={(event) => this.setState({value: event.target.value})}
                            value={this.state.value}
                            type="number"
                            width={14} 
                        />
                        <Form.Button 
                            type="submit"
                            content="Purchase"
                            onClick={() => this.purchaseToken()}
                            loading= {this.state.loading}
                        />
                    </Form.Group>    
                </Form>
                { this.state.message !== null ? 
                    <Message icon warning>
                        <Icon 
                            name='ethereum'
                        />
                        <Message.Content>
                            Error been detected
                            <Message.Header>{this.state.message}</Message.Header>
                        </Message.Content>
                    </Message>
                    : null
                } 
            </div>    
        )
    }
}

export default ICOForm;