import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ContractorService } from '../../Services/contractor.service';

@Component({
  selector: 'app-create-spoc',
  templateUrl: './create-spoc.component.html',
  styleUrls: ['./create-spoc.component.css']
})
export class CreateSpocComponent implements OnInit {
  Contractor_id = sessionStorage.getItem('CONTRACTOR_ID');  
  Spoc_Form: FormGroup;
  isUpdated = false;
  submitted = false;
  Spoc_Data = []; 
  fieldTextType: boolean;

  constructor(private formBuilder: FormBuilder, private ContractorService:ContractorService) { }

  Spoc_fullname = new FormControl('', [ Validators.required, Validators.minLength(3)]);
  Spoc_email = new FormControl('', [ Validators.required, Validators.email]);
  Spoc_designation = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Spoc_phone =new FormControl('', [ Validators.required, Validators.minLength(10)]);
  Spoc_password = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Spoc_password2 = new FormControl('', [ Validators.required, Validators.minLength(2)]);
  Spoc_status = new FormControl('VERIFIED', );

  ngOnInit(): void {
    this.getSpocList();
    this.Spoc_Form = this.formBuilder.group({
      Spoc_fullname : this.Spoc_fullname,
      Spoc_email : this.Spoc_email,
      Spoc_designation : this.Spoc_designation,
      Spoc_phone : this.Spoc_phone, 
      Spoc_password : this.Spoc_password,  
      Spoc_password2 : this.Spoc_password2,  
      Spoc_status : this.Spoc_status,  
  
    }); 
  } 
  get f() { return this.Spoc_Form.controls; }
  onSubmit(){
    this.submitted = true;
    if (this.Spoc_Form.invalid) {  
      return;
    }else if(this.Spoc_Form.value.Spoc_password != this.Spoc_Form.value.Spoc_password2 ){
      alert("Password do not match!");
    }
    else{
      this.ContractorService.createSpoc(this.Spoc_Form.value).subscribe(data =>{
        console.log(data);
        this.isUpdated = true;
        this.getSpocList(); 
     
      }); 
    }
  }
  getSpocList(){
    this.ContractorService.getSpocList().subscribe(data =>{ 
      let spocList =[];
      for (var i = 0; i < data.length; i++) {
        var e = {
          "User_firstname" : data[i].User_firstname,
          "User_email" : data[i]['User_email'] ,
          "User_designation" : data[i].User_designation,
          "User_phonenumber" : data[i].User_phonenumber, 
          "User_id" : data[i].User_id,
        }
        spocList.push(e);
      }  
    this.Spoc_Data  = spocList; 
    }); 

  }
  deleteSpoc(Spoc_id){
     this.ContractorService.deleteSpoc(Spoc_id).subscribe(data =>{
      console.log(data);  
      this.getSpocList();
    
    }); 

  }
  resetForm(){ 
    this.Spoc_Form.reset();  
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
