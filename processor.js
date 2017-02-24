
var input, output;

function change() {
	output.value = process(input.value);
}

function process(val) {
	let regex = /[_a-zA-Z][_a-zA-Z0-9]*|[+-]?[0-9]+|[-+*/%^]+|'(?:\\'|[^'])*'/g;
	let res;
	let tokens = [];
	while ((res = regex.exec(val))) {
		tokens.push('[' + res[0] + ']');
	}

	return tokens.join(' ');
}

window.onload = () => {
	input = document.getElementById('input');
	output = document.getElementById('output');
};
