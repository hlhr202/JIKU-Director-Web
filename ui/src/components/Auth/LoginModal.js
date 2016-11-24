import React, { Component } from 'react'
import validator from 'validator';

import { Divider, Modal, Header, Button, Icon, Form, Loader, Message } from 'semantic-ui-react'

class NotifyModal extends Component {
	state = {
		notifyOpen: false
	}
	openNotify = () => this.setState({
		notifyOpen: true
	})

	closeNotify = () => {
		this.setState({
			notifyOpen: false
		})
		this.props.onClose()
	}

	render() {
		const {notifyOpen} = this.state
		return (
			<Modal size='small' open={ notifyOpen } onOpen={ this.openNotify } onClose={ this.closeNotify }>
     <Modal.Header>Login Successful</Modal.Header>
     <Modal.Content>
       <Modal.Description>
         <Header>Welcome Back to JIKU Director</Header>
       </Modal.Description>
     </Modal.Content>
     <Modal.Actions>
       <Button color='black' onClick={ this.closeNotify }>
         Close
       </Button>
     </Modal.Actions>
   </Modal>
		)
	}
}

class LoginModal extends Component {
	state = {
		loginOpen: false,
		loading: false,
		email: '',
		emailError: false,
		password: '',
		passwordError: false,
		formError: false,
		formWarning: false,
		message:[]
	}

	openLogin = () => this.setState({
		loginOpen: true
	})

	closeLogin = () => {
		this.setState({
			email: ''
		})
		this.setState({
			emailError: false
		})
		this.setState({
			password: ''
		})
		this.setState({
			passwordError: false
		})
		this.setState({
			formError: false
		})
		this.setState({
			formWarning: false
		})
		this.setState({
			loginOpen: false
		})
		this.setState({
			loading: false
		})
	}

	handleSubmitClick = () => {
		this.refs.loginform.handleSubmit()
	}

	handleSubmit = () => {
		this.setLoading(true)
		if (!validator.isEmail(this.state.email)) {
			this.setState({message:['Check your email format.', 'Minimum password length is 8 characters',]})
			this.setState({
				formWarning: true
			})
			this.setState({
				emailError: true
			})
			this.setLoading(false)
			return
		} else if (!validator.isLength(this.state.password, {
				min: 8,
				max: 255
			})) {
			this.setState({message:['Check your email format.', 'Minimum password length is 8 characters',]})
			this.setState({
				formWarning: true
			})
			this.setState({
				passwordError: true
			})
			this.setLoading(false)
			return
		} else {
			this.props.onSubmit()
		}
	}

	setLoading = (toggle) => {
		this.setState({
			loading: toggle
		})
	}

	openNestedNotify = () => {
		this.refs.notify.openNotify()
	}

	emailChange = (event) => {
		this.setState({
			emailError: false
		})
		this.setState({
			email: event.target.value
		})
	}

	passwordChange = (event) => {
		this.setState({
			passwordError: false
		})
		this.setState({
			password: event.target.value
		})
	}

	setFormError = (error,toggle) => {
		if (error.status && error.status === 401) this.setState({message:[JSON.parse(error.responseText).error]})
		if (error.status && error.status === 500) this.setState({message:[error.statusText]})
		this.setState({
			formError: toggle
		})
	}

	dismissError = () => {
		this.setState({
			formError: false
		})
	}

	dismissWarning = () => {
		
		this.setState({
			formWarning: false
		})
	}
	render() {
		const {loginOpen, emailError, formError, formWarning, passwordError, message} = this.state
		return (
			<div>
     <Modal dimmer={ 'blurring' } open={ loginOpen } onClose={ this.closeLogin }>
       <Modal.Header>Login</Modal.Header>
       <Modal.Content>
         <Modal.Description>
           <Header>Welcome to Jiku Director</Header>
         </Modal.Description>
         <Divider/>
         <Form ref='loginform' onSubmit={ this.handleSubmit } error={ formError } warning={ formWarning }>
           <Message error onDismiss={ this.dismissError } header='Sorry, the login has been denied' list={ message } />
           <Message warning onDismiss={ this.dismissWarning } header='Sorry, please check your information' list={ message } />
           <Form.Field>
             <label>Email <span> (Required)</span></label>
             <Form.Input name='email' onChange={ this.emailChange } error={ emailError } placeholder='Email'></Form.Input>
           </Form.Field>
           <Form.Field>
             <label>Password <span> (Required)</span></label>
             <Form.Input name='password' type='password' onChange={ this.passwordChange } error={ passwordError } placeholder='Password'></Form.Input>
           </Form.Field>
         </Form>
       </Modal.Content>
       <Modal.Actions>
         <Button color='black' onClick={ this.closeLogin }>
           Close
         </Button>
         <Button positive icon labelPosition='right' onClick={ this.handleSubmitClick }>
           Login
           <Icon name='checkmark' />
         </Button>
       </Modal.Actions>
       <div className={ this.state.loading ? 'ui active dimmer' : 'ui' }>
         <Loader>Loading</Loader>
       </div>
       <NotifyModal ref='notify' onClose={ this.closeLogin }></NotifyModal>
     </Modal>
   </div>

		)
	}
}

export default LoginModal