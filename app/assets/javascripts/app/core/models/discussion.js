(function() {
  'use strict';

  angular
    .module('two_cents.core')
    .factory('Discussion', Discussion);

  function Discussion(DS) {
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
