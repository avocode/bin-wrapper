'use strict';
const path = require('path');
const url = require('url');

/**
 * Initialize a new `BinWrapper`
 *
 * @param {Object} options
 * @api public
 */
module.exports = class BinWrapper {
	constructor(options = {}) {
		this.options = options;

		if (this.options.strip <= 0) {
			this.options.strip = 0;
		} else if (!this.options.strip) {
			this.options.strip = 1;
		}
	}

	/**
	 * Get or set files to download
	 *
	 * @param {String} src
	 * @param {String} os
	 * @param {String} arch
	 * @api public
	 */
	src(src, os, arch) {
		if (arguments.length === 0) {
			return this._src;
		}

		this._src = this._src || [];
		this._src.push({
			url: src,
			os,
			arch
		});

		return this;
	}

	/**
	 * Get or set the destination
	 *
	 * @param {String} dest
	 * @api public
	 */
	dest(dest) {
		if (arguments.length === 0) {
			return this._dest;
		}

		this._dest = dest;
		return this;
	}

	/**
	 * Get or set the binary
	 *
	 * @param {String} bin
	 * @api public
	 */
	use(bin) {
		if (arguments.length === 0) {
			return this._use;
		}

		this._use = bin;
		return this;
	}

	/**
	 * Get or set a semver range to test the binary against
	 *
	 * @param {String} range
	 * @api public
	 */
	version(range) {
		if (arguments.length === 0) {
			return this._version;
		}

		this._version = range;
		return this;
	}

	/**
	 * Get path to the binary
	 *
	 * @api public
	 */
	path() {
		return path.join(this.dest(), this.use());
	}
};

function flatten(arr) {
	return arr.reduce((acc, elem) => {
		if (Array.isArray(elem)) {
			acc.push(...elem);
		} else {
			acc.push(elem);
		}

		return acc;
	}, []);
}
