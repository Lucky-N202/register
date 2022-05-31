import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { DeactivateService } from 'src/app/services/deactivate.service';
import { ReactivateService } from 'src/app/services/reactivate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  
  @Output() userActivatedUpdate = new EventEmitter();
  @Output() userDeactivatedUpdate  = new EventEmitter();
  totalDisplayedUsers: number = 10;
  oldArr:any;
  searchText = "";
  filterText:string ='';
  userLists:any;
  search = faSearch;
  user:any;
  p: number = 1;
  total: number = 0;

  constructor(private usersService: UsersService, private route: Router, private deactivate:DeactivateService,private reactivate:ReactivateService) {}

  ngOnInit(): void {
    if(this.route.url === '/admin-dashboard'){
      this.totalDisplayedUsers = 5;
    }else{
      this.totalDisplayedUsers = 10
    }

    this.getAllEmployees()
  }
    

   pageChangeEvent(event: number){
     console.log(event)
    this.p = event;
    }
   getAllEmployees(){
    
     this.usersService.getAllEmployees().subscribe((res)=>{
       console.log(res)
       this.oldArr = res;
     this.userLists = res.map((user:any)=>{
      
       if(user.role_id ===2){
         user.role_id = 'Employee'

       }
       else{
         user.role_id = 'Help desk'
       }
       return user;


     })

     })
   }

  Search(){
    const oldArr = this.userLists
     if(this.searchText!== "")
     {
       let searchValue = this.searchText.toLocaleLowerCase();

       this.userLists = this.userLists.filter((users:any) =>{
         return users.username.toLocaleLowerCase().match(searchValue );
        });
             
             console.log(this.userLists);
      }

       else{
         console.log(oldArr)
         return this.userLists = this.oldArr;
       }
     
}

deactivateUser(id:any)
{
  
  Swal.fire({
    title: 'Are you sure you want to deactivate this user?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, deactivate  it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deactivated!',
        'Your file has been deactivated.',
        'success'
      )
      this.deactivate.deactivateAEmployee(id).subscribe({
        next: (res) =>{
          
          this.getAllEmployees()
          this.userDeactivatedUpdate.emit();
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      })

  
    }
  })
 
}

reactivateEmployee(id:any)
    {
      
      Swal.fire({
        title: 'Are you sure you want to reactivate this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reactivate  it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Reactivated!',
            'Your file has been reactivated.',
            'success'
          )
      
      this.reactivate.reactiavteAEmployee(id).subscribe({
        next: (res) =>{
          
          this.getAllEmployees()
          this.userActivatedUpdate.emit();
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
    
    })
  }


}
