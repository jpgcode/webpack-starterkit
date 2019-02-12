// Custom handlebars Helpers

module.exports.reverseWord = function(value) {
    return value
      .split('')
      .reverse()
      .join('');
  };
