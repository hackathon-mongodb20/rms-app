import React, { Component, Fragment } from 'react';

import appService from '../common/app-service';

import Link from '@mui/material/Link';
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
			details: null,
			searchResult: null
		}
	}

 	handleAtlasSearch = (event) => {
		if ( event.target.value.length >= 2 ) {
			  	var reactState = this;
				appService.doAjaxJson('GET', '/rms/locations/atlas_search/'+event.target.value, null).then(response => {
				if (response.success) {
					reactState.setState({
						searchResult: response.result,
						details: null,
						prevSearch:null
					})
				} else {
					reactState.setState({
						supportedExtensions: null
					})
				}
			})
		}
  	}
  	
 	handleDetails( name ) {
			  	var reactState = this;
				appService.doAjaxJson('GET', '/rms/locations/details/'+name, null).then(response => {
				if (response.success) {
					reactState.setState({
						prevSearch:this.state.searchResult,
						searchResult: null,
						details: response.result
					})
				} else {
					reactState.setState({
						supportedExtensions: null
					})
				}
			})
	};

 	handleBack() {
		 this.setState( {	
			searchResult: this.state.prevSearch,
			details: null		 
		 })
	};

	render() {
		let printList = '';
		if ( this.state.searchResult != null ) {
			let count = 0;
			let renderList = this.state.searchResult.content.map( (current) =>  
				 <Row key={count++} className="align-items-center viewport-height">
				 	 <Col><Link onClick={ () => this.handleDetails(current.name) }>{current.name}</Link></Col>
				     <Col>{current.building}</Col>
				     <Col>{current.deviceNumber}</Col>
				 </Row>
			)
			printList =  <Container fluid>
				 <Row  className="align-items-center viewport-height">
				 	 <Col>Stanza</Col>
				     <Col>Sede</Col>
				     <Col>Numero dispositivi</Col>
				 </Row>
			{renderList} 
			<Button variant="primary" disabled="true">Crea profili</Button>  
			</Container>
		} else if ( this.state.details != null ) {
			let count = 0;
			let renderList = this.state.details.content.devices.map( (current) =>  
				 <Row key={count++} className="align-items-center viewport-height">
				     <Col>{current.name}</Col>
				     <Col>{current.type}</Col>
				 </Row>
			)
			printList =  <Container fluid>
				<h3>{this.state.details.content.name} ({this.state.details.content.building})</h3>
			    <Button variant="primary" onClick={ () => this.handleBack() }>Indietro</Button> 
				<Row>
					<Col><b>Nome dispositivo</b></Col>
					<Col><b>Tipo dispositivo</b></Col>
				</Row>
				{renderList} 
				<Button variant="primary" disabled="true">Prenota</Button>  
			</Container>
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