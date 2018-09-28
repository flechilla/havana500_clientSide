import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { antAnimations } from '@hav500workspace/shared';

@Component({
  selector: 'admin-content',
  templateUrl: './content.component.html',
  animations: antAnimations
})
export class ContentComponent implements OnInit, OnDestroy {
  @HostBinding('@routerTransitionUp')
  routeAnimationUp = false;
  @HostBinding('@routerTransitionDown')
  routeAnimationDown = false;
  @HostBinding('@routerTransitionRight')
  routeAnimationRight = false;
  @HostBinding('@routerTransitionLeft')
  routeAnimationLeft = false;
  @HostBinding('@routerTransitionFade')
  routeAnimationFade = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute)
      )
      .subscribe(event => {
        // switch (this.fuseSettings.routerAnimation) {
        //   case 'fadeIn':
        //     this.routeAnimationFade = !this.routeAnimationFade;
        //     break;
        //   case 'slideUp':
        //     this.routeAnimationUp = !this.routeAnimationUp;
        //     break;
        //   case 'slideDown':
        //     this.routeAnimationDown = !this.routeAnimationDown;
        //     break;
        //   case 'slideRight':
        //     this.routeAnimationRight = !this.routeAnimationRight;
        //     break;
        //   case 'slideLeft':
        // this.routeAnimationLeft = !this.routeAnimationLeft;
        //     break;
        // }
        this.routeAnimationFade = true;
      });
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
