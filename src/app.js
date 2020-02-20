import { PLATFORM } from 'aurelia-pal';
export class App {
  configureRouter(config, router) {
    config.title = 'ToDO';
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('home/home'), title: 'Home' },
      { route: 'task/:id', name: 'edit', moduleId: PLATFORM.moduleName('home/home'), title: 'Edit' }
    ]);

    this.router = router;
  }
}
