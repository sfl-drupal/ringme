/**
 * @file
 * Defines the behavior of the Drupal «Ring Me» button generator.
 */

(function ($) {
  'use strict';

  Drupal.behaviors.ringme_button_generator = {
    attach: function (context, settings) {
      var ringAliasInput       = $('#ringme--button-generator-form #edit-ring-alias'),
          previousAlias        = ringAliasInput.val(),
          ringMeButtonPreview  = $('#ringme--button-generator-form #preview-ringme-button'),
          ringMeBtnGenTextarea = $('#ringme--button-generator-form #get-ringme-button-code'),
          buttonScript         = '<script type="text/javascript" src="lasourcedessirois.js"></script>',
          buttonCodePattern    = '<a class="btn btn--beta btn--icon sflicon-gauge ring--button" href="ring:[ringalias]">Ring Me</a>';

      // Provide autofilling of Ring Me button textarea, using Ring alias input.
      function updateGeneratorAndPreview() {
        var typedAlias = ringAliasInput.val();
        if (typedAlias.length > 2) {
          if (typedAlias != previousAlias) {
            var buttonCode = buttonCodePattern.replace('[ringalias]', typedAlias);
            ringMeButtonPreview.html(buttonCode);
            ringMeBtnGenTextarea.val(buttonScript + "\n" + buttonCode);
            previousAlias = typedAlias;
          }
        }
        else {
          ringMeButtonPreview.empty();
          ringMeBtnGenTextarea.val('');
        }
      }
      setInterval(updateGeneratorAndPreview, 200);

      // Select all textarea content on focus.
      ringMeBtnGenTextarea.focus(function () {
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
