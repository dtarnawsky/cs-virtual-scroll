import { Component, OnInit } from '@angular/core';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { ApiService } from '../api.service';
import { Region } from '../region';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  regions: Array<Region> = [];
  regionList: Array<Region> = [];
  loading = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    try {
      this.loading = true;
      this.regionList = await this.apiService.getRegions();
      this.search(undefined);      
    } finally {
      this.loading = false;
    }
  }

  search(event: any) {
    const query = event?.target.value?.toLowerCase();
    this.regions = this.regionList.filter(country => !query || country.nome.toLowerCase().indexOf(query) > -1);
  } 

  trackByRegions(index: number, item: Region) {
    return item.uid;
  }

}
