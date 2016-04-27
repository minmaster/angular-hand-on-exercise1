export default function($stateProvider) {

    $stateProvider
        .state('detail', {
            url: '/detail/:id',
            templateUrl: 'app/components/detail/detail.view.html',
            controller: 'DetailController',
            controllerAs: 'detail'
        })

}
