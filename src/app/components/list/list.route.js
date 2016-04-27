export default function($stateProvider) {

    $stateProvider
        .state('list', {
            url: '/list',
            templateUrl: 'app/components/list/list.view.html',
            controller: 'ListController',
            controllerAs: 'list'
        })


}
