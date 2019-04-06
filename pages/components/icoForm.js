import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class ICOForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
        }
    }

    render(){
        return(
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
                        onClick={() => this.getToken()}
                    />
                </Form.Group>    
            </Form>    
        )
    }
}

export default ICOForm;