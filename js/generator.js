/**
 * @file
 * Defines the behavior of the Drupal «Ring Me» button generator.
 */

(function ($) {
  'use strict';

  Drupal.behaviors.ringme_button_generator = {
    attach: function (context, settings) {
      // Provide autofilling of Ring Me button textarea, using Ring alias input.
      var ringAliasInput = $('#ringme--button-generator-form #edit-ring-alias'),
          ringMeButtonPreview = $('#ringme--button-generator-form #preview-ringme-button'),
          ringMeButtonGeneratorTextarea = $('#ringme--button-generator-form #get-ringme-button-code');
      var buttonCodePattern = '<script type="text/javascript" src="lasourcedessirois"></script>' + "\n";
      buttonCodePattern += '<a class="btn btn--beta btn--icon sflicon-gauge ring--button" href="ring:[ringalias]">Ring Me</a>';

      ringAliasInput.keypress(function (key) {
        var aliasInput = $(this);
        setTimeout(updateGeneratorAndPreview, 100);

        function updateGeneratorAndPreview() {
          var typedAlias = aliasInput.val();
          if (typedAlias.length >= 3) {
            var buttonCode = buttonCodePattern.replace('[ringalias]', typedAlias);
            ringMeButtonPreview.html(buttonCode);
            ringMeButtonGeneratorTextarea.val(buttonCode);
          }
          else {
            ringMeButtonPreview.empty();
            ringMeButtonGeneratorTextarea.val('');
          }
        }
      });

      ringMeButtonGeneratorTextarea.focus(function () {
        var $this = $(this);

        $this.select();

        window.setTimeout(function () {
          $this.select();
        }, 1);

        // Work around WebKit's little problem.
        function mouseUpHandler() {
          // Prevent further mouseup intervention.
          $this.off("mouseup", mouseUpHandler);
          return false;
        }

        $this.mouseup(mouseUpHandler);
      });
    }
  };

}(jQuery));
