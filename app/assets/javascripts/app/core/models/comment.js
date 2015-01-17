(function() {
  'use strict';

  angular
    .module('council.core')
    .factory('Comment', Comment);

  function Comment(User, DS, $http, _) {
    var Comment = DS.defineResource({
      name: 'comment',
      endpoint: 'comments',

      relations: {
        belongsTo: {
          discussion: {
            parent: true,
            localField: 'discussions',
            localKey: 'discussion_id'
          },
          user: {
            localField: 'author',
            localKey: 'author_id'
          }
        }
      },

      beforeUpdate: function(resourename, attrs, cb) {
        attrs = _.pick(attrs, 'body');
        cb(null, attrs);
      },

      afterInject: function(name, comment) {
        DS.loadRelations('comment', comment, ['user']);
        DS.linkInverse('comment', comment.id);
      }
    });

    return Comment;
  }
})();
