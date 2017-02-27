
var input, output;

function change() {
	output.value = process(input.value);
}




function process(val) {
	let cur = val;
	let tokens = [];
	let res;
	while (cur.length > 0) {
		if (/^\s/.test(cur)) {
			cur = cur.substring(1);
		} else if ((res = /^(?:[_a-zA-Z][_a-zA-Z0-9]*|[+-]?[0-9]+(?:\.[0-9]+)?)/.exec(cur))) {
			tokens.push(res[0]);
			cur = cur.substring(res[0].length);
		} else if (cur[0] == '[') {
			cur = _tokString(cur, tokens);
		} else {
			cur = _tokOther(cur, tokens);
		}
	}

	return tokens.map(t => '{' + t + '}').join(' ');
}

function _tokString(val, tokens) {		// TODO - Replace with token and remaining buffers to strip out the '\' escape char.
	let depth = 1;
	let ind = 1;
	while (ind < val.length && depth > 0) {
		if (val[ind] === '[') {
			depth++;
		} else if (val[ind] === ']') {
			depth--;
		} else if (val[ind] === '\\') {
			ind++;
		}
		ind++;
	}
	ind = Math.min(ind, val.length);
	tokens.push(val.substring(1, depth === 0 ? ind - 1 : ind));
	return val.substring(ind);
}

function _tokOther(val, tokens) {
	let ind = 1;
	while (ind < val.length && !/[\s_a-zA-Z0-9]/.test(val[ind])) {
		ind++;
	}
	tokens.push(val.substring(0, ind));
	return val.substring(ind);
}

window.onload = () => {
	input = document.getElementById('input');
	output = document.getElementById('output');
};
