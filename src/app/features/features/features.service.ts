import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FeaturesService {
  constructor(private http: HttpClient) {}
  usersApiUrl: string = 'https://dummyapi.io/data/v1/user';

  getUsersData(pageNo: number) {
    return this.http.get(`${this.usersApiUrl}?limit=10&page=${pageNo}`);
  }

  createContact(contactData) {
    return this.http.post(`${this.usersApiUrl}/create`, contactData);
  }
  deleteContact(contactData: any) {
    return this.http.delete(`${this.usersApiUrl}/${contactData.id}`);
  }
}
