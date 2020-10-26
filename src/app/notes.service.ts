import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {


  getUrl = "http://localhost:4500/notes";
  url = "http://localhost:4500/note";
  

  constructor(private http: HttpClient) { }
  getNotes()
  {
    return this.http.get(this.getUrl)
  }

  saveNotes(userData)
  {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json')
    return this.http.post<any>(this.url, userData, {headers: httpHeaders})
  }

  deleteNotes(id)
  {
    
    return this.http.delete(`${this.url}/${id}`)
  }

  updateNotes(id, notesData)
  
  {
    return this.http.put<any>(`${this.url}/${id}`, notesData )
  }



}
