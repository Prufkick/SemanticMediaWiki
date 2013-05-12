/**
 * This file is part of the Semantic MediaWiki Extension
 * @see https://semantic-mediawiki.org/
 *
 * @section LICENSE
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA
 *
 * @file
 *
 * @since 1.9
 * @ingroup SMW
 *
 * @licence GNU GPL v2+
 * @author Jeroen De Dauw <jeroendedauw at gmail dot com>
 * @author mwjames
 */

/**
 * Declares global smw instance and namespace
 *
 * @class smw
 */
var instance = ( function ( $ ) {
	'use strict';

	/*global console:true message:true */

	var instance = {};

	/**
	 * Outputs a debug log
	 *
	 * @since 1.8
	 *
	 * @return {string}
	 */
	instance.log = function( message ) {
		if ( typeof mediaWiki === 'undefined' ) {
			if ( typeof console !== 'undefined' ) {
				console.log( 'SMW: ', message );
			}
		} else {
			return mediaWiki.log.call( mediaWiki.log, 'SMW: ', message );
		}
	};

	/**
	 * Outputs a message
	 *
	 * @since 1.8
	 *
	 * @return {string}
	 */
	instance.msg = function() {
		if ( typeof mediaWiki === 'undefined' ) {
			message = window.wgSMWMessages[arguments[0]];

			for ( var i = arguments.length - 1; i > 0; i-- ) {
				message = message.replace( '$' + i, arguments[i] );
			}
			return message;
		} else {
			return mediaWiki.msg.apply( mediaWiki.msg, arguments );
		}
	};

	/**
	 * Returns SMW version
	 *
	 * @since 1.9
	 *
	 * @return {string}
	 */
	instance.version = function() {
		return mediaWiki.config.get( 'smw-config' ).version;
	};

	/**
	 * Declares methods to access utility functions
	 * @class smw.util
	 * @alias smw.Util
	 */
	instance.util = {

		/**
		 * Strip some illegal chars: control chars, colon, less than, greater than,
		 * brackets, braces, pipe, whitespace and normal spaces. This still leaves some insanity
		 * intact, like unicode bidi chars, but it's a good start..
		 *
		 * Borrowed from mw.Title
		 *
		 * @ignore
		 * @param {string} s
		 * @return {string}
		 */
		clean: function ( s ) {
			if ( s !== undefined ) {
				return s.trim().replace( /[\x00-\x1f\x23\x3c\x3e\x5b\x5d\x7b\x7c\x7d\x7f\s]+/g, '_' );
			}
		},

		/**
		 * Capitalizes the first letter of a string
		 *
		 * @ignore
		 * @param {string} s
		 * @return {string}
		 */
		capitalize: function( s ) {
			return s.charAt(0).toUpperCase() + s.slice(1);
		},

		/**
		 * Declares methods to access information about namespace settings
		 * @class smw.util.namespace
		 * @static
		 */
		namespace: {

			/**
			 * Returns list of available namespaces
			 *
			 * @since 1.9
			 *
			 * @return {Object}
			 */
			getList: function() {
				return instance.settings.get( 'namespace' );
			},

			/**
			 * Returns namespace Id
			 *
			 * @since 1.9
			 *
			 * @param {string} key
			 *
			 * @return {number}
			 */
			getId: function( key ) {
				if( typeof key === 'string' ) {
					return this.getList()[ instance.util.capitalize( instance.util.clean( key ) ) ];
				}
				return undefined;
			},

			/**
			 * Returns formatted localized name for a selected namespace
			 *
			 * @since 1.9
			 *
			 * @param {string} key
			 *
			 * @return {string}
			 */
			getName: function( key ) {
				if( typeof key === 'string' ) {
					var id = this.getId( key );
					return id && mediaWiki.config.get( 'wgFormattedNamespaces' )[id.toString()];
				}
				return undefined;
			}
		}

	};

	/**
	 * Declares methods to access information about available formats
	 * @class smw.formats
	 * @alias smw.Formats
	 */
	instance.formats = {

		/**
		 * Returns list of available formats
		 *
		 * @since 1.9
		 * @extends smw.formats
		 *
		 * @return {Object}
		 */
		getList: function() {
			return mediaWiki.config.get( 'smw-config' ).formats;
		},

		/**
		 * Returns localized name for  a select format
		 *
		 * @since 1.9
		 *
		 * @param {string} format
		 *
		 * @return {string}
		 */
		getName: function( format ) {
			if( typeof format === 'string' ){
				return this.getList()[ instance.util.clean( format ).toLowerCase() ];
			}
			return undefined;
		}
	};

	/**
	 * Access settings array
	 *
	 * @since 1.9
	 *
	 * @class smw.settings
	 * @alias smw.Settings
	 * @static
	 *
	 * @return {mixed}
	 */
	instance.settings = {

		/**
		 * Returns list of available settings
		 *
		 * @since 1.9
		 *
		 * @return {Object}
		 */
		getList: function() {
			return mediaWiki.config.get( 'smw-config' ).settings;
		},

		/**
		 * Returns a specific settings value (see SMW\Settings::get)
		 *
		 * @since 1.9
		 *
		 * @param  {string} setting to be selected
		 *
		 * @return {mixed}
		 */
		get: function( key ) {
			if( typeof key === 'string' ) {
				return this.getList()[key];
			}
			return undefined;
		}
	};

	// Alias
	instance.Util = instance.util;

	// Make invoked methods public
	return instance;

} )( jQuery );

// Assign namespace
window.smw = window.semanticMediaWiki = instance;

( function( $ ) { 'use strict'; $( document ).ready( function() {
} ); } )( jQuery );