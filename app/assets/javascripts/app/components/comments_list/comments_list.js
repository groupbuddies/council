(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('commentsList', CommentsList)
    .controller('CommentsListCtrl', CommentsListCtrl);

  function CommentsList() {
    return {
      scope: {
        comments: '=commentsList',
        count: '=commentCount',
        toggle: '&toggle'
      },
      templateUrl: 'components/comments_list/templates/comments_list.html',
      controller: 'CommentsListCtrl',
      controllerAs: 'ctrl',
      bindToController: true
    };
  }

  function CommentsListCtrl() {
  }
})();
