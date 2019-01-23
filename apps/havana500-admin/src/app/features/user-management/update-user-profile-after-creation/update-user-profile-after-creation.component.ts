import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'admin-update-user-profile-after-creation',
  templateUrl: './update-user-profile-after-creation.component.html',
  styleUrls: ['./update-user-profile-after-creation.component.scss']
})
export class UpdateUserProfileAfterCreationComponent implements OnInit {
  private userId: string;
  private code: string;
  private userHasValidCode: boolean;
  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.code = this.route.snapshot.queryParamMap.get('code');
    this.checkUserCode();
  }

  checkUserCode(): void {
    console.log('userid: ' + this.userId);
    console.log('code: ' + this.code);
    this.userService
      .checkUserCode(this.userId, this.code)
      .subscribe(r => {
        this.userHasValidCode = r;
        console.log('CheckEmailCode result: ' + r);
      });

  }
}
