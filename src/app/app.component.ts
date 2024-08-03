import { Component, inject } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Router, RouterModule } from '@angular/router';
import { IdleTimeService, PrimeModule } from '@core/shared';
import { AuthService } from '@core/auth';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, PrimeModule ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isUserIdle: boolean = false;

  visible: boolean = false;


  private router = inject(Router);
  private idleTime = inject(IdleTimeService);
  private userService = inject(AuthService);

  ngOnInit() {
    this.idleTime.userInactive.subscribe((isIdle) => {
      if (this.userService.isLoggedIn() && isIdle) {
        this.isUserIdle = isIdle;
        this.visible = isIdle;
        console.log('CHECK-',isIdle)
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  logout() {
    if (this.isUserIdle) {
      this.idleTime.reset();
      this.visible = false;
      this.isUserIdle = false;
      this.userService.logout();
    }
  }
}
