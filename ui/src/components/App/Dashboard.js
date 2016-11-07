import React, { Component } from 'react'
import { Link } from 'react-router'
import { Progress, Card, Button, Dropdown, Input, Menu, Container, Grid, Image, Header, Icon, Divider, Segment } from 'semantic-ui-react'
import Nav from './Nav'
import $ from 'jquery'
import update from 'react-addons-update'

import DataCollection from '../Collection/DataCollection'

import './App.css'
import './Dashboard.css'
export class Upload extends Component{
	componentDidMount(){
		this.pullCollectionList()
		
	}
	state={
		files:{},
		collections:[],
		selected:{},
		progress:{},
	}

	pullCollectionList = () =>{
		DataCollection.getCollections().then((response)=>{
			let collections = []
			response.map((collection)=>{
				return collections.push({text:collection.name, value:collection.id})
			})

			this.setState({collections:collections})
			if (this.state.collections[0])	this.refs.collection.setValue(this.state.collections[this.state.collections.length-1].value)
			this.setState({selected:this.refs.collection.state})
		})

		this.refs.collection.handleClose=this.selectionClose
	}
	

	handleFiles = () => {
		let fileListObj = this.refs.inputFile.files

		if (!fileListObj.length || fileListObj.length===0) return

		this.setState({files:fileListObj})
		let progress = {}

		for (let i=0;i<fileListObj.length;i++){
			progress[i] = 0
		}
		this.setState({progress:progress})
	}

	openUploadDialog = () => {
		this.refs.inputFile.click()
	}

	

	selectionClose = (event) => {
		this.setState({selected:this.refs.collection.state})
	}

	createCollection = () => {
		let name = this.refs.collection.state.searchQuery
		DataCollection.pushCollections(name).then((response)=>{
			this.pullCollectionList()
		})
	}

	updateProgress = (count)=>{
		console.log(count)
		return (event)=>{
			let percent = (event.loaded / event.total)*100
			
			const progress = this.state.progress
			progress[count] = percent
			this.setState({progress:progress})
		}
	}

	upload = () => {
		for (let i=0;i<this.state.files.length;i++){
			let formData = new FormData()
			formData.append('video'+i,this.state.files[i])

			console.log(formData)

			let xhr = new XMLHttpRequest();
			
			
			xhr.open('POST','http://localhost:8000/api/upload?token=' + localStorage.getItem('token'),true)
			xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
			xhr.setRequestHeader('Access-Control-Aloow-Headers','*')
			xhr.upload.onprogress = this.updateProgress(i)
			xhr.send(formData)
		}
		
	}

	render(){
		
		const {files, collections, selected, progress} = this.state

		
		var videoCards = []
		for (var i=0; i < files.length; i++) {
			if (files[i].type!=='video/mp4'){
				alert("Input File Type Not Acceptable")
				break
			}
			videoCards.push(
					<Card key={i}>
						<Card.Content>
							<Card.Description>
							{this.state.files[i].name}
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Progress percent={progress[i]} size='tiny'></Progress>
						</Card.Content>
					</Card>
			)
		}
		return (
			<Grid>
				<Grid.Row columns={2}>
					<form id='upload' encType='multipart/form-data'>
						<input hidden='true' accept="video/mp4" name='file' ref='inputFile' type='file' multiple onChange={ this.handleFiles } />
					</form>
					<Grid.Column>
						<Input action>
							<Dropdown placeholder='Collection Name' ref='collection' search selection options={collections} />
							<Button disabled={Number.isInteger(selected.selectedIndex)?true:false} onClick={this.createCollection} primary>Create</Button>
						</Input>
					</Grid.Column>

					<Grid.Column textAlign='right'>
						<Button primary onClick={this.openUploadDialog}>Choose Files</Button>
					</Grid.Column>
					
				</Grid.Row>
				<Grid.Row columns={1}>
					<Grid.Column>
						<Segment className='file-zone' style={{'minHeight':'500px'}}>
								<Card.Group itemsPerRow={2} style={{'overflow':'auto', 'maxHeight':'500px', 'padding':'14px'}}>
									{videoCards}
								</Card.Group>
							
						</Segment>
						<Button primary onClick={this.upload}>Upload</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export class Video extends Component{
	getFilePath = (file)=>{
		return URL.createObjectURL(file)
	}

	shoudComponentUpdate(nextProps, nextState) {
		if (this.props.file.name !== nextProps.file.name){
			return true
		}
		return false
	}

	render(){
		return (
			<video controls type='video/mp4' style={{maxWidth:'100%'}} src={this.getFilePath(this.props.file)}></video>
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