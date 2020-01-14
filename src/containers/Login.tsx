import React, { useState, FormEvent } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { RouteComponentProps } from 'react-router-dom';

import './Login.css';
import { AuthProps } from '../App';
import LoaderButton from '../components/LoaderButton';
import { useFormFields } from '../libs/hooksLib';

interface LoginProps extends RouteComponentProps, AuthProps { }

const Login: React.FC<LoginProps> = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: ''
    });

    const validateForm = () => {
        return fields.email.length > 0 && fields.password.length > 0;
    }
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.signIn(fields.email, fields.password);
            props.userHasAuthenticated(true);
        } catch (e) {
            alert(e.message || "Error");
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={fields.password}
                        onChange={handleFieldChange}
                        type="password"
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Login
                </LoaderButton>
            </form>
        </div>
    );
}

export default Login;