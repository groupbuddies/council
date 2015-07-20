(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('commentCard', CommentCard)
    .controller('CommentCardCtrl', CommentCardCtrl);

  function CommentCard() {
    return {
      scope: {
        comment: '='
      },
      replace: true,
      templateUrl: 'components/comment_card/templates/comment_card.html',
      controller: 'CommentCardCtrl',
      controllerAs: 'ctrl',
      bindToController: true
    };
  }

  function CommentCardCtrl(Device, $slidingCommentForm, $element, $timeout, Comment, Keyboard) {
    var ctrl = this;

    ctrl.disabled = true;
    ctrl.input = ctrl.comment.body;

    ctrl.startEditing = startEditing;
    ctrl.stopEditing = stopEditing;
    ctrl.update = update;
    ctrl.isDisabled = isDisabled;

    function update() {
      ctrl.disabled = true;

      Comment.update(ctrl.comment.id, {body: ctrl.input})
        .then(updateComment)
        .then(stopEditing)
        .catch(onUpdateError);
    }

    function startEditing() {
      if (Device.isMobile()) {
        $slidingCommentForm.open(null, ctrl.comment);
      } else {
        ctrl.input = ctrl.comment.body;
        $element.addClass('is-editing');
        $element.find('textarea').focus();
      }
    }

    function stopEditing() {
      $element.removeClass('is-editing');
      ctrl.disabled = true;
      Keyboard.close();
    }

    function updateComment(comment) {
      ctrl.comment = comment;
    }

    function onUpdateError(err) {
      ctrl.disabled = true;
      console.log(err);
    }

    function isDisabled() {
      return ctrl.disabled && !ctrl.input;
    }
  }
})();
