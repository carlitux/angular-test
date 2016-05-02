import angular from 'angular';

angular.module('plunker', [])

  .controller('MainCtrl', function($scope) {
    $scope.plans = window.PLANS;
    $scope.selectedPlan = window.SELECTED_PLAN;
  })
  .directive('planSelector', ['$timeout', function ($timeout) {

  function link (scope, element, attrs, controller, transcludeFn) {
    scope.selectedPlanID = scope.selectedPlan.id;
    scope.onChangePlan = function () {
      scope.selectedPlan = scope.plans.find(function (item) {

        return item.id === scope.selectedPlanID
      });
    }
  }

  return {
    templateUrl: "/templates/plan-selector.nunjucks",
    scope: {
      selectedPlan: '=selectedPlan',
      plans: '=plans'
    },
    link
  }
}]);
