// app-util: version 5.01

function url_params()
{  
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	} 
	return query_string;
}

function datex_dma(datex) {
	if (datex) {
		var year = datex.substring( 0, 4)
		var month = datex.substring( 5, 7)
		var day = datex.substring( 8, 10)
		return day+'/'+month+'/'+year
	}
	//else return ''
}