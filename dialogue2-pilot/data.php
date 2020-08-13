<?php
	// - if files list is given, parse these files as json and output as csv download
	//   in case of failure die with error message
	// - if no files list is given, show files in directory $dir and allow selection
	$dir = "data";
	$debug = 0;
	if(array_key_exists('debug', $_REQUEST))
		$debug = 1;
		if($_REQUEST['debug'])
			$debug = $_REQUEST['debug'];

	function json_last_error_string(){
		switch (json_last_error()) {
			case JSON_ERROR_NONE:
				return ' - No errors';
			case JSON_ERROR_DEPTH:
				return ' - Maximum stack depth exceeded';
			case JSON_ERROR_STATE_MISMATCH:
				return ' - Underflow or the modes mismatch';
			case JSON_ERROR_CTRL_CHAR:
				return ' - Unexpected control character found';
			case JSON_ERROR_SYNTAX:
				return ' - Syntax error, malformed JSON';
			case JSON_ERROR_UTF8:
				return ' - Malformed UTF-8 characters, possibly incorrectly encoded';
			default:
				return ' - Unknown error';
		}
	}

	function parseFiles($files){
		## turn list of files into php (assoc) array
		$aa = array();
		foreach($files as $key => $file){
			$a = parseFile($file);
			$aa = array_merge($aa, $a);
		}
		return $aa;
	}
	
	function parseFile($shortFile){
		## turn file into php (assoc) array
		global $dir, $debug;
		$file = $dir . "/" . $shortFile;
		if($debug){
			print("file: ${file}<br>");
		}
		if(!file_exists($file)){
			die("file ${file} does not exist");
		}

		$s = file_get_contents($file);
		
		$s = rtrim($s, ", \t\n\r\0\x0B"); # json cannot contain trailing comma's (unlike javascipt arrays)
		if(!preg_match ('/^\s*\[.*\]\s*$/s', $s)){ // if not already a json array 
			$s = "[" . $s . "]"; 
		}
		

		if($debug)
			print("json string:  ".$s);
			
		$a = json_decode($s, true); # to assoc array, not to object
		if($a===NULL){
			die("json error in file '".$file."': ". json_last_error_string());
		}
		
		# add filename and linenumber 
		$i = 0;
		foreach ($a as &$line) {
			$line['fileName'] = $shortFile;
			$line['fileLine'] = $i++;
		}

		return $a;
	}

	function makeCsv($l){
		## turn array (list of dictionaries) into csv
		
		# first pass, get all the keys
		$keys = array();
		for($i=0; $i<count($l); $i++){
			#print $l[$i]."\n";
			foreach ($l[$i] as $key => $value)
				if(!in_array($key, $keys))
					array_push($keys, $key);
		}

		# second pass, produce csv
		$s = join(",", $keys)."\n"; # header
		for($i=0; $i<count($l); $i++){ # rows
			for($iKey=0; $iKey<count($keys); $iKey++){ # columns
				$key = $keys[$iKey];
				if(in_array($key, array_keys($l[$i])))
					//$s .= '"' . $l[$i][$key] . '"';
					$s .= str_replace(",", ";", $l[$i][$key]);
				if($iKey<count($keys)-1)
					$s .= ",";
			}
			$s .= "\n";
		}
		return $s;
	}
		
	if($_REQUEST['files']){
		// list of files is given, return csv
		// parse errors cause mimetype text/html and exit
		$files = explode(';', urldecode($_REQUEST['files']));
		$a = parseFiles($files);

		$s = makeCsv($a);
		if($debug)
			header("Content-Type: text/plain");  // in browser
		else
			header("Content-Type: text/csv"); // download
			header('Content-Disposition: attachment; filename="data.csv"');
		print($s);
		exit();
	}
?>
<!DOCTYPE html>
<html>
<head>
<title>Data retrieval</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link rel="stylesheet" href="//cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<style>
table {
  border: 1px solid #1C6EA4;
  background-color: #EEEEEE;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
table td, table th {
  border: 1px solid #AAAAAA;
  padding: 3px 2px;
}
table tbody td {
  font-size: 13px;
}
table tr:nth-child(even) {
  background: #D0E4F5;
}
table thead {
  background: #1C6EA4;
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  border-bottom: 2px solid #444444;
}
table thead th {
  font-size: 15px;
  font-weight: bold;
  color: #FFFFFF;
  border-left: 2px solid #D0E4F5;
}
table thead th:first-child {
  border-left: none;
}

table tfoot {
  font-size: 14px;
  font-weight: bold;
  color: #FFFFFF;
  background: #D0E4F5;
  background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
  border-top: 2px solid #444444;
}
table tfoot td {
  font-size: 14px;
}link rel="stylesheet" href="data.css"
table tfoot .links {
  text-align: right;
}
table tfoot .links a{
  display: inline-block;
  background: #1C6EA4;
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: 5px;
}
</style>
<script src="//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script defer>
function toggle(checked){
	// check or uncheck all checkboxes
	inputs = document.getElementsByTagName('input')
	for (var i = 0; i < inputs.length; i++) { 
		if (inputs[i].type == "checkbox")
			inputs[i].checked = checked
	}
}
function beforeSubmit(event, element){
	// get checked files from form
	inputs = document.getElementsByTagName('input')
	var files = []
	for (var i = 0; i < inputs.length; i++) { 
		if (inputs[i].type == "checkbox" && inputs[i].checked && inputs[i].id != "all"){
			files.push(encodeURIComponent(inputs[i].name)) 
			inputs[i].name = "" // remove checkboxes from query
		}
	}

	var e = document.getElementById('files')
	e.value = files.join(';')
	return true // default action
}
</script>
</head>
<body>
<form method=get onsubmit='beforeSubmit(event, this)'>
<input type=hidden name=files id=files>
<table>
<tr><th width=10%><input type=checkbox id=all onclick='toggle(this.checked)'>all</th><th>file name</th></tr>
<?php
	// no list of files is given, show list of all files
	$files = scandir($dir);
	foreach($files as $file){
		if(substr($file, 0, 1) === ".")
			continue;
		print("<tr><td><input type=checkbox name='${file}'></td><td>${file}</td></tr>\n");
	}
?>
<tr><th colspan=2><input type=submit value='make csv'></th></tr>
</table></form>
</body>
</html>
