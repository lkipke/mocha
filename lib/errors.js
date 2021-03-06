'use strict';
/**
 * @module Errors
 */
/**
 * Factory functions to create throwable error objects
 */

/**
 * Creates an error object to be thrown when no files to be tested could be found using specified pattern.
 *
 * @public
 * @param {string} message - Error message to be displayed.
 * @param {string} pattern - User-specified argument value.
 * @returns {Error} instance detailing the error condition
 */
function createNoFilesMatchPatternError(message, pattern) {
  var err = new Error(message);
  err.code = 'ERR_MOCHA_NO_FILES_MATCH_PATTERN';
  err.pattern = pattern;
  return err;
}

/**
 * Creates an error object to be thrown when the reporter specified in the options was not found.
 *
 * @public
 * @param {string} message - Error message to be displayed.
 * @param {string} reporter - User-specified reporter value.
 * @returns {Error} instance detailing the error condition
 */
function createInvalidReporterError(message, reporter) {
  var err = new TypeError(message);
  err.code = 'ERR_MOCHA_INVALID_REPORTER';
  err.reporter = reporter;
  return err;
}

/**
 * Creates an error object to be thrown when the interface specified in the options was not found.
 *
 * @public
 * @param {string} message - Error message to be displayed.
 * @param {string} ui - User-specified interface value.
 * @returns {Error} instance detailing the error condition
 */
function createInvalidInterfaceError(message, ui) {
  var err = new Error(message);
  err.code = 'ERR_MOCHA_INVALID_INTERFACE';
  err.interface = ui;
  return err;
}

/**
 * Creates an error object to be thrown when a behavior, option, or parameter is unsupported.
 *
 * @public
 * @param {string} message - Error message to be displayed.
 * @returns {Error} instance detailing the error condition
 */
function createUnsupportedError(message) {
  var err = new Error(message);
  err.code = 'ERR_MOCHA_UNSUPPORTED';
  return err;
}

/**
 * Creates an error object to be thrown when an argument is missing.
 *
 * @public
 * @param {string} message - Error message to be displayed.
 * @param {string} argument - Argument name.
 * @param {string} expected - Expected argument datatype.
 * @returns {Error} instance detailing the error condition
 */
function createMissingArgumentError(message, argument, expected) {
  return createInvalidArgumentTypeError(message, argument, expected);
}

/**
 * Creates an error object to be thrown when an argument did not use the supported type
 *
 * @public
 * @param {string} message - Error message to be displayed.
 * @param {string} argument - Argument name.
 * @param {string} expected - Expected argument datatype.
 * @returns {Error} instance detailing the error condition
 */
function createInvalidArgumentTypeError(message, argument, expected) {
  var err = new TypeError(message);
  err.code = 'ERR_MOCHA_INVALID_ARG_TYPE';
  err.argument = argument;
  err.expected = expected;
  err.actual = typeof argument;
  return err;
}

/**
 * Creates an error object to be thrown when an argument did not use the supported value
 *
 * @public
 * @param {string} message - Error message to be displayed.
 * @param {string} argument - Argument name.
 * @param {string} value - Argument value.
 * @param {string} [reason] - Why value is invalid.
 * @returns {Error} instance detailing the error condition
 */
function createInvalidArgumentValueError(message, argument, value, reason) {
  var err = new TypeError(message);
  err.code = 'ERR_MOCHA_INVALID_ARG_VALUE';
  err.argument = argument;
  err.value = value;
  err.reason = typeof reason !== 'undefined' ? reason : 'is invalid';
  return err;
}

/**
 * Creates an error object to be thrown when an exception was caught, but the `Error` is falsy or undefined.
 *
 * @public
 * @param {string} message - Error message to be displayed.
 * @returns {Error} instance detailing the error condition
 */
function createInvalidExceptionError(message, value) {
  var err = new Error(message);
  err.code = 'ERR_MOCHA_INVALID_EXCEPTION';
  err.valueType = typeof value;
  err.value = value;
  return err;
}

/**
 * Dynamically creates a plugin-type-specific error based on plugin type
 * @param {string} message - Error message
 * @param {"reporter"|"interface"} pluginType - Plugin type. Future: expand as needed
 * @param {string} [pluginId] - Name/path of plugin, if any
 * @throws When `pluginType` is not known
 * @public
 * @returns {Error}
 */
function createInvalidPluginError(message, pluginType, pluginId) {
  switch (pluginType) {
    case 'reporter':
      return createInvalidReporterError(message, pluginId);
    case 'interface':
      return createInvalidInterfaceError(message, pluginId);
    default:
      throw new Error('unknown pluginType "' + pluginType + '"');
  }
}

/**
 * Creates an error object to be thrown when a mocha object's `run` method is executed while it is already disposed.
 * @param {string} message The error message to be displayed.
 * @param {boolean} cleanReferencesAfterRun the value of `cleanReferencesAfterRun`
 * @param {Mocha} instance the mocha instance that throw this error
 */
function createMochaInstanceAlreadyDisposedError(
  message,
  cleanReferencesAfterRun,
  instance
) {
  var err = new Error(message);
  err.code = 'ERR_MOCHA_INSTANCE_ALREADY_DISPOSED';
  err.cleanReferencesAfterRun = cleanReferencesAfterRun;
  err.instance = instance;
  return err;
}

/**
 * Creates an error object to be thrown when a mocha object's `run` method is called while a test run is in progress.
 * @param {string} message The error message to be displayed.
 */
function createMochaInstanceAlreadyRunningError(message, instance) {
  var err = new Error(message);
  err.code = 'ERR_MOCHA_INSTANCE_ALREADY_RUNNING';
  err.instance = instance;
  return err;
}

module.exports = {
  createInvalidArgumentTypeError: createInvalidArgumentTypeError,
  createInvalidArgumentValueError: createInvalidArgumentValueError,
  createInvalidExceptionError: createInvalidExceptionError,
  createInvalidInterfaceError: createInvalidInterfaceError,
  createInvalidReporterError: createInvalidReporterError,
  createMissingArgumentError: createMissingArgumentError,
  createNoFilesMatchPatternError: createNoFilesMatchPatternError,
  createUnsupportedError: createUnsupportedError,
  createInvalidPluginError: createInvalidPluginError,
  createMochaInstanceAlreadyDisposedError: createMochaInstanceAlreadyDisposedError,
  createMochaInstanceAlreadyRunningError: createMochaInstanceAlreadyRunningError
};
