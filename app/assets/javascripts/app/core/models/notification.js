(function() {
  'use strict';

  angular
    .module('council.core')
    .factory('Notification', Notification);

  function Notification(DS) {
    var Notification = DS.defineResource({
      name: 'notification',
      endpoint: 'notifications',

      methods: {
        isNewDiscussion: function() {
          var notification = this;
          return notification.kind === 'new_discussion';
        },
        isNewComment: function() {
          var notification = this;
          return notification.kind === 'new_comment';
        }
      },

      afterInject: function(resource, notification) {
        DS.loadRelations('notification', notification.id, ['discussion']);
      },

      relations: {
        belongsTo: {
          discussion: {
            localField: 'discussion',
            localKey: 'discussion_id'
          }
        }
      }
    });

    return Notification;
  }
})();
