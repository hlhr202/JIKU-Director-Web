import React, { Component } from 'react'
import validator from 'validator';

import { Divider, Modal, Header, Button, Icon, Checkbox, Form, Loader, Message} from 'semantic-ui-react'

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
        <Modal.Header>Signup</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Thanks for your registration!</Header>
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

class SignupModal extends Component {
  state = {
    signupOpen: false,
    loading: false,
    email: '',
    emailError: false,
    name: '',
    nameError: false,
    password: '',
    passwordError: false,
    formError: false,
    formWarning: false
  }

  openSignup = () => this.setState({
    signupOpen: true
  })

  closeSignup = () => {
    this.setState({
      email: ''
    })
    this.setState({
      emailError: false
    })
    this.setState({
      name: ''
    })
    this.setState({
      nameError: false
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
      signupOpen: false
    })
    this.setState({
      loading: false
    })
  }

  handleSubmit = () => {
    this.setLoading(true)
    if (!validator.isEmail(this.state.email)) {
      this.setState({
        formWarning: true
      })
      this.setState({
        emailError: true
      })
      this.setLoading(false)
      return
    } else if (validator.isEmpty(this.state.name)) {
      this.setState({
        formWarning: true
      })
      this.setState({
        nameError: true
      })
      this.setLoading(false)
      return
    } else if (!validator.isLength(this.state.password, {
        min: 8,
        max: 255
      })) {
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

  nameChange = (event) => {
    this.setState({
      nameError: false
    })
    this.setState({
      name: event.target.value
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

  setFormError = (toggle) => {
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
    const {signupOpen, emailError, nameError, formError, formWarning, passwordError} = this.state
    return (
      <div>
        <Modal dimmer={ 'blurring' } open={ signupOpen } onClose={ this.closeSignup }>
          <Modal.Header>Signup</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Welcome to Jiku Director</Header>
            </Modal.Description>
            <Divider/>
            <Form error={ formError } warning={ formWarning }>
              <Message error onDismiss={ this.dismissError } header='Sorry, the registry has been denied' list={ [ 'That e-mail has been registered. Please change another one.', ] } />
              <Message warning onDismiss={ this.dismissWarning } header='Sorry, please check your information' list={ [ 'Check your email format.', 'Name is required', 'Minimum password length is 8 characters', ] } />
              <Form.Field>
                <label>Email <span> (Required)</span></label>
                <Form.Input onChange={ this.emailChange } error={ emailError } placeholder='Email'></Form.Input>
              </Form.Field>
              <Form.Field>
                <label>Name <span> (Required)</span></label>
                <Form.Input onChange={ this.nameChange } error={ nameError } placeholder='Name'></Form.Input>
              </Form.Field>
              <Form.Field>
                <label>Password <span> (Required)</span></label>
                <Form.Input type='password' onChange={ this.passwordChange } error={ passwordError } placeholder='Password'></Form.Input>
              </Form.Field>
              {/*
              <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
              </Form.Field>
              */}
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={ this.closeSignup }>
              Close
            </Button>
            <Button positive icon labelPosition='right' onClick={ this.handleSubmit }>
              Sign Me In
              <Icon name='checkmark' />
            </Button>
          </Modal.Actions>
          <div className={ this.state.loading ? 'ui active dimmer' : 'ui' }>
            <Loader>Loading</Loader>
          </div>
          <NotifyModal ref='notify' onClose={ this.closeSignup }></NotifyModal>
        </Modal>
      </div>

    )
  }
}

export default SignupModal