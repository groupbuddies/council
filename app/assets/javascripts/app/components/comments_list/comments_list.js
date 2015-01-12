(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('commentsList', CommentsList);

  function CommentsList() {
    return {
      scope: {
        comments: '=commentsList',
        count: '=commentCount',
        toggle: '&toggle'
      },
      templateUrl: 'components/comments_list/templates/comments_list.html',
      controller: function(){},
      controllerAs: 'ctrl',
      bindToController: true
    };
  }
})();
