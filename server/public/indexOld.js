function parseWorkerString(workObj) {
	console.log('str', workObj);
	for (let worker in workObj) {

	}
	var res = [];
	workers.forEach(function(worker, i) {
		var splitter = worker.split("@@");
		var selectValue = [];
		var hashrate = parseInt(splitter[1]);
		for (var j = 0; j < 10; j++ ) {
			console.log("i",j);
			console.log("parseInt(hashrate*(0.5+0.05*i))",parseInt(hashrate*(0.5+0.05*j)));
			selectValue[j] = parseInt(hashrate*(0.5+0.05*j));
		}
		console.log("selectValue",selectValue);
		worker += "@@<select class='form-control specialSelect' ><option value ='" + selectValue[0] + "'>" + selectValue[0] + "</option><option value ='" + selectValue[1] + "'>" + selectValue[1] + "</option><option value ='" + selectValue[2] + "'>" + selectValue[2] + "</option><option value ='" + selectValue[3] + "'>" + selectValue[3] + "</option><option value ='" + selectValue[4] + "'>" + selectValue[4] + "</option><option value ='" + selectValue[5] + "'>" + selectValue[5] + "</option><option value ='" + selectValue[6] + "'>" + selectValue[6] + "</option><option value ='" + selectValue[7] + "'>" + selectValue[7] + "</option><option value ='" + selectValue[8] + "'>" + selectValue[8] + "</option><option value ='" + selectValue[9] + "'>" + selectValue[9] + "</option></select>";
		if (i > 0) {
			res.push(worker);
		}
	});
	return res;
}
function createTableString(table, arr) {
	console.log(table);
	// table.innerHTML = "<thead><tr><th>Worker</th><th>Hashrate</th><th>Reported Hashrate</th></tr></thead><tbody id="workersBody"></tbody>";
	table.innerHTML = "";
	var header = table.createTHead();
	var row = header.insertRow(0);
	var cell0 = row.insertCell(0);
	var cell1 = row.insertCell(1);
	var cell2 = row.insertCell(2);
	var cell3 = row.insertCell(3);
	cell0.innerHTML = "<b>Worker</b>";
	cell1.innerHTML = "<b>Hashrate</b>";
	cell2.innerHTML = "<b>Reported Hashrate</b>";
	cell3.innerHTML = "<b>Limit To send sms</b>";
	console.log("arr",arr);
	arr.forEach(function(el, i) {
		console.log(el);
		var row = table.insertRow(i + 1);
		el.forEach(function(elEl, iEl) {
			var col = row.insertCell(iEl);
			col.innerHTML = elEl;
		});
	});
	$(".specialSelect").editableSelect();
}
function refreshTable(obj) {
	var table = $("#workers")[0];
	var workers = parseWorkerString(obj);
	createTableString(table, workers);
}

function sendSMS(data, num) {
	console.log(value);
}
function getData() {
	$.get("http://localhost:1337/api/", {
		id: $("#id").val(),
		time: $("#time").val(),
		minimum: $("#minimum").val()
	}, function(data) {
		refreshTable(JSON.parse(data));
	});
}

function main() {
	$("#start").on("click", function() {
		var time = +$("#time").val() * 1000;
		getData();
		var interval = setInterval(getData, time);
	})
}
$(document).ready(main);
