import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RssFeedPage } from './rss-feed';
import { RssFeedPageRoutingModule } from './rss-feed-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RssFeedPageRoutingModule
  ],
  declarations: [
    RssFeedPage,
  ],
  entryComponents: [],
  bootstrap: [RssFeedPage]
})
export class RssFeedModule { }
