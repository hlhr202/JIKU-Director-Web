import React, { Component } from 'react'
import { Progress, Card, Button, Dropdown, Input, Grid, Segment } from 'semantic-ui-react'

import DataCollection from '../Data/DataCollection'

import './App.css'
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
		console.log(this.state.selected);
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
		console.log(this.state.selected)
		if (!Number.isInteger(this.state.selected.value)||(this.state.selected.selectedIndex!==0 && !this.state.selected.selectedIndex)){
			alert('You have not selected any collection to upload')
			return
		}
		for (let i=0;i<this.state.files.length;i++){
			let formData = new FormData()
			formData.append('video',this.state.files[i])

			console.log(formData)

			let xhr = new XMLHttpRequest();
			
			
			xhr.open('POST','http://localhost:8000/api/upload?collection='+this.state.selected.value+'&token=' + localStorage.getItem('token'),true)
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
							<Button disabled={selected.searchQuery?false:true} onClick={this.createCollection} primary>Create</Button>
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