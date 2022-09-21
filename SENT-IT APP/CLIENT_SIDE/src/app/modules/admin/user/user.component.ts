import { Component, OnInit } from '@angular/core';
import { userRegister } from 'src/app/interface/interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  allUsers: userRegister [] = [];
  filteredString:string='';


  constructor(private user:AuthService) { }

  ngOnInit(): void {

    this.user.getAllUsers().subscribe(res=>{
      this.allUsers=res

  });
  console.log("helllo user..."+this.allUsers);
  console.log("helllo user...");

}
viewDetails(id:number=0){

}

}
