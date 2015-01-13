(function() {
  'use strict';

  angular
    .module('council.core')
    .factory('Comment', Comment);

  function Comment(User, DS, $http) {
    var Comment = DS.defineResource({
      name: 'comment',
      endpoint: 'comments',
      methods: {
        update: function(body) {
          var url = 'discussions/' + this.discussion_id + '/comments/' + this.id;
          var data = {
            body: body
          };

          return $http.put(url, data).then(function(response) {
            return response.data;
          });
        }
      },

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

      afterInject: function(name, comment) {
        DS.loadRelations('comment', comment, ['user'])
      }
    });

    return Comment;
  }
})();
