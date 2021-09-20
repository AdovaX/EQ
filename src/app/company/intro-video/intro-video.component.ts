import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ListingManagerService} from '../../Services/listing-manager.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-intro-video',
  templateUrl: './intro-video.component.html',
  styleUrls: ['./intro-video.component.css']
})
export class IntroVideoComponent implements OnInit {
  Resource_id=0;
  fileName ="";
  name ="";
  disable_btn = true;
  previewFiles="";
  uploading = false;
  videoExists = false;
  videoURL="";
  constructor(private _Activatedroute:ActivatedRoute,private ListingManagerService:ListingManagerService,private Router:Router) { 
    this.Resource_id =Number(this._Activatedroute.snapshot.paramMap.get("id"));

  }

  ngOnInit(): void {
    this.get_introVideo();
  }

  onSelect(files) {
    this.fileName = files.addedFiles[0];
    this.previewFiles =files.addedFiles;
    this.name = files.addedFiles[0].name;
    if(this.name){
      this.disable_btn=false;
    } 
    console.log(files.addedFiles[0].name); 
}


onSubmit(){ 
  this.uploading = true;
  this.ListingManagerService.introVideo(this.fileName,this.Resource_id).subscribe(data =>{
   if(data.status==true){ 
    this.uploading = false;
    this.Router.navigate(['/company/Resources']); 
   }  
 
 }); 

} 
get_introVideo(){
  this.ListingManagerService.get_introVideo(this.Resource_id).subscribe(data =>{
    console.log(data)
    if(data.Intro_video==""){  
      this.videoExists = false;
    }else{ 
      this.videoExists = true;
      this.videoURL = data.Intro_video;
    }
  
  }); 
}
}
