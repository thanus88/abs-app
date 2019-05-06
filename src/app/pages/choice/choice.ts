import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MapPlaceService } from '../../providers/MapPlaceService';
import { List } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html',
  styleUrls: ['./choice.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChoicePage {
  pet: string = "puppies";
  places : any;
  model : {
    choiceTypes : [
        {
          code : '001',
          descEn : 'News',
          descTh : 'ข่าว',
          types : [
            'ข่าวการเมือง','ข่าวบันเทิง','ข่าวเศรษฐกิจ', 'ข่าวอาชญากรรม'
          ]
        }
      ]
  }

  constructor(
    public mapPlaceService: MapPlaceService,
    public router: Router
    ) {
      //this.initail();
      console.log(this.places);
     }

  async initail() {
    return this.mapPlaceService.getAll().subscribe(resp => {
          // display its headers
          console.log(resp._embedded);
          this.places = resp._embedded.Places.map(plc => {
              plc.photos_json = JSON.parse(plc.photos_json);
              return plc;
          });
         return this.places;
        });
  }
  
  onRssFeed() {  //  Re Direct TO Signup page.
    this.router.navigateByUrl('/app/tabs/(rss-feed:rss-feed)');
  }
}
