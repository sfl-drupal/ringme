/**
 * @file
 * Defines the behavior of the Drupal «Ring Me» button generator.
 */

(function ($) {
  'use strict';

  Drupal.behaviors.ringme_button_generator = {
    attach: function (context, settings) {
      var ringAliasInput = $('#ringme--button-generator-form #edit-ring-alias'),
          ringMeButtonGeneratorTextarea = $('#ringme--button-generator-form #get-ringme-button-code'),
          buttonCodePattern = '<script type="text/javascript" src="lasourcedessirois"></script><a href="ring:[ringalias]" type="button" class="ring--button">Ring Me</a>';

      ringAliasInput.keypress(function (key) {
        var aliasInput = $(this);
        setTimeout(updateGenerator, 100);

        function updateGenerator() {
          var typedAlias = aliasInput.val();
          if (typedAlias.length >= 3) {
            var buttonCode = buttonCodePattern.replace("[ringalias]", typedAlias);
            ringMeButtonGeneratorTextarea.html(buttonCode);
          }
        }
      });
    }
  };

}(jQuery));
