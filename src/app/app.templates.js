(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/components/detail/detail.view.html',
    '<h1>{{detail.member.lastName}}, {{detail.member.name}}</h1>\n' +
    '\n' +
    '<h2>Entry date: {{detail.member.entryDate}}</h2>\n' +
    '\n' +
    '<h3>Days in Gigigo: {{detail.member.days}}</h3>\n' +
    '\n' +
    '<a ui-sref="list">Go back to list</a>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/components/list/list.view.html',
    'List\n' +
    '\n' +
    '<li ng-repeat="item in list.team"><a ui-sref="detail({id: item.id})">{{item.lastName}}, {{item.name}}</a></li>\n' +
    '');
}]);
})();
