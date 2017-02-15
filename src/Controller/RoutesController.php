<?php

namespace Drupal\ringme\Controller;

/**
 * @file
 * Contains \Drupal\ringme\Controller\RoutesController.
 */

use Drupal\Core\Controller\ControllerBase;

/**
 * Provides route responses for the «Ring Me» module.
 */
class RoutesController extends ControllerBase {

  /**
   * Returns a Ring Me test page.
   *
   * @return array
   *   A simple renderable array.
   */
  public function testPage() {

    $button_generator = \Drupal::service('plugin.manager.block')
      ->createInstance('ringme_button_generator_block')
      ->build();

    return [
      '#theme' => 'ringme_generator_preview',
      '#form' => $button_generator,
    ];
  }

}
