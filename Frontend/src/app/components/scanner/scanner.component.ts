import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { Router, ActivatedRoute } from '@angular/router';
import { ScanLogsService } from '../../services/scan-logs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  constructor(private router: Router, private activedRoute: ActivatedRoute, private scanLogsService: ScanLogsService) { }

  ngOnInit(): void {}

  scanResult!: string[];

  onCodeResult(result:string){
    this.scanResult=result.split('/');
    const id = this.scanResult[this.scanResult.length - 1];
    
    this.scanLogsService.postScanLog(id).subscribe({
      next: (res) => {
        console.log(res);
        return this.router.navigateByUrl(`/user-profile/${id}`);
      },
      error: (err) => {
        console.log(err);
        // return Swal.fire({
        //   title: 'Error!',
        //   text: err.error.message,
        //   icon: 'error',
        //   confirmButtonText: 'Ok'
        // })
      }
    })

  }

}
