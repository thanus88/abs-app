import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChoicePage } from './choice';
import { RssFeedPage } from '../rss-feed/rss-feed';

const routes: Routes = [
  {
    path: '',
    component: ChoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChoicePageRoutingModule { }
