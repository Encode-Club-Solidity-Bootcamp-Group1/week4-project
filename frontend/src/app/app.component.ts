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
  metaData = '';
  fileName = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const upload$ = this.http.get(`http://localhost:3000/files`)
    upload$.subscribe(
      {
        next: data => {
          this.metaData = JSON.stringify(data)
        },
        error: error => {
          this.metaData = JSON.stringify(error)
        }
      }
    )
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    if (file) {
      this.fileName = file.name
      const formData = new FormData()
      formData.append("file", file)
      const upload$ = this.http.post("http://localhost:3000/upload", formData)
      upload$.subscribe()
    }
  }
  onSubmitId() {
    console.log(this.id)
    console.log("Submit ID button clicked")
    if (this.id) {
      const upload$ = this.http.get(`http://localhost:3000/files/${this.id}`)
      upload$.subscribe(
        {
          next: data => {
            this.idData = JSON.stringify(data)
          },
          error: error => {
            this.idData = JSON.stringify(error)
          }
        }
      )
    }
  }
}
