(function() {
  'use strict';

  angular
    .module('council.core')
    .factory('Discussion', Discussion);

  function Discussion(DS, $http) {
    var ALLOWED_FIELDS = 'title subtitle body tags'.split(' ');

    var Discussion = DS.defineResource({
      name: 'discussion',
      endpoint: 'discussions',
      methods: {
        addComment: function(comment) {
          return DS.create('discussionComment', comment);
        },
        markAsRead: function() {
          return $http.put('discussions/' + this.id + '/subscription');
        },
        update: function() {
          return Discussion.save(this, { changesOnly: true });
        }
      },
      beforeUpdate: function(resoureName, attrs, cb) {
        attrs = _.pick(attrs, ALLOWED_FIELDS);
        cb(null, attrs);
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
