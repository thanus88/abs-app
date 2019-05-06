import { Component, Renderer2, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { MapPlaceService } from '../../providers/MapPlaceService';
import {_} from 'underscore';
import { MapsPlaceData } from '../../interfaces/places';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  @ViewChild('searchPlaceText') searchPlaceText: ElementRef;
  @ViewChild('searchPlaceBar') searchPlaceBar: ElementRef;
  @ViewChild('ionSearchBar') ionSearchBar: ElementRef;
  searchCountryString = '';
  autocomplete : any;
  address : any;

  constructor(
    public mapPlaceService: MapPlaceService,
    public confData: ConferenceData,
    public platform: Platform,
    private renderer: Renderer2
  ) {
    
  }
/*
  ionViewLoaded() {
    let elem = <HTMLInputElement>document.getElementsByClassName('searchbar-input')[0];
    this.autocomplete = new google.maps.places.Autocomplete(elem);
  }
*/
  ionViewDidEnter() {

    //ngAfterViewInit() {
  
    
    this.confData.getMap().subscribe((mapData: any) => {
      const mapEle = this.mapElement.nativeElement;

      const map = new google.maps.Map(mapEle, {
        center: mapData.find((d: any) => d.center),
        zoom: 16,
        mapTypeId: 'roadmap'
      });

      mapData.forEach((markerData: any) => {
        const infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        const marker = new google.maps.Marker({
          position: markerData,
          map,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      google.maps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });

      let options = {componentRestrictions: {country: 'th'}};
      

      // Create the search box and link it to the UI element.
        //const input = this.searchPlaceText.nativeElement;
        //let input = <HTMLInputElement>document.getElementsByClassName('searchbar-ion')[0];
        //let input = <HTMLInputElement> document.getElementById('ionSearchBar');
        //const searchBox = new google.maps.places.SearchBox(input);
        const searchBox = new google.maps.places.AutocompleteService(this.searchPlaceText.nativeElement, options);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBox);
        const root = this;
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', () => {
          searchBox.setBounds(map.getBounds());
        });

        let markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces();
          
          if (places.length == 0) {
            return;
          }
          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          let bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            let icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
            // Call service hear
            //------------------------------
            console.log(place);
            let mapsPlaceData = new MapsPlaceData();
            _.extend(mapsPlaceData, place),
            mapsPlaceData.photos_json = JSON.stringify(_.isEmpty(place.photos) ? place.photos : place.photos[0]);
            mapsPlaceData.photos = JSON.stringify(_.isEmpty(place.photos) ? place.photos : place.photos[0].html_attributions[0]);
            mapsPlaceData.reviews_json = JSON.stringify(_.isEmpty(place.reviews) ? place.reviews : place.reviews[0]);
            mapsPlaceData.types_json = JSON.stringify(_.isEmpty(place.types) ? place.types : place.types[0]);
            if(_.isObject(place.geometry)){
              mapsPlaceData.geometry_json = JSON.stringify(_.isObject(place.geometry) ? place.geometry : {});
              if(place.geometry.location){
                mapsPlaceData.lat = place.geometry.location.lat();
                mapsPlaceData.lng = place.geometry.location.lng();
              }
            }
            mapsPlaceData.source_id = place.id;
            root.mapPlaceService.save(mapsPlaceData).subscribe(
              res => {
                console.log(res);
              },
              err => {
                  console.error(err);
              }
            );
          //------------------------------
          });
          map.fitBounds(bounds);
        }) ;

    });
  }
/*
  initailMap() {

        //const mapEle = document.getElementById('mapCanvas');
        const mapEle = this.mapElement.nativeElement;
        const map = new google.maps.Map(mapEle, {
          center: {lat: 43.071584, lng: -89.380120},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        const input = this.searchPlaceText.nativeElement;
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        const root = this;
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', () => {
          searchBox.setBounds(map.getBounds());
        });

        let markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces();
          
          if (places.length == 0) {
            return;
          }
          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          let bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            let icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
            // Call service hear
            //------------------------------
            let mapsPlaceData : any;
            _.extend(mapsPlaceData, place),
            mapsPlaceData.photos_json = JSON.stringify(_.isEmpty(place.photos) ? place.photos : place.photos[0]); 
            mapsPlaceData.reviews_json = JSON.stringify(_.isEmpty(place.reviews) ? place.reviews : place.reviews[0]);
            mapsPlaceData.types_json = JSON.stringify(_.isEmpty(place.types) ? place.types : place.types[0]);
            if(_.isObject(place.geometry)){
              mapsPlaceData.geometry_json = JSON.stringify(_.isObject(place.geometry) ? place.geometry : {});
              if(place.geometry.location){
                mapsPlaceData.lat = place.geometry.location.lat();
                mapsPlaceData.lng = place.geometry.location.lng();
              }
            }
            mapsPlaceData.source_id = place.id;
            root.mapPlaceService.save(mapsPlaceData).subscribe(
              res => {
                console.log(res);
              },
              err => {
                  console.error(err);
              }
            );
          //------------------------------
          });
          map.fitBounds(bounds);
        }) ;
      }
*/
      getItems(searchbar) {
        // set q to the value of the searchbar
        var q = searchbar.target.value;

        // if the value is an empty string don't filter the items
        

        //this.searchPlaceText.nativeElement.value = q;
        this.renderer.setProperty(this.searchPlaceText.nativeElement, 'value', q);
        this.renderer.setProperty(this.searchPlaceText.nativeElement, 'focus', true);
      }
}
