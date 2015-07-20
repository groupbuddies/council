(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('slidingCommentForm', slidingCommentForm)
    .controller('SlidingCommentFormCtrl', SlidingCommentFormCtrl)
    .service('$slidingCommentForm', SlidingCommentForm);

  function slidingCommentForm() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'components/sliding_comment_form/templates/sliding_comment_form.html',
      controller: 'SlidingCommentFormCtrl',
      controllerAs: 'ctrl',
      bindToController: true
    };
  }

  function SlidingCommentForm($rootScope) {
    return {
      close: close,
      open: open
    };

    function close() {
      $rootScope.$broadcast('comment_form:close');
    }

    function open(discussion, comment) {
      $rootScope.$broadcast('comment_form:open', discussion, comment);
    }
  }

  function SlidingCommentFormCtrl($rootScope, Keyboard, $element, Comment) {
    var ctrl = this;

    ctrl.show = false;
    ctrl.comment = {};
    ctrl.input = '';
    ctrl.disabled = true;

    ctrl.update = update;
    ctrl.create = create;
    ctrl.close = close;
    ctrl.animationCompleted = animationCompleted;
    ctrl.isDisabled = isDisabled;

    $rootScope.$on('comment_form:open', open);
    $rootScope.$on('comment_form:close', close);

    function open(event, discussion, comment) {
      ctrl.show = true;
      ctrl.discussion = discussion;
      ctrl.comment = comment;

      if (comment)
        ctrl.input = comment.body;
      else
        ctrl.input = "";
    }

    function close() {
      ctrl.show = false;
      Keyboard.close();
    }

    function animationCompleted() {
      if (ctrl.show)
        focus();
    }

    function update() {
      ctrl.disabled = true;
      ctrl.comment.DSUpdate({ body: ctrl.input })
        .then(reset)
        .then(close)
        .catch(onError);
    }

    function create() {
      ctrl.disabled = true;
      ctrl.discussion
        .addComment({ body: ctrl.input })
        .then(reset)
        .then(close)
        .catch(onError);
    }

    function reset() {
      ctrl.disabled = true;
      ctrl.input = "";
      $rootScope.$broadcast('md_editor:submitted');
    }

    function focus() {
      $element.find('textarea').focus();
    }

    function onError(err) {
      console.log(err);
      ctrl.disabled = false;
      focus();
    }

    function isDisabled() {
      return ctrl.disabled && !ctrl.input;
    }
  }
})();
