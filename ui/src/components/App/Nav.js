import React, { Component } from 'react'
import SignupModal from '../Auth/SignupModal'
import LoginModal from '../Auth/LoginModal'
import Auth from '../Auth/Auth'
import { Link } from 'react-router'

import './App.css'
import { Container, Menu } from 'semantic-ui-react'
import $ from 'jquery'

class Nav extends Component{
	state = {
		isLogin: false,
		name: ''
	}

	componentDidMount() {
		let self = this
		Auth.ensureAuth().then((user) => {
			self.setState({
				isLogin: true
			})
			self.setState({
				name: user.name
			})
			console.log('Welcom, ' + user.name)
		}).catch(() => {
			console.log('Welcom')
		})
	}

	logout = () => {
		localStorage.setItem('token', null)
		this.setState({
			isLogin: false
		})
		this.setState({
			name: ''
		})
	}

	openSignup = () => {

		this.refs.signupModal.openSignup()

	}

	openLogin = () => {
		this.refs.loginModal.openLogin()
	}

	handleLogin = () => {
		let self = this
		let data = {
			email: this.refs.loginModal.state.email,
			password: this.refs.loginModal.state.password
		}
		Auth.login(data).then((result) => {
			if (result) {
				this.refs.loginModal.openNestedNotify();
				self.componentDidMount()
				console.log(result)
			}

		}).catch((error) => {
			this.refs.loginModal.setFormError(error,true)
			this.refs.loginModal.setLoading(false)
		})
	}

	handleSignup = () => {

		let data = {
			name: this.refs.signupModal.state.name,
			email: this.refs.signupModal.state.email,
			password: this.refs.signupModal.state.password
		}

		let post = $.ajax({
			type: 'POST',
			dataType: 'json',
			url: 'http://localhost:8000/api/registry',
			crossDomain: true,
			data: JSON.stringify(data),
		})

		post.done((response) => {
			if (response.token) {
				localStorage.setItem('token', response.token)
				this.refs.signupModal.openNestedNotify();
			}
			if (response.error) {
				switch (response.error) {
					case 'email_existed':
						this.refs.signupModal.setFormError(true)
						this.refs.signupModal.setLoading(false)
						console.log(response.error)
						break
					case 'input_not_acceptable':
						this.refs.signupModal.setFormError(true)
						this.refs.signupModal.setLoading(false)
						console.log(response.error)
						break
					case 'invalid_credentials':
						console.log(response.error)
						break
					case 'could_not_create_token':
						console.log(response.error)
						break
					default:
						console.log('unknown error')
				}
			}
		})
	}

	render(){
		return (
			<nav>
				<Menu className='fixed inverted'>
					<Container>
						<Link to='/' className='header'><Menu.Item>
												JIKU DIRECTOR
												</Menu.Item></Link>
						{ this.state.isLogin ? null : <Menu.Item position='right' name='Signup' onClick={ this.openSignup } /> }
						{ this.state.isLogin ? null : <Menu.Item name='Login' onClick={ this.openLogin } /> }
						{ this.state.isLogin ? <Menu.Item position='right' name={ 'Welcom, ' + this.state.name } /> : null }
						{ this.state.isLogin ? <Link to='/dashboard'><Menu.Item>
												Dashboard
												</Menu.Item></Link> : null }
						{ this.state.isLogin ? <Menu.Item name='Logout' onClick={ this.logout } /> : null }
					</Container>
				</Menu>
				<SignupModal ref='signupModal' onSubmit={ this.handleSignup } />
				<LoginModal ref='loginModal' onSubmit={ this.handleLogin } />
			</nav>
		)
	}
}

export default Nav