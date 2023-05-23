import React, { Component, Fragment } from 'react';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from "react-router-dom";

import Home from './app/Home';
import Source from './app/Source';
import { Button, Grid } from "@mui/material";

const homepage = '/rms-app/home';

class Photobook extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		
		return (
			<Router>
				<div className="App">

					<Grid container spacing={4} columns={{ xs: 16 }}>
					  <Grid item xs={4}><Link to={homepage}><Button color="primary">Home</Button></Link></Grid>
					  <Grid item xs={4}><Link to={homepage + "/info"}><Button color="primary">Informazioni</Button></Link></Grid>
					</Grid>
					<Routes>
					    <Route path={homepage + "/info"} element={<Source/>} />
						<Route path="*" element={<Home />} />
					</Routes>

				</div>
			</Router>
		);
	}

}

export default Photobook;