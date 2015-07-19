(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('commentForm', commentForm)
    .controller('CommentFormCtrl', CommentFormCtrl);

  function commentForm() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        comment: "=comment",
        discussion: "=discussion"
      },
      controller: 'CommentFormCtrl',
      controllerAs: 'ctrl',
      templateUrl: 'components/comment_form/templates/comment_form.html',
      bindToController: true
    };
  }

  function CommentFormCtrl($element, Comment, Keyboard, $scope, $rootScope) {
    var ctrl = this;

    ctrl.create = create;
    ctrl.disabled = false;

    ctrl.comment = Comment.createInstance();

    $scope.$on('comment:open', function() {
      $element.find('.Editor').focus();
    });

    $scope.$on('comment:close', function() {
      Keyboard.close();
    });

    function create() {
      ctrl.disabled = true;
      ctrl.discussion
        .addComment(ctrl.comment)
        .then(reset)
        .catch(error);
    }

    function reset() {
      ctrl.disabled = false;
      ctrl.comment = Comment.createInstance();
      $rootScope.$broadcast('comment:submitted');
    }

    function error() {
      ctrl.disabled = false;
    }
  }
})();
