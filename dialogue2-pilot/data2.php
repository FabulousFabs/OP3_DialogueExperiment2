<?php
	// - if files list is given, parse these files as json and output as csv download
	//   in case of failure die with error message
	// - if no files list is given, show files in directory $dir and allow selection
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	ini_set('max_execution_time', 600);
	date_default_timezone_set('Europe/Amsterdam');
	$dir = "data";
	$debug = 0;
	if(array_key_exists('debug', $_REQUEST))
		$debug = 1;
		if(array_key_exists('debug', $_REQUEST) && $_REQUEST['debug']){
			$debug = $_REQUEST['debug'];
		}
	function scandirRecursive($dir) {
		$result = [];
		foreach(scandir($dir) as $filename) {
			if ($filename[0] === '.') continue;
			$filePath = $dir . '/' . $filename;
			if (is_dir($filePath)) {
				foreach (scandirRecursive($filePath) as $childFilename) {
					$result[] = $filename . '/' . $childFilename;
				}
			} else {
				$result[] = $filename;
			}
		}
		return $result;
	}

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

	function parseFile($shortFile){
		## turn file into php (assoc) array (list of assoc arrays really sort of)
		global $dir, $debug;
		$file = $dir . "/" . $shortFile;
		if($debug){
			#print("file: ${file}<br>");
		}
		if(!file_exists($file)){
			die("file ${file} does not exist");
		}

		$s = file_get_contents($file);
		
		$s = rtrim($s, ", \t\n\r\0\x0B"); # json cannot contain trailing comma's (unlike javascipt arrays)
		if(!preg_match ('/^\s*\[.*\]\s*$/s', $s)){ // if not already a json array 
			$s = "[" . $s . "]"; 
		}
		

		#if($debug)
			#print("json string:  ".$s);
			
		$a = json_decode($s, true); # to assoc array, not to object
		if($a===NULL){
			throw new Exception("json error in file '".$file."': ". json_last_error_string());
		}
		
		# add filename and linenumber 
		$i = 0;
		foreach ($a as &$line) {
			$line['fileName'] = $shortFile;
			$line['fileLine'] = $i++;
		}

		return $a;
	}

	function parseFiles($files){
		## turn list of files into php (assoc) array (memory intensive)
		$aa = array();
		foreach($files as $key => $file){
			$a = parseFile($file);
			$aa = array_merge($aa, $a);
		}
		return $aa;
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
		sort($keys); // alphabetical order of columns

		# second pass, produce csv
		$s = join(";", $keys)."\n"; # header
		for($i=0; $i<count($l); $i++){ # rows
			for($iKey=0; $iKey<count($keys); $iKey++){ # columns
				$key = $keys[$iKey];
				if(in_array($key, array_keys($l[$i])))
				if(array_key_exists($key, $l[$i])){
					//$s .= '"' . $l[$i][$key] . '"';
					$data = $l[$i][$key];
					if(is_array($data)){
						$data = join("", $data);
					}
					$s .= str_replace(",", ";", $data);
				}
				if($iKey<count($keys)-1)
					$s .= ";";
			}
			$s .= "\n";
		}
		return $s;
	}
	
	function parseHeads($files){
		# get columns heads from list of files
		$keys = array();
		foreach($files as $key => $file){
			$a = parseFile($file);
			for($i=0; $i<count($a); $i++){
				#print $l[$i]."\n";
				foreach ($a[$i] as $key => $value)
					if(!in_array($key, $keys))
						array_push($keys, $key);
			}
		}
		sort($keys); // alphabetical order of columns
		return $keys;
	}
	
	function printHeader($heads){
		print (join(";", $heads)."\n"); # header
	}
	
	function printBody($files, $keys){
		foreach($files as $key => $file){
			$l = parseFile($file);
			for($i=0; $i<count($l); $i++){ # rows
				$s = "";
				for($iKey=0; $iKey<count($keys); $iKey++){ # columns
					$key = $keys[$iKey];
					if(in_array($key, array_keys($l[$i])))
						if(array_key_exists($key, $l[$i])){
							$data = $l[$i][$key];
							if(is_array($data)){
								$data = join("", $data);
							}
							$s .= '"' . $data . '"';
							#$s .= str_replace(";", ",", $data); # replace inside data cells
						}
					if($iKey<count($keys)-1)
						$s .= ";";
				}
				print ($s. "\n");
			}
		}
	}
	
	if(array_key_exists('files', $_REQUEST) && $_REQUEST['files']){
		// list of files is given, return csv
		// parse errors cause mimetype text/html and exit
		$files = explode(';', urldecode($_REQUEST['files']));
		
		
		
		if($debug){
			header("Content-Type: text/plain");  // in browser
		} else {
			header("Content-Type: text/csv"); // download
			header('Content-Disposition: attachment; filename="data.csv"');
		}
		
		# in memory version
		# the following three lines are too memory intensive for large collections of files
		#$a = parseFiles($files);
		#$s = makeCsv($a);
		#print($s);
		
		# streaming version
		# first pass, the header
		$heads = parseHeads($files);
		printHeader($heads);
		printBody($files, $heads);
		
		# second pass, print the content
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
		if (inputs[i].type == "checkbox" && !inputs[i].disabled)
			inputs[i].checked = checked
	}
}
function toggleFiltered(){
	// toggle checkboxes that match the filter
	var filter = document.getElementById('filter').value
	inputs = document.getElementsByTagName('input')
	for (var i = 0; i < inputs.length; i++) { 
		if (inputs[i].type == "checkbox" && !inputs[i].disabled && inputs[i].name.indexOf(filter) !== -1)
			inputs[i].checked = !inputs[i].checked
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
	return true // default actihttps://kevinandkell.com/2019/kk0514.htmlon
}
</script>
</head>
<body>
<form method=post onsubmit='beforeSubmit(event, this)'>
<input type=hidden name=files id=files>
<table>
<tr><th><input type=submit value='download csv'></th><th><input type=text id=filter placeholder="filter"><input type=button value="filter toggle" onclick=toggleFiltered()></th></tr>
<tr><th width=10%><input type=checkbox id=all onclick='toggle(this.checked)'>all</th><th>file name</th><th>modified (server time)</th><th>bytes</th><th>lines</th></tr>
<?php
	// no list of files is given, show list of all files
	$files = scandirRecursive($dir);
	$i = 0;
	foreach($files as $file){
		if(substr($file, 0, 1) === ".") // don't show '..' and '.'
			continue;
		$mtime = date("Y-m-d H:i:s", filemtime("data/".$file));
		$bytes = filesize("data/".$file);
		try{
			$n = count(parseFile($file)); // slow
		} catch (Exception $e) {
			$n = "<span title='{$e}'>parse error</span>";
		}
		printf("<tr><td><input type=checkbox name='${file}'%s></td><td><a href='{$dir}/{$file}'>${file}</a></td><td>{$mtime}</td><td>${bytes}</td><td>{$n}</td></tr>\n", $n>0 ? "" : " disabled");
		$i++;
	}
?>
</table></form>
</body>
</html>
