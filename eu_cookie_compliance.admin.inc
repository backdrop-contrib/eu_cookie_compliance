<?php

function eu_cookie_compliance_admin_form($form_state) {
  
  $form = array();
  
  $form['eu_cookie_compliance_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable popup'),
    '#default_value' => variable_get('eu_cookie_compliance_popup_enabled', 0)
  );
  
  $form['eu_cookie_compliance_popup_title'] = array(
    '#type' => 'textfield',
    '#title' => t('Popup title'),
    '#default_value' => variable_get('eu_cookie_compliance_popup_title', ''),
    '#size' => 60,
    '#maxlength' => 220,
    '#required' => TRUE,
  );
  
  $form['eu_cookie_compliance_popup_message'] = array(
    '#type' => 'textarea',
    '#title' => t('Popup message'),
    '#default_value' => variable_get('eu_cookie_compliance_popup_message', ''),
    '#required' => TRUE
  );
  
  $form['eu_cookie_compliance_popup_link'] = array(
    '#type' => 'textfield',
    '#title' => t('Private policy link'),
    '#default_value' => variable_get('eu_cookie_compliance_popup_link', ''),
    '#size' => 60,
    '#maxlength' => 220,
    '#required' => TRUE,
    '#description' => 'Enter link to your privacy policy or other page that will explain cookies to your users.'  
  );  
  
  $form['eu_cookie_compliance_popup_height'] = array(
    '#type' => 'textfield',
    '#title' => t('Popup height in pixels'),
    '#default_value' => variable_get('eu_cookie_compliance_popup_height', 200),
    '#size' => 5,
    '#maxlength' => 5,
    '#required' => TRUE,
  );
  
  $form['eu_cookie_compliance_popup_width'] = array(
    '#type' => 'textfield',
    '#title' => t('Popup width in pixels or a percentage value'),
    '#default_value' => variable_get('eu_cookie_compliance_popup_width', '100%'),
    '#size' => 5,
    '#maxlength' => 5,
    '#required' => TRUE,
    '#description' => 'Enter desired width of the popup. This can be either an integer value or percentage of the screen width. For example: 200 or 50%'  
  );
  
  $form['eu_cookie_compliance_popup_delay'] = array(
    '#type' => 'textfield',
    '#title' => t('Popup time delay in seconds'),
    '#default_value' => variable_get('eu_cookie_compliance_popup_delay', 1),
    '#size' => 5,
    '#maxlength' => 5,
    '#required' => TRUE,
  );
  
  
  return system_settings_form($form); 
    
}


function eu_cookie_compliance_admin_form_validate($form, &$form_state) {
  if (!preg_match('/^[1-9][0-9]{0,4}$/',$form_state['values']['eu_cookie_compliance_popup_height'])) {
    form_set_error('eu_cookie_compliance_popup_height', t('Height must be an integer value.'));
  }
  if (!preg_match('/^[1-9][0-9]{0,4}$/', $form_state['values']['eu_cookie_compliance_popup_delay'])) {
    form_set_error('eu_cookie_compliance_popup_delay', t('Delay must be an integer value.'));
  }
  if (!preg_match('/^[1-9][0-9]{0,4}\%?$/', $form_state['values']['eu_cookie_compliance_popup_width'])) {
    form_set_error('eu_cookie_compliance_popup_width', t('Width must be an integer or a percentage value.'));
  }
}
