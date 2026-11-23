import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { combineLatest, EMPTY, of } from 'rxjs';
import { UserService } from '@conduit/shared';
import { Profile } from '@conduit/shared';
import { ProfileService } from '@conduit/shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FollowButtonComponent } from '@conduit/shared';
import { Errors } from '@conduit/shared';
import { ListErrorsComponent } from '@conduit/shared';
import { DefaultImagePipe } from '@conduit/shared';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  imports: [
    FollowButtonComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FollowButtonComponent,
    ListErrorsComponent,
    DefaultImagePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  profile = signal<Profile | null>(null);
  isUser = signal(false);
  errors = signal<Errors | null>(null);
  destroyRef = inject(DestroyRef);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  ngOnInit() {
    this.profileService
      .get(this.route.snapshot.params['username'])
      .pipe(
        catchError(error => {
          this.errors.set(error.errors || { error: ['Failed to load profile'] });
          return EMPTY;
        }),
        switchMap(profile => {
          return combineLatest([of(profile), this.userService.currentUser]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(([profile, user]) => {
        this.profile.set(profile);
        this.isUser.set(profile.username === user?.username);
      });
  }

  onToggleFollowing(profile: Profile) {
    this.profile.set(profile);
  }
}
