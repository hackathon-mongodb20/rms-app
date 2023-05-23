package io.rms.app.rest;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.rms.app.dto.ResultDTO;
import io.rms.app.service.RmsLocationsService;
import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@RestController
@RequestMapping("/api/rms/locations")
@Slf4j
public class RmsLocationsController {

	@Autowired
	RmsLocationsService locationsService;
	
	@GetMapping("/atlas_search/{text}")
	public ResponseEntity<ResultDTO<List<Document>>> atlasSearch( @PathVariable String text ) {
		ResponseEntity<ResultDTO<List<Document>>> response = null;
		try {
			ResultDTO<List<Document>> dto = this.locationsService.atlasSearch( text );
			response = new ResponseEntity<>( dto, HttpStatus.OK);
		} catch (Exception e) {
			log.error( "Error : "+e, e );
			response = new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	@GetMapping("/details/{name}")
	public ResponseEntity<ResultDTO<Document>> details( @PathVariable String name ) {
		ResponseEntity<ResultDTO<Document>> response = null;
		try {
			ResultDTO<Document> dto = this.locationsService.details( name );
			response = new ResponseEntity<>( dto, HttpStatus.OK);
		} catch (Exception e) {
			log.error( "Error : "+e, e );
			response = new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
}
