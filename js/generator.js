/**
 * @file
 * Defines the behavior of the Drupal «Ring Me» button generator.
 */

(function ($) {
  'use strict';

  Drupal.behaviors.ringme_button_generator = {
    attach: function (context, settings) {
      var handle = 0;

      var ringAliasInput       = $('#ringme--button-generator-form #edit-ring-alias'),
          previousAlias        = ringAliasInput.val(),
          ringMeButtonPreview  = $('#ringme--button-generator-form #preview-ringme-button'),
          ringMeBtnGenTextarea = $('#ringme--button-generator-form #get-ringme-button-code'),
          buttonScriptURL      = 'https://rawgit.com/savoirfairelinux/ringme.js/master/src/ringme.js',
          buttonCodePattern    = '<div id="ringme-[ringalias]">' + "\n";
      buttonCodePattern += '  <script type="text/javascript">' + "\n"
      buttonCodePattern += '    RingMe.ui({' + "\n"
      buttonCodePattern += '      "action": "call",' + "\n"
      buttonCodePattern += '      "identifier": "[ringalias]",' + "\n"
      buttonCodePattern += '      "container": "ringme-[ringalias]"' + "\n"
      buttonCodePattern += '    });' + "\n"
      buttonCodePattern += '  </script>' + "\n"
      buttonCodePattern += '</div>';

      // Provide autofilling of Ring Me button textarea, using Ring alias input.
      function updateGeneratorAndPreview() {
        var typedAlias = ringAliasInput.val();
        if (typedAlias.length > 2) {
          if (typedAlias != previousAlias) {
            var buttonCode = buttonCodePattern.replace(/\[ringalias\]/g, typedAlias);
            ringMeBtnGenTextarea.val('<script src="' + buttonScriptURL + '></script>' + "\n" + buttonCode);
            $.getScript(buttonScriptURL)
              .done(function (script, textStatus) {
                ringMeButtonPreview.html(buttonCode);
              });
            previousAlias = typedAlias;
          }
        }
        else {
          ringMeButtonPreview.empty();
          ringMeBtnGenTextarea.val('');
        }
      }

      handle = setInterval(updateGeneratorAndPreview, 200);

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
