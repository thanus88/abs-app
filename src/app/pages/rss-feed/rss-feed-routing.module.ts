import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RssFeedPage } from './rss-feed';

const routes: Routes = [
  {
    path: '',
    component: RssFeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RssFeedPageRoutingModule { }
