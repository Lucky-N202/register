import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WelcomeService } from 'src/app/services/welcome.service';

@Injectable({
  providedIn: 'root'
})
export class helpDeskGuard implements CanActivate {
  trueOrFalse: boolean = false;
  constructor(private route: Router, private welcomeService: WelcomeService){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.getUser();
  }

  async getUser(){
    try {
      const res = await this.welcomeService.getUserProfile().toPromise();
      const { role } = res;
      if(role === 'help_desk'){
        this.trueOrFalse = true;
        return this.trueOrFalse;
      }

      if(role === 'employee'){
        this.trueOrFalse = false;
        this.route.navigateByUrl('/qrcode');
        return this.trueOrFalse;
      }

      if(role === 'admin'){
        this.trueOrFalse = false;
        this.route.navigateByUrl('/admin-dashboard');
        return this.trueOrFalse;
      }
      
      this.trueOrFalse = false;
      this.route.navigateByUrl('/login');
      return this.trueOrFalse;
    } catch (err) {
      console.log(err);
      this.trueOrFalse = false;
      this.route.navigateByUrl('/login');
      return this.trueOrFalse;
    }
  }
  
}
