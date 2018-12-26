import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  result: Awsinfo;
  headers: string[];
  ip: Object;

  getResponse(): Observable<HttpResponse<Awsinfo>> {


    return this.http.get<Awsinfo>(
      '/dev/ip-collector-v1', {
        observe: 'response', headers: new HttpHeaders({
          'api_token': '2fdde7b21b6a4a4fb5fbe47475a36dcc',
          'Content-Type': 'application/json'
        })
      });
  }


  ngOnInit(): void {


    this.getResponse()
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.result = {...resp.body};
      });
  }


  constructor(private http: HttpClient) {
  }
}

class Awsinfo {
  sourceIp: string;
  serverIp: string;
}
