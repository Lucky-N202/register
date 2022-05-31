import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QrcodeService } from 'src/app/services/qrcode.service';
import { UsersService } from '../../services/users.service'
import { WelcomeService} from '../../services/welcome.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})

export class QrcodeComponent implements OnInit {

  public myAngularxQrCode: string = '';
  user: any;
  userLists:any;
  checkIfUserScannedToday: any;

  constructor(private router: Router, private qrcode: QrcodeService, private usersService: UsersService, private welcome: WelcomeService) {}

  ngOnInit(): void {

    this.checkIfUserScannedToday = setInterval(() => { this.checkIfScannedToday() }, 1000)

      this.welcome.getUserProfile().subscribe({
        next: (res) => {
          this.myAngularxQrCode = `/user-profile/${res.user_id}`

      }, error: (err) =>{
        console.log(err)
      }
    })
  }

  checkIfScannedToday(){
    return this.qrcode.checkIfScanned().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        clearInterval(this.checkIfUserScannedToday)
        return this.router.navigateByUrl('/covid');
      }
    })
  }


}
