import React, { Component } from 'react'

import './App.css'

import Nav from './Nav'


export class App extends Component {

	render() {
		return (

			<div>
				<Nav/>
				<div className='main-content'>
					{ this.props.children }
				</div>
     
   			</div>
		)
	}
}

export class Home extends Component{
	render(){
		return <h3>Home</h3>
	}
}
