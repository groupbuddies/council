(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('commentForm', commentForm);

  function commentForm() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        toggle: "=toggle",
        comment: "=comment",
        discussion: "=discussion"
      },
      templateUrl: 'components/comment_form/templates/comment_form.html',
      link: function($scope, element, attrs) {
        $scope.create = function(comment) {
          $scope.discussion.addComment(comment);
          $scope.toggle();
        };
      }
    };
  }
})();
