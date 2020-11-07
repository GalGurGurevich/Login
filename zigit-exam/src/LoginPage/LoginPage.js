import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { Container, Row, Button, Spinner, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPassword, setUserName, setToken } from '../redux/actions/action';

function LoginPage(props) {
  
    const [disabled, setDisabled] = useState(true);
    const [counter, SetCounter] = useState(0);
    const [error, setError] = useState(null);
    const [showSpinner, SetShowSpinner] = useState(false);
    const validFields = 2;
    const URL = 'https://private-052d6-testapi4528.apiary-mock.com/authenticate';
    console.log("PROPS", props)

    useEffect(() => {
        if (counter >= validFields) {
            setDisabled(false);
            SetCounter(0);
        }
    }, [counter]);

    function validate(password) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (pattern.test(password)) {
            SetCounter(counter => counter + 1);
            props.setPassword(password);
        } else {
            setDisabled(true);
        }
    }

    function validateEmail(email) {
        const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (pattern.test(email)) {
            SetCounter(counter + 1);
            props.setUserName(email);
            setError(false);
        } else {
            setError(true);
            setDisabled(true);
        }
    }

    async function validateUser() {
        SetShowSpinner(true);
        const user = {
            username: props.userName,
            password: props.password,
        };
        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify({ User: user }),
        });
        const result = await response.json();
        props.setToken(result.token);
        SetShowSpinner(false);
    }

    return (
        <Container className='login-container'>
            <Row className='login-header-row'>WELCOME TO LOGIN MATE</Row>
            <Row className='login-input-row'>
                <FormGroup>
                    <Label for='exampleEmail'>Email</Label>
                    <Input
                        onChange={e => validateEmail(e.target.value)}
                        type='email'
                        name='email'
                        id='exampleEmail'
                        placeholder='example: address@mail.com'
                    />
                    <span className={`error-span${error ? ' Ok' : ''}`}>email must be in format: aaa@mail.com</span>
                </FormGroup>
                <FormGroup>
                    <Label for='examplePassword'>Password</Label>
                    <Input
                        onChange={e => validate(e.target.value)}
                        type='password'
                        name='password'
                        id='examplePassword'
                        placeholder='your password'
                    />
                </FormGroup>
            </Row>
            <Row className='btn-row'>
                <Button onClick={() => validateUser()} outline color='primary' disabled={disabled}>
                    Submit
                </Button>{' '}
            </Row>
            <Spinner className={`spinner${showSpinner ? ' Ok' : ''}`} color='primary' />
        </Container>
    );
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setPassword: setPassword,
            setUserName: setUserName,
            setToken: setToken,
        },
        dispatch,
    );
}

function mapStateToProps(state) {
    return {
        userName: state.login.userName,
        password: state.login.password,
        token: state.login.token,
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginPage);
