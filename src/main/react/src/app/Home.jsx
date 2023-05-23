import React, { Component, Fragment } from 'react';

import appService from '../common/app-service';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			atlasSearch: null,
			searchResult: null
		}
	}

 	handleAtlasSearch = (event) => {
		if ( event.target.value.length >= 2 ) {
			  	var reactState = this;
				appService.doAjaxJson('GET', '/rms/locations/atlas_search/'+event.target.value, null).then(response => {
				if (response.success) {
					reactState.setState({
						searchResult: response.result
					})
				} else {
					reactState.setState({
						supportedExtensions: null
					})
				}
			})
		}
  	}

	render() {
		let printList = '';
		if ( this.state.searchResult != null ) {
			let count = 0;
			let renderList = this.state.searchResult.content.map( (current) =>  
				 <Row key={count++} className="align-items-center viewport-height">
				 	 <Col>{current.name}</Col>
				     <Col>{current.building}</Col>
				     <Col>{current.deviceNumber}</Col>
				 </Row>
			)
			printList =  <Container fluid>{renderList} </Container>
		}
		return <Fragment>
			<h1>Room Management System : App</h1>
			<TextField id="filled-basic" label="Inserisci almeno due caratteri..." variant="filled" onChange={this.handleAtlasSearch} />
			<br/>
			{printList}
		</Fragment>
	}

}

export default Home;