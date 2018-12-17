import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
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
      '/dev/ip-collector', {observe: 'response'});
  }


  ngOnInit(): void {

    this.http.get('/dev/ip-collector').subscribe((ipOfNetwork) => {
      this.ip = ipOfNetwork;
    });
    this.getResponse()
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.result = {...resp.body};
      });
    ;
  }


  constructor(private http: HttpClient) {
  }
}

class Awsinfo {
  sourceIp: string;
  serverIp: string;
}
