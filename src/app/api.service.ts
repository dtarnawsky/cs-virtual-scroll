import { Injectable } from '@angular/core';
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor() { }

  public async getRegions(): Promise<Array<Region>> {
    // Return the cached result if we have it
    const cachedResult = localStorage['Regions'];
    if (cachedResult) {
      return JSON.parse(localStorage['Regions']);
    }

    const url = 'https://test.idrogeo.isprambiente.it/api/iffi/comuni';
    const response = await fetch(url);
    return this.processRegions(await response.json());
  }

  private processRegions(regions: Array<Region>): Array<Region> {
    // Sort countries by nome
    const result = regions.sort((a, b) => a.nome.localeCompare(b.nome));

    // Cache the value for use next time
    localStorage['Regions'] = JSON.stringify(result);
    return result;
  }
}
