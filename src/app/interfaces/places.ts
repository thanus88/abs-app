export class MapsPlaceData {
    object_id: number;
    place_id: string;
	  lat: any;
	  lng : any;
    adr_address: string;
    formatted_address: string;
    formatted_phone_number: string;
    geometry_json: string;
    source_id: string;
    name: string;
    photos_json: string;
    vicinity: string;
    rating: any;
    types_json: string;
    reviews_json: string;
	url: string;
    created_by: string;
    created_date: Date;
	photos : any;
}

/*
place_id : "",
			address_components : "[GeocoderAddressComponent]",
			adr_address : "",
			aspects : "[PlaceAspectRating]",
			formatted_address : "",
			formatted_phone_number : "",
			geometry : "{PlaceGeometry}",
			html_attributions : "['','']",
			icon : "",
			international_phone_number : "",
			name : "",
			opening_hours : "{PlaceOpeningHours}",
			permanently_closed : false,
			photos : "[PlacePhoto]",
			plus_code : "{}",
			price_level : "0-4",
			rating : "1-5",
			reviews : "[{}]",
			types : "['','']",
			url : "",
			utc_offset : "",
			vicinity : "",
			website : ""
*/