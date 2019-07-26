var trim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;

function jsolParse(text) {
  // make sure text is a "string"
  if (typeof text !== "string" || !text) {
    return null;
  }
  // Make sure leading/trailing whitespace is removed
  text = text.replace(trim, "");
  // Make sure the incoming text is actual JSOL (or Javascript Object Literal)
  // Logic borrowed from http://json.org/json2.js
  if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
    .replace(/(?:^|:|,)(?:\s*\[)+/g, ":")
    /** everything up to this point is json2.js **/
    /** this is the 5th stage where it accepts unquoted keys **/
    .replace(/\w*\s*\:/g, ":"))) {
    return (new Function("return " + text))();
  }
  else {
    throw ("Invalid JSOL: " + text);
  }
}

module.exports = jsolParse;