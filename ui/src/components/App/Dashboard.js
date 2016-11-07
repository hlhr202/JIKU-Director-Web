import React, { Component } from 'react'
import { Link } from 'react-router'
import { Progress, Card, Button, Dropdown, Input, Menu, Container, Grid, Image, Header, Icon, Divider, Segment } from 'semantic-ui-react'
import Nav from './Nav'

import DataCollection from '../Collection/DataCollection'

import './App.css'
import './Dashboard.css'
export class Upload extends Component{
	componentDidMount(){
		DataCollection.getCollections().then((response)=>{
			let collections = []
			response.map((collection)=>{
				return collections.push({text:collection.name, value:collection.id})
			})

			this.setState({collections:collections})
			this.refs.collection.setValue(this.state.collections[0].value)
			this.setState({selected:this.refs.collection.state})
		})

		this.refs.collection.handleClose=this.selectionClose
		
	}
	state={
		files:{},
		collections:[],
		selected:{},
	}
	
	handleFileDrop = (files, event) => {
		console.log(files)
	}

	handleFiles = () => {
		let fileListObj = this.refs.inputFile.files

		if (!fileListObj.length || fileListObj.length===0) return

		this.setState({files:fileListObj})

		console.log(fileListObj)
	}

	openUploadDialog = () => {
		this.refs.inputFile.click()
	}

	getFilePath = (file)=>{
		return URL.createObjectURL(file)
	}

	selectionClose = (event) => {
		console.log(this.refs.collection)
		console.log(this.refs.collection.state)
		this.setState({selected:this.refs.collection.state})
	}

	render(){
		
		const {files, collections, selected} = this.state
		console.log(collections)

		
		var dummy = []
		for (var i=0; i < files.length; i++) {
			if (files[i].type!=='video/mp4'){
				alert("Input File Type Not Acceptable")
				break
			}
			dummy.push(
					<Card key={i}>
						<Card.Content>
							<video controls type='video/mp4' style={{maxWidth:'100%'}} src={this.getFilePath(this.state.files[i])}></video>
							<Card.Description>
							{this.state.files[i].name}
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Progress percent={10} size='tiny'></Progress>
						</Card.Content>
					</Card>
			)
		}
		return (
			<Grid>
				<Grid.Row columns={2}>
					<input hidden='true' accept="video/mp4" name='file' ref='inputFile' type='file' multiple onFocus={ this.handleFiles } />
					
					<Grid.Column>
						<Input action>
							<Dropdown placeholder='Collection Name' ref='collection' search selection options={collections} />
							<Button disabled={Number.isInteger(selected.selectedIndex)?true:false} primary>Create</Button>
						</Input>
					</Grid.Column>

					<Grid.Column textAlign='right'>
						<Button primary onClick={this.openUploadDialog}>Choose Files</Button>
					</Grid.Column>
					
				</Grid.Row>
				<Grid.Row columns={1}>
					<Grid.Column>
						<Segment className='file-zone'>
								<Card.Group itemsPerRow={2} style={{'overflow':'auto', 'maxHeight':'600px', 'minHeight':'600px', 'padding':'14px'}}>
									{dummy}
								</Card.Group>
							
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

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
								<Menu.Item name='friends' as='span' active={ activeItem === 'friends' } onClick={ this.handleItemClick } />
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