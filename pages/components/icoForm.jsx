import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class ICOForm extends Component {
    state={
        value: ''
    }

    getToken(){
        console.log('it is working', this.state.value);
    }

    render(){
        return(
            <Form>
                <Form.Field>
                    <input 
                        placeholder='Get your token'
                        onChange={(event) => this.setState({value: event.target.value})} 
                    />
                </Form.Field>
                <Button 
                    type="submit"
                    onClick={() => this.getToken()}
                >
                    Get it!
                </Button>
            </Form>    
        )
    }
}

export default ICOForm;