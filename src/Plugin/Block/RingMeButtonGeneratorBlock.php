<?php

namespace Drupal\ringme\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Ring Me button generator' Block.
 *
 * @Block(
 *   id = "ringeme_button_generator_block",
 *   admin_label = @Translation("«Ring Me» button generator block"),
 * )
 */
class RingMeButtonGeneratorBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'ringme_button_generator',
    ];
  }

}
