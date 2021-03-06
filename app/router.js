import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import RouterScroll from 'ember-router-scroll';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('perfil', {path: '/perfil/:id'}, function() {
    this.route('frente-a-frente');
    this.route('propuestas');
    this.route('fact-checking');
  });

  this.route('perfiles');

  this.route('comision', function() {
    this.route('diputado', { path: '/:id' }, function() {
      this.route('frente-a-frente');
      this.route('fact-checking');
    });
  });

  this.route('investigacion');

  this.route('tabla-gradacion');
  this.route('partidos', function() {
    this.route('partido', { path: '/partido/:siglas'});
  });
  this.route('quien-es-mi-representante');
});

export default Router;
