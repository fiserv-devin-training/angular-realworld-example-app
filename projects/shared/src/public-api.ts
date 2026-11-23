/*
 * Public API Surface of @conduit/shared
 * Everything the shell and the remotes share lives behind this entry point, so
 * that Native Federation shares it as a single instance (singleton).
 */

// auth
export * from './lib/auth/user.model';
export * from './lib/auth/if-authenticated.directive';
export * from './lib/auth/guards';
export * from './lib/auth/services/jwt.service';
export * from './lib/auth/services/user.service';

// interceptors
export * from './lib/interceptors/api.interceptor';
export * from './lib/interceptors/error.interceptor';
export * from './lib/interceptors/token.interceptor';

// models
export * from './lib/models/errors.model';
export * from './lib/models/loading-state.model';
export * from './lib/articles/models/article.model';
export * from './lib/articles/models/article-list-config.model';
export * from './lib/articles/models/comment.model';
export * from './lib/profile/models/profile.model';

// services
export * from './lib/articles/services/articles.service';
export * from './lib/profile/services/profile.service';

// components, pipes
export * from './lib/ui/components/list-errors.component';
export * from './lib/ui/pipes/default-image.pipe';
export * from './lib/ui/pipes/markdown.pipe';
export * from './lib/articles/components/article-list.component';
export * from './lib/articles/components/article-meta.component';
export * from './lib/articles/components/article-preview.component';
export * from './lib/articles/components/favorite-button.component';
export * from './lib/profile/components/follow-button.component';
