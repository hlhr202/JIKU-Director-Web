import React, { Component } from 'react'
import {Container, Segment} from 'semantic-ui-react'

import './App.css'

import Nav from './Nav'


export class App extends Component {

	render() {
		return (

			<div>
				<Nav/>
				<div>
					{ this.props.children }
				</div>
     
   			</div>
		)
	}
}

export class Home extends Component{
	render(){
		return(
			<Segment className='index-content'>
			<Container>
				<h1>Welcome to JIKU Director</h1>
			</Container>
			</Segment>
		) 
		
	}
}
