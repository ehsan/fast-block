/**
 * Drawer Component
 *
 * Ghostery Browser Extension
 * https://www.ghostery.com/
 *
 * Copyright 2018 Ghostery, Inc. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0
 */

import React, { Component } from 'react';
import URLSearchParams from 'url-search-params';
import Header from '../containers/HeaderContainer';
import Drawer from '../containers/DrawerContainer';
import { sendMessage } from '../utils/msg';
/**
 * @class Implement base view with functionality common to all views.
 * @memberof PanelClasses
 */
class Panel extends React.Component {
	constructor(props) {
		super(props);

		// event bindings
		this.closeNotification = this.closeNotification.bind(this);
		this.clickReloadBanner = this.clickReloadBanner.bind(this);
		this.filterTrackers = this.filterTrackers.bind(this);
	}
	/**
	 * Lifecycle event
	 */
	componentDidMount() {
		sendMessage('ping', 'engaged');
		// try to get tabId from query string if available (FF for Android only)
		const tabId = new URLSearchParams(window.location.search).get('tabId');
		this.props.actions.getPanelData(tabId).then((data) => {
			if (data.is_expert) {
				// load Detail component
				this.props.history.push('/detail');
			}

			// persist whitelist/blacklist/paused_blocking notifications in the event that the
			// panel is openend without a page reload.
			if (Object.keys(data.needsReload.changes).length) {
				this.props.actions.showNotification({
					updated: 'init',
					reload: true,
				});
			}
		});
	}

	/**
	 * Close banner notification
	 * @param  {Object} event
	 * @todo  Why do we need explicit argument here?
	 */
	closeNotification(event) {
		const { notificationClasses } = this.props;
		let banner_status_name = '';

		if (notificationClasses.includes('hideous')) {
			banner_status_name = 'trackers_banner_status';
		} else if (notificationClasses.includes('warning') && (!notificationClasses.includes('alert') || !notificationClasses.includes('success'))) {
			banner_status_name = 'reload_banner_status';
		} else {
			banner_status_name = 'temp_banner_status';
		}

		this.props.actions.closeNotification({
			banner_status_name,
		});
	}

	/**
	 * Reload the current tab
	 * @param  {Object} event
	 * @todo  Why do we need explicit argument here?
	 */
	clickReloadBanner(event) {
		sendMessage('reloadTab', { tab_id: +this.props.tab_id });
		window.close();
	}
	/**
	 * Filter trackers when clicking on compatibility/slow
	 * tracker notifications and trigger appropriate action.
	 * @param  {Object} event
	 */
	filterTrackers(event) {
		const classes = event.target.className;
		if (!this.props.is_expert) {
			return;
		}

		if (classes.includes('slow-insecure')) {
			this.props.actions.filterTrackers({ type: 'trackers', name: 'warning-slow-insecure' });
		} else if (classes.includes('compatibility')) {
			this.props.actions.filterTrackers({ type: 'trackers', name: 'warning-compatibility' });
		} else {
			this.props.actions.filterTrackers({ type: 'trackers', name: 'warning' });
		}

		this.closeNotification();
	}
	/**
	 * Render all child views from router.
	 * @return {ReactComponent}   ReactComponent instance
	 */
	render() {
		// this prevents double rendering when waiting for getPanelData() to finish
		if (!this.props.initialized) {
			return null;
		}
		const needsReload = !!Object.keys(this.props.needsReload.changes).length;
		const calloutText = needsReload ? (
			<span>
				<span key="0">{ t('panel_needs_reload') }</span>
				<span key="1" className="needs-reload-link" onClick={this.clickReloadBanner}>{ t('panel_click_to_reload') }</span>
			</span>
		) : (this.props.notificationFilter === 'slow') ?
			<span>
				<span key="0" className="filter-link slow-insecure" onClick={this.filterTrackers} dangerouslySetInnerHTML={{ __html: this.props.notificationText }} />
				<span key="1">{ t('panel_tracker_slow_non_secure_end') }</span>
			</span>
			: (this.props.notificationFilter === 'compatibility') ?
				<span>
					<span key="0" className="filter-link compatibility" onClick={this.filterTrackers} dangerouslySetInnerHTML={{ __html: this.props.notificationText }} />
					<span key="1">{ t('panel_tracker_breaking_page_end') }</span>
				</span>
				: (
					<span dangerouslySetInnerHTML={{ __html: this.props.notificationText }} />
				);
		return (
			<div id="panel">
				<div className="callout-container">
					<div className={`${(!this.props.notificationShown ? 'hide ' : '') + this.props.notificationClasses} callout`}>
						<svg onClick={this.closeNotification} width="15px" height="15px" viewBox="0 0 15 15" className="close-button">
							<g>
								<path strokeWidth="3" strokeLinecap="round" d="M3,3 L12,12 M3,12 L12,3" />
							</g>
						</svg>
						<span className="callout-text" >
							{calloutText}
						</span>
					</div>
				</div>
				{ this.props.children }
				{ this.props.drawerIsOpen &&
					<Drawer
						smartBlock={this.props.smartBlock}
						enable_anti_tracking={this.props.enable_anti_tracking}
						enable_ad_block={this.props.enable_ad_block}
						enable_smart_block={this.props.enable_smart_block}
					/>
				}
			</div>
		);
	}
}

export default Panel;
