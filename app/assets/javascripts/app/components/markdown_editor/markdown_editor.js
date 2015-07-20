(function(){
  'use strict';

  angular
      .module('council.components')
      .controller('markdownEditorCtrl', markdownEditorCtrl)
      .directive('markdownEditor', markdownEditor);

  var toolbar_buttons = ['bold', 'italic', 'underline', 'strikethrough',
                          'anchor', 'h1', 'h2', 'h3', 'quote',
                          'orderedlist', 'unorderedlist', 'subscript',
                          'superscript', 'pre', 'removeFormat'];

  var editor_opts = {
    placeholder: {
      text: 'State your arguments'
    },
    toolbar: {
      buttons: toolbar_buttons
    }
  };

  function markdownEditor($sce) {
    return {
      restrict: 'E',
      scope: {
          modelValue: '='
      },
      controller: markdownEditorCtrl,
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: 'components/markdown_editor/templates/markdown_editor.html',
      link: councilMarkdownEditorLink
    };
  }

  function markdownEditorCtrl($scope) {
    var ctrl = this;
  }

  function councilMarkdownEditorLink($scope, $element, attrs, ctrl, $rootScope) {
    var editor = new MediumEditor(".MarkdownEditor", editor_opts);
    console.log($element);
    $element.on('input', updateModel);
    $scope.$on('md_editor:submitted', clearEditor);

    function clearEditor() {
      var target = angular.element(
        $element[0].querySelector('.MarkdownEditor') );

      target.html('').addClass('medium-editor-placeholder');
    }

    function trimHtml(html) {
      var exps = ['<div><br></div>', '<p>(&nbsp; ?)+</p>', '^<p><br></p>', '<p><br></p>$'];
      for (var i = 0; i < exps.length; i++) {
        html = html.replace(new RegExp(exps[i], 'g'), '');
      }

      return html;
    }

    function updateModel(e) {
      $scope.$apply(function() {
        var content = angular.element(e.target).html();
        ctrl.modelValue = trimHtml(content);
      });
    }
  }
})();

