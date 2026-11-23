import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from '@conduit/shared';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { DefaultImagePipe } from '@conduit/shared';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  imports: [RouterLinkActive, RouterLink, AsyncPipe, DefaultImagePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private userService = inject(UserService);
  currentUser$ = this.userService.currentUser;
  authState$ = this.userService.authState;
}
