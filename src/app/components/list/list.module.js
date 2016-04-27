import ListController from './list.controller';
import ListRoute from './list.route';

angular.module('app.list', [])
    .controller('ListController', ListController)
    .config(ListRoute);
