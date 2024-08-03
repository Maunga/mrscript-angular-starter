import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export enum IdleUserTimes {
  IdleTime = 600000,
  CountdownTime = 5000
}


@Injectable({
  providedIn: 'root'
})
export class IdleTimeService {

  private timeoutId: any;
  private countdownId: any;
  countdownValue?: any;

  userInactive: Subject<boolean> = new Subject();

  constructor() {
    this.reset();
    this.initListener();
  }

  initListener() {
    window.addEventListener('mousemove', () => this.reset());
    window.addEventListener('click', () => this.reset());
    window.addEventListener('keypress', () => this.reset());
    window.addEventListener('DOMMouseScroll', () => this.reset());
    window.addEventListener('mousewheel', () => this.reset());
    window.addEventListener('touchmove', () => this.reset());
    window.addEventListener('MSPointerMove', () => this.reset());
  }

  reset() {
    clearTimeout(this.timeoutId);
    clearTimeout(this.countdownId);
    this.startIdleTimer();
  }

  startIdleTimer() {
    this.timeoutId = setTimeout(() => {
      console.log('Inactivity detected');
      this.startCountdown();
    }, IdleUserTimes.IdleTime);
  }

  startCountdown() {
    this.countdownValue = IdleUserTimes.CountdownTime / 1000;
    this.countdownId = setInterval(() => {
      this.countdownValue--;
      console.log('You will logout in:', this.countdownValue, 'seconds');
      if (this.countdownValue <= 0) {
        clearInterval(this.countdownId);

        this.userInactive.next(true);
      }
    }, 1000);
  }
}
