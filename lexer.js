// LEXER for the Englo lanugage
//------------------------------
// Heavily influenced by my purchased createyourownproglang book,
// but I'm recreating it in JavaScript so that I know I understand
// what's going on.
var Lexer = function(){
	var self = {};
	var KEYWORDS = ["def", "class", "if", "true", "false", "nil", "while"];

	self.tokenize = function(code){
		// Remove extra line breaks and tabs
		code = code.replace(/(\r\n|\n|\r|\t)/gm,"");

		// Replace multiple spaces with single spaces
		code = code.replace(/\s\s+/," ");

		// Current char position
		var i = 0;

		// Token list
		var tokens = [];
		var identifier, constant, number, string, operator;

		// Indent stack (i'm skipping this for now because I'm not
		// sure that I want to have idents be important)

		// Scanner: scan one character at a time until something
		// can be parsed
		while (i < code.length){
			var chunk = code.slice(i); // Grab from "i" until the end

			// Match for words (keywords or userdefined)
			if (identifier = /^([a-z]\w*)/.exec(chunk)){
				identifier = identifier[0];
				// Keywords: if, else, etc.
				if (KEYWORDS.indexOf(identifier) >= 0){
					tokens.push([identifier.toUpperCase(),identifier]);
				} else {
					// Non-keyword identifiers
					tokens.push(['IDENTIFIER', identifier]);
				}
				// Move the index past what we've read so far
				i += identifier.length;

			} else if (constant = /^([A-Z]\w*)/.exec(chunk)) {
				// class names and constants, starting with capitals
				tokens.push(['CONSTANT', constant[0]]);
				i += constant[0].length;

			} else if (number = /^([0-9]+)/.exec(chunk)) {
				tokens.push(['NUMBER', number[0]]);
				i += number[0].length;

			} else if (string = /^"(.*?)"/.exec(chunk)) {
				tokens.push(['STRING', string[0]]);
				i += string[0].length + 2; // Don't forget to add the quotes' lengths!

			} else if (operator = /^(\|\||&&|==|!=|<=|>=)/.exec(chunk)) {
				// Long operators
				tokens.push([operator[0], operator[0]]);

			} else if (/^ /.exec(chunk)){
				i+= 1; // Ignore remaining whitespace

			} else {
				// Catch all other single characters
				tokens.push([chunk[0], chunk[0]]);
				i += 1;
			}
		}

		return tokens;
	};

	return self;
}

//module.exports = Lexer;