let reference = document.querySelector("#reference").innerHTML;
let colors = document.querySelector("#colors");

function randIn(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function strEl(htmlString) {
	var div = document.createElement("div");
	div.innerHTML = htmlString.trim();
	return div.firstChild;
}

function randCol() {
	c = "0123456789ABCDEF";
	return (
		"#" +
		randIn(c).toString() +
		randIn(c).toString() +
		randIn(c).toString() +
		randIn(c).toString() +
		randIn(c).toString() +
		randIn(c).toString()
	);
}

function invertHex(hex) {
	hex = hex.substr(1);
	return (
		"#" +
		(Number(`0x1${hex}`) ^ 0xffffff)
			.toString(16)
			.substr(1)
			.toUpperCase()
	);
}

function makeBg(fg) {
	return invertHex(fg);
}

function addColorPane() {
	node = colors.appendChild(strEl(reference));
	fg = randCol();
	bg = makeBg(fg);
	node.style.background = bg;
	node.childNodes[7].innerHTML = bg;
}

function replaceMe(node) {
	node.parentNode.parentNode.removeChild(node.parentNode);
	addColorPane();
}

function updateColor(node) {
	node.parentNode.style.background = node.innerHTML;
}

function moveLeft(node) {
	if (node.previousSibling != null) {
		node.parentNode.insertBefore(node, node.previousSibling);
	}
}

function moveRight(node) {
	console.log("right");
	if (node.nextSibling != null) {
		console.log("not null");
		node.parentNode.insertBefore(node, node.nextSibling.nextSibling);
	}
}

function copyClip(str) {
	var el = document.createElement("textarea");
	el.value = str;
	el.setAttribute("readonly", "");
	el.style = { position: "absolute", left: "-9999px" };
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
}

function exportCSS() {
	ret = "/* Usage: 'color: var(--1)' */\n\n:root {";
	cols = document.querySelectorAll(".colorLabel");
	for (var i = 1; i < cols.length; i++) {
		ret += `\n  --${i}: ${cols[i].innerHTML};`;
	}
	ret += "\n}";
	copyClip(ret);
	alert("Copied CSS to clipboard");
}

function exportPerma() {
	ret = "https://query.design/colors/#";
	cols = document.querySelectorAll(".colorLabel");
	for (var i = 1; i < cols.length; i++) {
		ret += cols[i].innerHTML.substr(1);
	}
	copyClip(ret);
	alert('Copied link to clipboard');
}

url = new URL(window.location.href);

for (var i = 0; i < 5; i++) {
	addColorPane();
}

if (window.location.href.indexOf('#') > 0) {
	cls = window.location.href.split('#')[1];
	colors.childNodes[1].childNodes[7].innerHTML = '#' + cls.substr(0,6);
	colors.childNodes[2].childNodes[7].innerHTML = '#' + cls.substr(6,6);
	colors.childNodes[3].childNodes[7].innerHTML = '#' + cls.substr(12,6);
	colors.childNodes[4].childNodes[7].innerHTML = '#' + cls.substr(18,6);
	colors.childNodes[5].childNodes[7].innerHTML = '#' + cls.substr(24,6);
	colors.childNodes[1].childNodes[7].dispatchEvent(new Event('focusout'));
	colors.childNodes[2].childNodes[7].dispatchEvent(new Event('focusout'));
	colors.childNodes[3].childNodes[7].dispatchEvent(new Event('focusout'));
	colors.childNodes[4].childNodes[7].dispatchEvent(new Event('focusout'));
	colors.childNodes[5].childNodes[7].dispatchEvent(new Event('focusout'));
}