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
 * @author mwjames
 */

/**
 * Tests methods provided by ext.smw.js
 *
 */
( function ( $, mw, smw ) {
	'use strict';

	QUnit.module( 'ext.smw', QUnit.newMwEnvironment() );

	/**
	 * Test initialization and accessibility
	 *
	 * @since: 1.9
	 */
	QUnit.test( 'init', 14, function ( assert ) {

		assert.ok( smw instanceof Object, 'the smw instance was accessible' );

		assert.equal( $.type( smw.log ), 'function', '.log() was accessible' );
		assert.equal( $.type( smw.msg ), 'function','.msg() was accessible' );

		assert.equal( $.type( smw.settings.getList ), 'function', '.settings.getList() was accessible' );
		assert.equal( $.type( smw.settings.get ), 'function', '.settings.get() was accessible' );

		assert.equal( $.type( smw.formats.getName ), 'function', '.formats.getName() was accessible' );
		assert.equal( $.type( smw.formats.getList ), 'function', '.formats.getList() was accessible' );

		assert.equal( $.type( smw.util.clean ), 'function', '.util.clean() was accessible' );
		assert.equal( $.type( smw.util.capitalize ), 'function', '.util.capitalize() was accessible' );		assert.equal( $.type( smw.util.namespace ), 'object', '.settings.ns object was accessible' );
		assert.equal( $.type( smw.util.namespace.getList ), 'function', '.util.namespace.getList() was accessible' );
		assert.equal( $.type( smw.util.namespace.getId ), 'function', '.util.namespace.getId() was accessible' );
		assert.equal( $.type( smw.util.namespace.getName ), 'function', '.util.namespace.getName() was accessible' );

		assert.equal( $.type( smw.version ), 'function', '.version() was accessible' );

	} );

	/**
	 * Test settings function
	 *
	 * @since: 1.9
	 */
	QUnit.test( 'settings', 4, function ( assert ) {

		assert.equal( $.type( smw.settings.getList() ), 'object', '.getList() returned a list of settings object' );
		assert.equal( $.type( smw.settings.get( 'smwgQMaxLimit' ) ), 'number', '.get( "smwgQMaxLimit" ) returned a value for the key' );
		assert.equal( smw.settings.get( 'lula' ), undefined, '.get( "lula" ) returned undefined for an unknown key' );
		assert.equal( smw.settings.get(), undefined, '.get() returned undefined for an empty key' );

	} );

	/**
	 * Test util function
	 *
	 * @since: 1.9
	 */
	QUnit.test( 'util', 3, function ( assert ) {

		assert.equal( smw.util.clean( ' Foo | ; : - < >_= () {} bar ' ), 'Foo_;_:_-__=_()_bar', '.clean() returned a cleaned string' );
		assert.equal( smw.util.clean( 'Foo | ; : - < >_= () {} bar' ), 'Foo_;_:_-__=_()_bar', '.clean() returned a cleaned string' );
		assert.equal( smw.util.capitalize( 'foo Foo bar' ), 'Foo Foo bar', '.capitalize() returned a capitalized string' );

	} );

	/**
	 * Test namespace function
	 *
	 * @since: 1.9
	 */
	QUnit.test( 'util.namespace', 7, function ( assert ) {

		assert.equal( $.type( smw.util.namespace.getList() ), 'object', '.getList() returned a list of namespaces' );

		assert.equal( $.type( smw.util.namespace.getId( 'property' ) ), 'number', '.getId( "property" ) returned a number' );
		assert.equal( $.type( smw.util.namespace.getId( 'Property' ) ), 'number', '.getId( "Property" ) returned a number' );
		assert.equal( $.type( smw.util.namespace.getId( 'concept' ) ), 'number', '.getId( "concept" ) returned a number' );
		assert.equal( smw.util.namespace.getId( 'lula' ), undefined, '.getId( "lula" )  returned undefined for an unknown key' );

		assert.equal( $.type( smw.util.namespace.getName( 'property' ) ), 'string', '.getName( "property" ) returned a string' );
		assert.equal( smw.util.namespace.getName( 'lula' ), undefined, '.getName( "lula" ) returned undefined for an unknown key' );

	} );

	/**
	 * Test formats function
	 *
	 * @since: 1.9
	 */
	QUnit.test( 'formats', 7, function ( assert ) {

		assert.equal( $.type( smw.formats.getList() ), 'object', '.getList() returned an object' );
		assert.equal( $.type( smw.formats.getName( 'table' ) ), 'string', '.getName( "table" ) returned a string' );
		assert.equal( $.type( smw.formats.getName( ' table ' ) ), 'string',  '.getName( " table " ) returned a string' );
		assert.equal( $.type( smw.formats.getName( 'Table' ) ), 'string', '.getName( "Table" ) returned a string' );

		assert.equal( smw.formats.getName( 'lula' ), undefined, '.getName() returned undefined for an unknown key' );
		assert.equal( smw.formats.getName( 123456 ), undefined, '.getName() returned undefined for an unknown key' );
		assert.equal( smw.formats.getName(), undefined, '.getName() returned undefined for an empty key' );

	} );

	/**
	 * Test version function
	 *
	 * @since: 1.9
	 */
	QUnit.test( 'version', 1, function ( assert ) {

		assert.equal( $.type( smw.version() ), 'string', '.version() returned a string' );

	} );

}( jQuery, mediaWiki, semanticMediaWiki ) );