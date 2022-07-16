import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  fileName = '';

  constructor(private http: HttpClient) {}
  onFileSelected(event: any){
    const file:File = event.target.files[0]
    if(file){
      this.fileName = file.name
      const formData = new FormData()
      formData.append("file", file)
      const upload$ = this.http.post("http://localhost:3000/upload", formData)
      upload$.subscribe()
    }

  }
}
