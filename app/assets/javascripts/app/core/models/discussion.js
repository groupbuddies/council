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
          var refresh = angular.bind(this, this.refresh);

          return DS.create('discussionComment', comment)
            .then(refresh);
        },
        markAsRead: function() {
          return $http.put('discussions/' + this.id + '/subscription');
        },
        update: function() {
          return Discussion.save(this, {
            changesOnly: true
          });
        },
        refresh: function() {
          var discussion = this;

          return $q(function(resolve, reject) {
            DS.refresh('discussion', discussion.id);
            resolve(discussion);
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
