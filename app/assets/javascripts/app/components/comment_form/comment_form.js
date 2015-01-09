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

        var clearBody = function() {
          $scope.comment.body = '';
        };

        var createComment = function(comment) {
          $scope.discussion
            .addComment(comment)
            .then(clearBody);
          $scope.toggle();
        };

        $scope.create = createComment;
      }
    };
  }
})();
