import React, { Component } from 'react'
import { Link } from 'react-router'
import { Menu, Container, Grid, Image, Header, Icon, Divider } from 'semantic-ui-react'
import Nav from './Nav'

import './App.css'

export class Guide extends Component{
	render(){
		return (
			<Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
		)
	}
}

export class Dashboard extends Component {
	componentDidMount(){
		if (this.props.location.pathname.split('/').pop() === 'upload'){
			this.setState({activeItem: 'upload'})
		}
		if (this.props.location.pathname.split('/').pop() === 'process'){
			this.setState({activeItem: 'process'})
		}
	}
	state = {
		activeItem: 'guide'
	}

	handleItemClick = (e, {name}) => this.setState({
		activeItem: name
	})

	render() {
		const {activeItem} = this.state
		return (
			<div>
				<Nav />
				<Container className='main-content'>
					<Header as='h2' textAlign='right'>
						<Icon name='dashboard' />
						<Header.Content>
							JIKU DIRECTOR
						<Header.Subheader>
							Dashboard
						</Header.Subheader>
						</Header.Content>
					</Header>
					<Divider/>
					<Grid>
						<Grid.Column width={ 4 }>
							<Menu vertical fluid>
								<Menu.Item name='guide' as={Link} active={ activeItem === 'guide' } onClick={ this.handleItemClick } to='/dashboard' >Guide</Menu.Item>
								<Menu.Item name='upload' as={Link} to='/dashboard/upload' active={ activeItem === 'upload' } onClick={ this.handleItemClick } >Upload</Menu.Item>
								<Menu.Item name='process' as={Link} to='/dashboard/process' active={ activeItem === 'process' } onClick={ this.handleItemClick } />
							</Menu>
						</Grid.Column>
						<Grid.Column width={ 12 }>
							{ this.props.children }
						</Grid.Column>
					</Grid>					
				</Container>
			</div>
		)
	}
}