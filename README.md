# Flint

A rapid development boilerplate for launching a simple SaaS site using:

* Angular 6+ w/PWA
* Material UI using Angular Material
* Firebase Authentication & Firestore
* Stripe Billing & Subscriptions

## Getting started

Flint is not a framework, it's a boilerplate. As a result, it doesn't have an npm module. Instead, you should clone it locally, then push your changes. The easiest way to do this is to:

```
git init
git remote add flint git@github.com:javiermuniz/flint.git
git pull flint master
git remote add origin <your git path>
 git push --set-upstream origin master
```

From this point forward, you can develop as you usually would. If you wish to update Flint, simply pull master from your flint remote and resolve any merge conflicts. I will do my best to organize the codebase in such a way that merge conflicts are easy to avoid, but some may be unavoidable. I still believe that overall, this approach will yield better results for the boilerplate than to release as an npm module.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

Flint is distributed under the Apache 2.0 license. If you would like help with your Flint-based project, you can reach out to me and I will be happy to provide the help for a fee. If you find a bug or would like to see a feature added to the boilerplate, please open a GitHub Issue. Currently, I am the only maintainer of this project. However pull requests are always welcome!