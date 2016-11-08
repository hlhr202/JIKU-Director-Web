import React, { Component } from 'react'
import DataVideo from '../Data/DataVideo'
import { Card, Button, Dropdown, Input, Grid, Segment } from 'semantic-ui-react'

import DataCollection from '../Data/DataCollection'

import './App.css'
export class Brightness extends Component{
	componentDidMount(){
		this.pullCollectionList()
		
	}
	state={
		videos:[],
		collections:[],
		selected:{},
	}

	pullVideoList = () => {
		var self = this
		if (Number.isInteger(this.state.selected.value)){
			DataVideo.getVideos(this.state.selected.value).then((videos)=>{
				self.setState({videos:videos})
			})
		}
		console.log(this.state.videos)
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
			this.pullVideoList();
		})

		this.refs.collection.handleClose=this.selectionClose
	}

	processBrightness = () => {
		var self = this
		if (Number.isInteger(this.state.selected.value)){
			DataVideo.processBrightness(this.state.selected.value).then((videos)=>{
			})
		}
	}

	selectionClose = (event) => {
		this.setState({selected:this.refs.collection.state})
		this.pullVideoList();
	}

	render(){
		
		const {videos, collections} = this.state

		
		var videoCards = []
		for (var i=0; i < videos.length; i++) {
			
			videoCards.push(
					<Card key={i}>
						<Card.Content>
							<Card.Description>
							{videos[i].name}
							</Card.Description>
						</Card.Content>
						
					</Card>
			)
		}
		return (
			<Grid>
				<Grid.Row columns={2}>
					<Grid.Column>
						<Input action>
							<Dropdown placeholder='Collection Name' ref='collection' selection options={collections} />
						</Input>
					</Grid.Column>

					<Grid.Column textAlign='right'>
					</Grid.Column>
					
				</Grid.Row>
				<Grid.Row columns={1}>
					<Grid.Column>
						<Segment className='file-zone' style={{'minHeight':'500px'}}>
								<Card.Group itemsPerRow={2} style={{'overflow':'auto', 'maxHeight':'500px', 'padding':'14px'}}>
									{videoCards}
								</Card.Group>
							
						</Segment>
						<Button primary onClick={this.processBrightness}>Process</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}