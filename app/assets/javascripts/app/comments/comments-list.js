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
      templateUrl: 'comments/templates/comments-list.html'
    };
  }

  function CommentsListCtrl() {

  }
})();
