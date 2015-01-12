(function() {
  'use strict';

  angular
    .module('council.core')
    .factory('Discussion', Discussion);

  function Discussion(DS, $http, $q) {
    var ALLOWED_FIELDS = 'title subtitle body tags'.split(' ');

    var Discussion = DS.defineResource({
      name: 'discussion',
      endpoint: 'discussions',
      methods: {
        addComment: function(comment) {
          var discussion = this;

          var refresh = function() {
            return $q(function(resolve, reject) {
              DS.refresh('discussion', discussion.id);
              resolve();
            });
          };

          return DS.create('discussionComment', comment)
            .then(refresh);
        },
        markAsRead: function() {
          var discussion = this;

          $http.put('discussions/' + discussion.id + '/subscription')
            .success(function() {
              DS.refresh('discussion', discussion.id);
            });
        },
        update: function() {
          return Discussion.save(this, {
            changesOnly: true
          });
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
          var url = 'discussions/' + this.discussionId + '/comments/' + this.id;
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
            localKey: 'discussionId'
          }
        }
      }
    });

    return Discussion;
  }
})();
