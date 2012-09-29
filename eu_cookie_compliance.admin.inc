<?php
/**
 * @file
 * This file provides administration form for the module.
 */

/**
 * Provides form for cookie control popup.
 */
function eu_cookie_compliance_admin_form($form_state) {

  global $language;
  $ln = $language->language;
  $popup_settings = eu_cookie_compliance_get_settings();
  $form['eu_cookie_compliance_' . $ln] = array (
    '#type'  => 'item',
    '#tree'   => TRUE,
  );

  if (module_exists('locale')) {
    $form['eu_cookie_compliance_' . $ln]['#title'] = t('You are editing settings for the %language language.', array('%language' => $language->name));
  }

  $form['eu_cookie_compliance_' . $ln]['popup_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable popup'),
    '#default_value' => isset($popup_settings['popup_enabled']) ? $popup_settings['popup_enabled'] : 0,
  );

  $form['eu_cookie_compliance_' . $ln]['popup_position'] = array(
    '#type' => 'checkbox',
    '#title' => t('Place the pop-up at the top of the website'),
    '#default_value' => isset($popup_settings['popup_position']) ? $popup_settings['popup_position'] : 0,
    '#description' => t('By default the pop-up appears at the bottom of the website. Tick this box if you want it to appear at the top'),
  );

  $form['eu_cookie_compliance_' . $ln]['popup_info'] = array(
    '#type' => 'text_format',
    '#title' => t('Popup message - requests consent'),
    '#default_value' => isset($popup_settings['popup_info']['value']) ? $popup_settings['popup_info']['value'] : '',
    '#required' => TRUE,
    '#format' => isset($popup_settings['popup_info']['format']) ? $popup_settings['popup_info']['format'] : NULL,
  );

  $form['eu_cookie_compliance_' . $ln]['popup_agreed_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable thank you message'),
    '#default_value' => isset($popup_settings['popup_agreed_enabled']) ? $popup_settings['popup_agreed_enabled'] : 1,
  );

  $form['eu_cookie_compliance_' . $ln]['popup_hide_agreed'] = array(
    '#type' => 'checkbox',
    '#title' => t('Clicking hides thank you message'),
    '#default_value' => isset($popup_settings['popup_hide_agreed']) ? $popup_settings['popup_hide_agreed'] : 0,
    '#description' => t('Clicking a link hides the thank you message automatically.'),
  );

  $form['eu_cookie_compliance_' . $ln]['popup_agreed'] = array(
    '#type' => 'text_format',
    '#title' => t('Popup message - thanks for giving consent'),
    '#default_value' => isset($popup_settings['popup_agreed']['value']) ? $popup_settings['popup_agreed']['value'] : '',
    '#required' => TRUE,
    '#format' => isset($popup_settings['popup_agreed']['format']) ? $popup_settings['popup_agreed']['format'] : NULL,
  );

  $form['eu_cookie_compliance_' . $ln]['popup_link'] = array(
    '#type' => 'textfield',
    '#title' => t('Privacy policy link'),
    '#default_value' => isset($popup_settings['popup_link']) ? $popup_settings['popup_link'] : '',
    '#size' => 60,
    '#maxlength' => 220,
    '#required' => TRUE,
    '#description' => t('Enter link to your privacy policy or other page that will explain cookies to your users. For external links prepend http://'),
  );

  $form['eu_cookie_compliance_' . $ln]['popup_height'] = array(
    '#type' => 'textfield',
    '#title' => t('Popup height in pixels'),
    '#default_value' => isset($popup_settings['popup_height']) ? $popup_settings['popup_height'] : '',
    '#size' => 5,
    '#maxlength' => 5,
    '#required' => FALSE,
    '#description' => t('Enter an integer value for a desired height in pixels or leave empty for automatically adjusted height'),
  
  );

  $form['eu_cookie_compliance_' . $ln]['popup_width'] = array(
    '#type' => 'textfield',
    '#title' => t('Popup width in pixels or a percentage value'),
    '#default_value' => isset($popup_settings['popup_width']) ? $popup_settings['popup_width'] : '100%',
    '#size' => 5,
    '#maxlength' => 5,
    '#required' => TRUE,
    '#description' => t('Set the width of the popup. This can be either an integer value or percentage of the screen width. For example: 200 or 50%'),
  );

  $form['eu_cookie_compliance_' . $ln]['popup_delay'] = array(
    '#type' => 'textfield',
    '#title' => t('Popup time delay in seconds'),
    '#default_value' => isset($popup_settings['popup_delay']) ? $popup_settings['popup_delay'] : 1,
    '#size' => 5,
    '#maxlength' => 5,
    '#required' => TRUE,
  );

  $form_color_picker_type = 'textfield';
  
  if (module_exists('jquery_colorpicker')) {
    $form_color_picker_type = 'jquery_colorpicker';
  }

  $form['eu_cookie_compliance_' . $ln]['popup_bg_hex'] = array(
    '#type' => $form_color_picker_type,
    '#title' => t('Background Color'),
    '#default_value' => isset($popup_settings['popup_bg_hex']) ? $popup_settings['popup_bg_hex'] : '0779BF', // Garland colors :)
    '#description' => t('Change the background color of the popup. Provide HEX value without the #'),
  );
  
  $form['eu_cookie_compliance_' . $ln]['popup_text_hex'] = array(
    '#type' => $form_color_picker_type,
    '#title' => t('Text Color'),
    '#default_value' => isset($popup_settings['popup_text_hex']) ? $popup_settings['popup_text_hex'] : 'ffffff',
    '#description' => t('Change the text color of the popup. Provide HEX value without the #'),
  );

  return system_settings_form($form);
}

/**
 * Validates form for cookie controll popup.
 */
function eu_cookie_compliance_admin_form_validate($form, &$form_state) {
  global $language;
  $ln = $language-> language;
  //print_r($form_state); die;
  if (!preg_match('/^[1-9][0-9]{0,4}$/', $form_state['values']['eu_cookie_compliance_' . $ln]['popup_height']) && !empty($form_state['values']['eu_cookie_compliance_' . $ln]['popup_height'])) {
    form_set_error('eu_cookie_compliance_popup_height', t('Height must be an integer value .'));
  }
  if (!preg_match('/^[1-9][0-9]{0,4}$/', $form_state['values']['eu_cookie_compliance_' . $ln]['popup_delay'])) {
    form_set_error('eu_cookie_compliance_popup_delay', t('Delay must be an integer value.'));
  }
  if (!preg_match('/^[1-9][0-9]{0,4}\%?$/', $form_state['values']['eu_cookie_compliance_' . $ln]['popup_width'])) {
    form_set_error('eu_cookie_compliance_popup_width', t('Width must be an integer or a percentage value.'));
  }
}
