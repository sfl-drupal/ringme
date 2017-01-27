/**
 * @file
 * Defines the behavior of the Drupal «Ring Me» button generator.
 */

(function ($) {
  'use strict';

  Drupal.behaviors.ringme_button_generator = {
    attach: function (context, settings) {
      var ringAliasInput = $('#ringme--button-generator-form #edit-ring-alias'),
          RingMeButtonGeneratorTextarea = $('#ringme--button-generator-form #get-ringme-button-code');

      // TODO:
      // Fill RingMeButtonGeneratorTextarea with an HTML code provide by SSirois
      // using ringAliasInput value.
    }
  };

}(jQuery));
