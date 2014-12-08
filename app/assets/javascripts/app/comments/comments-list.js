(function() {
  'use strict';

  angular
    .module('two_cents.comments')
    .directive('commentsList', CommentsList)
    .controller('CommentsListCtrl', CommentsListCtrl);

  function CommentsList() {
    return {
      scope: {
        comments: '=commentsList'
      },
      controller: 'CommentsListCtrl as ctrl',
      templateUrl: 'comments/templates/comments-list.html'
    };
  }

  function CommentsListCtrl(DS, $stateParams) {
    var ctrl = this;

    ctrl.editing = null;

    ctrl.updateComment = updateComment;
    ctrl.editComment = editComment;
    ctrl.cancelEdit = cancelEdit;

    function updateComment(comment) {
      var updated = DS.createInstance('discussionComment', comment, { useClass:true });

      updated.update(ctrl.editing.body).then(refreshComment);

      function refreshComment(comment) {
        angular.extend(ctrl.editing, comment);
        ctrl.editing = null;
      }
    }

    function editComment(comment) {
      ctrl.newBody = comment.body;
      ctrl.editing = comment;
    }

    function cancelEdit() {
      ctrl.editing.body = ctrl.newBody;
      ctrl.editing = null;
    }
  }
})();
