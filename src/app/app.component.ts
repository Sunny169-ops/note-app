import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {NotesService} from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('notesForm') notesForm:NgForm;

  title = 'note-app';

  editMode:boolean = false;

  editNotesId;

  data :any = [];

  constructor(private notes:NotesService ){
    

  }

  ngOnInit()
  {
     this.getData()
  }


  getData()
  {
    this.notes.getNotes().subscribe((result)=>{
      this.data = result

    })
  }

  onSubmit(userData)
  {
    const formData = {
      title:userData.value.title,
      description:userData.value.description
    }

    if(this.editMode){
      this.notes.updateNotes(this.editNotesId,formData).subscribe((result)=>{
        console.log(result),
        error => console.log(error)
        this.getData();
        this.editMode = false 
        
      })
      
    } else{
      
      this.notes.saveNotes(formData ).subscribe((result)=>{
        console.log(result),
        error => console.log(error)
        this.getData() 
        
      })
      
      }


    
  }


  deleteitem(id)
  {

    this.notes.deleteNotes(id).subscribe((result)=>{
      this.getData()  
    })
  }


  edititem(id, i)
  {
    this.editNotesId = id;
    this.editMode = true;
    this.notesForm.setValue({
      title:this.data[i].title,
      description:this.data[i].description
    })
  }

}
