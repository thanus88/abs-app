import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChoicePage } from './choice';
import { ChoicePageRoutingModule } from './choice-routing.module';
//import { RssFeedModule } from '../rss-feed/rss-feed.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoicePageRoutingModule,
    //RssFeedModule
  ],
  declarations: [ChoicePage],
  entryComponents: [],
  bootstrap: [ChoicePage],
})
export class ChoiceModule {}
