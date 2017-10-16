import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, ResponseContentType, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import { PDFResponse } from '../interfaces'

@Injectable()
export class GeneratePdfService {

  private endpoint = 'http://192.168.10.67:8080/Firma/pdfHTML.htm';

  constructor(private http: Http) {

  }

  getPDFFromHTML(html: string){
    let data = new URLSearchParams();
    data.append('html', html.toString());
    let body = data.toString();

    const headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded',
      // 'Accept': 'application/pdf'
      // 'Accept': 'application/octet-stream',
    });

    const options = new RequestOptions({
      headers: headers,
      responseType: ResponseContentType.ArrayBuffer
      // responseType: ResponseContentType.Blob
    });

    const url = this.endpoint;

    return this.http.post(url, body, options).map( (response: Response) => {
      return <PDFResponse<any>><any>response;
    });
  }

}
