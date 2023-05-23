package io.rms.app.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

import io.rms.app.dto.ResultDTO;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RmsLocationsService {

    @Autowired
    MongoTemplate mongoTemplate;
	
    private static final String COLLECTION_NAME = "Locations";
    
    /*
     *  aggregation :
[
  {
    $search:
      {
        index: "Locations_Search_Index",
        text: {
          query: "CED",
          path: {
            wildcard: "*",
          },
        },
      },
  },
  {
    $set:
      {
        devices: {
          $ifNull: ["$devices", []],
        },
      },
  },
  {
    $set:
      {
        deviceNumber: {
          $size: "$devices",
        },
      },
  },
  {
    $project:
      {
        _id: 0,
        devices: 0,
      },
  },
]
     * 
     */
	public ResultDTO<List<Document>> atlasSearch( String text ) {
		List<Document> docs = new ArrayList<>();
		MongoCollection<Document> collection = mongoTemplate.getCollection( COLLECTION_NAME );
		// aggregation : atlas search		
		AggregateIterable<Document> result = collection.aggregate( 		
			Arrays.asList(new Document("$search", 
					new Document("index", "Locations_Search_Index")
				    	.append("text", new Document("query", text).append("path", 
				    				    new Document("wildcard", "*")))), 
				    				    new Document("$set", 
				    				    new Document("devices", 
				    				    new Document("$ifNull", Arrays.asList("$devices", Arrays.asList())))), 
				    				    new Document("$set", 
				    				    new Document("deviceNumber", 
				    				    new Document("$size", "$devices"))), 
				    				    new Document("$project", 
				    				    new Document("_id", 0L)
				    				            .append("devices", 0L))));
		MongoCursor<Document> cursor = result.iterator();
		while ( cursor.hasNext() ) {
			docs.add (cursor.next() );
		}
		log.info( "size -> {}", docs.size() );
		ResultDTO<List<Document>> dto = new ResultDTO<>( docs );
		return dto;
	}
	
	
	/*
	 * 
	[
	  {
	    $match:
	      {
	        name: "1H01",
	      },
	  },
	  {
	    $project:
	      {
	        _id: 0,
	      },
	  },
	]
	 * 
	 */
	public ResultDTO<Document> details( String name ) {
		Document doc = null;
		MongoCollection<Document> collection = mongoTemplate.getCollection( COLLECTION_NAME );
		// aggregation : details	
		AggregateIterable<Document> result = collection.aggregate( 		
				Arrays.asList(new Document("$match", 
					    new Document("name", name)), 
					    new Document("$project", 
					    new Document("_id", 0L))) );
		MongoCursor<Document> cursor = result.iterator();
		if ( cursor.hasNext() ) {
			doc = cursor.next();
		}
		ResultDTO<Document> dto = new ResultDTO<>( doc );
		return dto;
	}
	
}
