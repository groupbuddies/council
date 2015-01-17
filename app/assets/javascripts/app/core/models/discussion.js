(function() {
  'use strict';

  angular
    .module('council.core')
    .factory('Discussion', Discussion);

  function Discussion(Comment, DS, $http, _) {
    var ALLOWED_FIELDS = 'title subtitle body open tags'.split(' ');

    var Discussion = DS.defineResource({
      name: 'discussion',
      endpoint: 'discussions',

      methods: {
        addComment: function(comment) {
          var discussion = this;

          return Comment.create(comment, {
            endpoint: 'discussions/' + discussion.id + '/comments'
          });
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

          return DS.refresh('discussion', discussion.id);
        },

        loadComments: function() {
          return Comment.findAll({ discussion_id: this.id});
        }
      },

      afterInject: function(name, discussion) {
        return DS.loadRelations('discussion', discussion.id, ['user']);
      },

      beforeUpdate: function(resourename, attrs, cb) {
        attrs = _.pick(attrs, ALLOWED_FIELDS);
        cb(null, attrs);
      },

      beforeCreate: function(resourename, attrs, cb) {
        attrs = _.pick(attrs, ALLOWED_FIELDS);
        cb(null, attrs);
      },

      relations: {
        belongsTo: {
          user: {
            localField: 'author',
            localKey: 'author_id'
          }
        },
        hasMany: {
          comment: {
            localField: 'comments',
            foreignKey: 'discussion_id'
          }
        }
      }
    });

    return Discussion;
  }
})();
