import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
//import { RSSParser } from 'rss-parser';

declare var RSSParser;
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  @ViewChild('targetUrl') targetUrl: string;
  session: any;
  model = {
    targetUrl : 'http://news.ch3thailand.com/rss/PoliticsNews.rss',
    result : {}
  }
  entries : Array<any> = [];

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    private iab: InAppBrowser
  ) {}
/*
  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    });
  }
*/
  ionViewWillEnter() {
    console.log('ionViewDidLoad RSSPage');

  }
  openUrl(entry){
      console.log('openUrl');
      this.iab.create(entry.link,"_system");

  }
  parseUrlWrapper(){
    console.log('parseUrlWrapper');
    let parser = new RSSParser();
    return new Promise((resolve,reject)=>{
      parser.parseURL(CORS_PROXY + this.model.targetUrl, function(err, parsed) {
          console.log(parsed);
          if(err){
            reject(err);
          }
          resolve(parsed);
      });
    });
  }
  parseUrl(){
    console.log('parseUrl');
    
    this.parseUrlWrapper().then((entries : any)=>{
        this.model.result = entries;
    })
    
  }

  favorite(entry){}

  share(entry){}

  unread(entry){}
}
