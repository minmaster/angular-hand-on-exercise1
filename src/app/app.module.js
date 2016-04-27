import angular from 'angular';
import uiRouter from 'angular-ui-router';
import list from './components/list/list.module';
import detail from './components/detail/detail.module';
import core from './core/core.module';
import appTemplates from './app.templates';

var app = angular.module('app', [
    uiRouter,
    'app.core',
    'app.templates',
    'app.list',
    'app.detail'
]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/list');
})

angular.element(document).ready(function() {
    angular.bootstrap(document.body, ['app']);
})
