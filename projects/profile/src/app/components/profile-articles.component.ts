import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleListComponent } from '@conduit/shared';
import { ProfileService } from '@conduit/shared';
import { Profile } from '@conduit/shared';
import { ArticleListConfig } from '@conduit/shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-articles',
  template: `@if (articlesConfig()) {
    <app-article-list [limit]="10" [config]="articlesConfig()!" />
  }`,
  imports: [ArticleListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProfileArticlesComponent implements OnInit {
  profile = signal<Profile | null>(null);
  articlesConfig = signal<ArticleListConfig | null>(null);
  destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private readonly profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.profileService
      .get(this.route.snapshot.params['username'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (profile: Profile) => {
          this.profile.set(profile);
          this.articlesConfig.set({
            type: 'all',
            filters: {
              author: profile.username,
            },
          });
        },
      });
  }
}
