# ![Angular Example App](logo.png)

> ### Angular codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://realworld.show) spec and API.

### [RealWorld](https://realworld.show)

This codebase was created to demonstrate a fully fledged application built with Angular that interacts with an actual backend server including CRUD operations, authentication, routing, pagination, and more. We've gone to great lengths to adhere to the [Angular Styleguide](https://angular.dev/style-guide) & best practices.

# How it works

A global documentation for the project is available at [docs.realworld.show](https://docs.realworld.show/introduction/).

# Architecture

The app is split into microfrontends with [Native Federation](https://www.npmjs.com/package/@angular-architects/native-federation) (`@angular-architects/native-federation` 21, Angular 21). One Angular workspace holds three applications and one library:

| Project    | Port | Role                                                                                                     |
| ---------- | ---- | -------------------------------------------------------------------------------------------------------- |
| `shell`    | 4200 | Host. Header, footer, routing, login and register pages. Loads the remotes through a federation manifest |
| `articles` | 4201 | Remote. Home feed, tags, article page, comments, editor                                                  |
| `profile`  | 4202 | Remote. Profile page with the favorites tab, settings                                                    |
| `shared`   | -    | Library `@conduit/shared`: API/token/error interceptors, JWT and user services, models, shared UI        |

```
projects/
  shell/      federation.config.js, public/federation.manifest.json, src/app (routes, header, footer, auth pages)
  articles/   federation.config.js (exposes ./Routes), src/app (pages, comments, tags)
  profile/    federation.config.js (exposes ./ProfileRoutes, ./Settings), src/app (profile, settings)
  shared/     src/public-api.ts (the only entry point other projects import)
```

How it fits together:

- The shell reads `projects/shell/public/federation.manifest.json`, which maps `articles` to `http://localhost:4201/remoteEntry.json` and `profile` to `http://localhost:4202/remoteEntry.json`. Change those URLs for a deployed environment.
- All URLs are unchanged: `/`, `/tag/:tag`, `/article/:slug`, `/editor`, `/editor/:slug` are served by `articles`; `/profile/:username`, `/profile/:username/favorites`, `/settings` by `profile`; `/login` and `/register` by the shell.
- `@conduit/shared` is a tsconfig path alias, which Native Federation shares as a singleton. `UserService` and `JwtService` therefore exist once, so the login state is the same in every remote. Always import shared code through `@conduit/shared`, never with relative paths into `projects/shared`.
- `provideHttpClient` with the interceptors, the auth initializer and `window.__conduit_debug__` live in the shell. The remotes' own `app.config.ts` is only used when a remote runs on its own.

# Getting started

Requires [Bun](https://bun.sh/docs/installation). The backend (see the API repository) must run on <http://localhost:3000>.

```bash
bun run setup      # Init submodules + install dependencies
bun run start:all  # shell (4200), articles (4201), profile (4202)
```

Open <http://localhost:4200>. Start the shell last or all three together: the shell needs both remotes to be serving before pages render.

Run `bun run setup` again after a `git pull` that updates the `realworld` submodule.

| Command                                                    | What it does                                                      |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| `bun run start:all`                                        | All three dev servers                                             |
| `bun run start:shell` / `start:articles` / `start:profile` | One dev server                                                    |
| `bun run build:all` (or `bun run build`)                   | Build articles, profile, then shell into `dist/<project>/browser` |
| `bun run test`                                             | Unit tests (Vitest) for all projects                              |
| `TEST_MODE=fullstack bun run test:e2e`                     | Official E2E suite (starts `start:all` itself)                    |

### Building the project

Run `bun run build:all`. Artifacts are written to `dist/shell/browser`, `dist/articles/browser` and `dist/profile/browser`. Host the three folders and point the shell's `federation.manifest.json` at the remotes' `remoteEntry.json`.

## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication. You can view a live demo over at [demo.realworld.show](https://demo.realworld.show)

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU\* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR\*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: / )
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Pagination for list of articles
- Sign in/Sign up pages (URL: /login, /register )
  - Uses JWT (store the token in localStorage)
  - Authentication can be easily switched to session/cookie based
- Settings page (URL: /settings )
- Editor page to create/edit articles (URL: /editor, /editor/article-slug-here )
- Article page (URL: /article/article-slug-here )
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- Profile page (URL: /profile/:username, /profile/:username/favorites )
  - Show basic user info
  - List of articles populated from author's created articles or author's favorited articles

## Realworld Angular

This project may be too simple for getting a good understanding of the different ways an Angular project can be built.
For a comprehensive understanding of how more complex Angular projects can be implemented, you may check the [
RealWorld Angular](https://github.com/realworld-angular) organization that is specialized in Angular development, currently managed by [Gerome Grignon](https://github.com/geromegrignon).

## License

- **Project code**: [MIT License](LICENSE)
- **Angular logo**: The Angular logo is a trademark of Google LLC, used to indicate this project is built with Angular.
