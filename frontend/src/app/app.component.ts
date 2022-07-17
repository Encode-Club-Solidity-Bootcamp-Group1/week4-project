import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  id = '';
  idData = '';
  title = 'frontend';
  error = '';
  metaData: any[] = [];
  fileName = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const baseURIRequest = this.http.get(`http://localhost:3000/nftcollect/baseURI`)
    baseURIRequest.subscribe({
      next: (baseURI) => {
        for (let i = 0; i < 10; i++) {
          const metaDataRequestURL = baseURI + "" + i;
          console.log(metaDataRequestURL);
          const metadataApi = this.http.get(metaDataRequestURL)
          metadataApi.subscribe(
            {
              next: (data) => {
                const imageUrl = (data as any).image.split("ipfs://")[1];
                const newImageUrl = `https://ipfs.io/ipfs/`+imageUrl;
                (data as any).image = newImageUrl;
                (data as any).metadata = JSON.stringify(data);
                console.log(data);
                this.metaData.push(data);
              }
            }
          )
        }
      }
    })
  }
}
