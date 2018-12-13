import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  result: Awsinfo;

  ngOnInit(): void {
    this.http.get<Awsinfo>('/api/default/awsassignment3demo').subscribe(value => this.result = value);
  }

  title = 'helloworld';

  constructor(private http: HttpClient) {
  }
}

class Awsinfo {
  sourceIp: string;
  remoteIp: string;
}
