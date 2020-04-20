<?php

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Plugin\CMSPlugin;

class PlgSystemYootoolbar extends CMSPlugin
{


	/**
	 * Method to include inline files contents to head and add scripts to customizer.
	 *
	 * @since  1.2.0
	 */
	public function onBeforeCompileHead()
	{
		$app = Factory::getApplication();
		if ($app->isClient('administrator') && $app->input->get('option') === 'com_ajax'
			&& $app->input->get('p') === 'customizer')
		{
			HTMLHelper::script('plg_system_yootoolbar/toolbar.js', ['version' => 'auto', 'relative' => true]);
			HTMLHelper::stylesheet('plg_system_yootoolbar/toolbar.css', ['version' => 'auto', 'relative' => true]);
		}

	}


}