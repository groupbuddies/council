(function() {
  'use strict';

  angular
    .module('council.core')
    .factory('Discussion', Discussion);

  function Discussion(DS, $http) {
    var Discussion = DS.defineResource({
      name: 'discussion',
      endpoint: 'discussions',
      methods: {
        addComment: function(comment) {
          return DS.create('discussionComment', comment);
        }
      }
    });

    var DiscussionComment = DS.defineResource({
      name: 'discussionComment',
      endpoint: 'comments',
      methods: {
        update: function(body) {
          return $http.put('discussions/' + this.discussionId + '/comments/' + this.id, { body: body }).then(function(response) {
            return response.data;
          });
        }
      },
      relations: {
        belongsTo: {
          discussion: {
            parent: true,
            localField: 'discussions',
            localKey: 'discussionId'
          }
        }
      }
    });

    return Discussion;
  }
})();
