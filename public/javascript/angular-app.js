
angular.module('plunker', [])

  .controller('MainCtrl', function($scope) {
    $scope.plans = window.PLANS;
    $scope.selectedPlan = window.SELECTED_PLAN;
  })
  .directive('planSelector', ['$timeout', function ($timeout) {

  function link (scope, element, attrs, controller, transcludeFn) {
    if (scope.selectedPlan.photos > 49) {
      scope.numberPhotosText = 'Fotos ilimitadas';
    } else {
    }

    scope.selectedPlanID = scope.selectedPlan.id;
    scope.onChangePlan = function () {
      scope.selectedPlan = scope.plans.find(function (item) {

        return item.id === scope.selectedPlanID
      });
      if (scope.selectedPlan.photos > 49) {
        scope.numberPhotosText = 'Fotos ilimitadas';
      } else {
        if (scope.selectedPlan.photos > 1) {
          scope.numberPhotosText = scope.selectedPlan.photos + ' Fotos';
        } else {
          scope.numberPhotosText = scope.selectedPlan.photos + ' Foto';
        }
      }
    }
  }

  return {
    templateUrl: "/templates/plan-selector.html",
    scope: {
      selectedPlan: '=selectedPlan',
      plans: '=plans'
    },
    link: link
  }
}]);

