import React, { Component } from 'react';
import { Card, Input, Button} from 'semantic-ui-react';


class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            totalTokens: null,
            loading: false
        }
    }

    setTokenConfig = async () => {
        this.setState({ loading: true });
        await this.props.totalTokens(this.state.totalTokens);
        await this.props.setToken(this.state.value);        
        this.setState({ loading: false });
    }

    render(){
        return(
            <Card centered>
                <Card.Header style={{margin: "15px"}}>Admin Config!</Card.Header>
                <Card.Content>
                    <Input 
                        icon="ethereum"
                        onChange={(event) => this.setState({ value: event.target.value })}
                        placeholder="enter the amount in ether" 
                    />
                    <Input 
                        icon="xing"
                        onChange={(event) => this.setState({ totalTokens: event.target.value })}
                        placeholder="total tokens for ICO" 
                        style={{marginTop: "25px"}}
                    />
                    <Button 
                        style={{marginTop: "25px"}}
                        onClick={() => this.setTokenConfig()}
                        loading={this.state.loading}
                    >
                        Proceed
                    </Button>
                </Card.Content>
            </Card>
        )
    }

}

export default Admin;