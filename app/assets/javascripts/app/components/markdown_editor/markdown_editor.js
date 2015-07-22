(function(){
  'use strict';

  angular
    .module('council.components')
    .controller('markdownEditorCtrl', markdownEditorCtrl)
    .directive('markdownEditor', markdownEditor);


  function markdownEditor($sce, $timeout) {
    return {
      restrict: 'E',
      scope: {
          modelValue: '=',
          placeholder: '@',
          buttons: '@',
          large: '@',
          required: '@'
      },
      controller: markdownEditorCtrl,
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: 'components/markdown_editor/templates/markdown_editor.html',
      link: councilMarkdownEditorLink
    };

    function councilMarkdownEditorLink($scope, $element, attrs, ctrl) {
      var textarea = $element[0].querySelector('textarea.MarkdownEditor');
      var opts = {
        element: textarea,
        defaultValue: ctrl.modelValue
      };

      var editor = new SimpleMDE(opts);

      editor.codemirror.on('change', updateModel);
      $scope.$watch('ctrl.modelValue', updateEditorWatcher);

      function updateEditorWatcher(newValue, oldValue) {
        if(newValue !== editor.value())
          $timeout(refreshEditor, 0, true);
      }

      function updateModel() {
        $scope.$apply(function() {
          if(ctrl.modelValue !== editor.value())
            ctrl.modelValue = editor.value();
        });
      }

      function refreshEditor() {
        editor.value( ctrl.modelValue ? ctrl.modelValue : '');
      }
    }
  }

  function markdownEditorCtrl() {
    var ctrl = this;

    ctrl.isRequired = isRequired;

    function isRequired() {
      return ctrl.required && !ctrl.modelValue;
    }
  }
})();

