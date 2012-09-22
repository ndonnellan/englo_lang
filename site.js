// Code for website actions
function setLexerOutput(){
	var lex = new Lexer();
	var text = document.getElementById("code").value;
	var tokens = lex.tokenize(text);
	var outputString = "";

	// List all the tokens "Name: Value", each on a new line
	for (var i = 0; i < tokens.length; i++){
		outputString += tokens[i][0] + ": " + tokens[i][1] + "&#13;&#10;";
	}

	// Set the lexer output field
	var lexerOutput = document.getElementById("lexer_output");
	lexerOutput.rows = tokens.length;
	lexerOutput.innerHTML = outputString;
}