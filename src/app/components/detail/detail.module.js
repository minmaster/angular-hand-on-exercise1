import DetailController from './detail.controller';
import DetailRouter from './detail.route';

angular.module('app.detail', [])
    .controller('DetailController', DetailController)
    .config(DetailRouter);
