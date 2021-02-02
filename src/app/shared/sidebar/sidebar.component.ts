import { Component } from '@angular/core';

import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private _gifsService: GifsService) { }

  get history(): string[] {
    return this._gifsService.history;
  }

  public search(query: string) {
    this._gifsService.searchGifs(query);
  }

}
