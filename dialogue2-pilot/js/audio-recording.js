function captureMicrophone(callback) {
	if(microphone) {
		callback(microphone)
		return
	}

	if(typeof navigator.mediaDevices === 'undefined' || !navigator.mediaDevices.getUserMedia) {
		alert('This browser does not supports WebRTC getUserMedia API.')

		if(!!navigator.getUserMedia) {
			alert('This browser seems supporting deprecated getUserMedia API.')
		}
	}

	navigator.mediaDevices.getUserMedia({
		audio: isEdge ? true : {
			echoCancellation: false
		}
	}).then(function(mic) {
		callback(mic)
	}).catch(function(error) {
		alert('Unable to capture your microphone. Please check console logs.')
		console.error(error)
	})
}

var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob)

var recorder // globally accessible
var microphone
var btnRecordTime = document.getElementById('btn-record-time')

function click(el) {
	el.disabled = false // make sure that element is not disabled
	var evt = document.createEvent('Event')
	evt.initEvent('click', true, true)
	el.dispatchEvent(evt)
}

function getRandomString() {
	return (10*Math.random()).toString(36).replace(/\./g, '').substring(0, 6)
}

function padDigits(number, digits) {
	return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
function getFileName(fileExtension) {
	var d = new Date()
	var year = d.getFullYear()
	var month = padDigits(d.getMonth()+1, 2)
	var day = padDigits(d.getDate(), 2)
	return 'audio-' + year + "-" + month + "-" + day + '-' + getRandomString() + '.' + fileExtension
}

function saveToDisk(fileURL, fileName) {
	var save = document.createElement('a')
	save.href = fileURL
	save.download = fileName || 'unknown'
	save.style = 'display:noneopacity:0color:transparent'
	(document.body || document.documentElement).appendChild(save)

	if (typeof save.click === 'function') {
		save.click()
	} else {
		save.target = '_blank'
		var event = document.createEvent('Event')
		event.initEvent('click', true, true)
		save.dispatchEvent(event)
	}

	(window.URL || window.webkitURL).revokeObjectURL(save.href)
}

// Normally baseFilename == "ppn_taskName_trialNr", date is added by server
function uploadAudio(blob, baseFilename, onUploadProgress, onDone, onError) {
	var extension = blob.type.split('/')[1]
	console.log("extension: " + extension)
	var filename = baseFilename + "." + extension;
	console.log("filename: " + filename)
	var reader = new FileReader();
	reader.onload = function(event){
		var fd = {}
		fd["filename"] = filename
		fd["data"] = event.target.result
		$.ajax({
			xhr: function() {
				var xhr = new window.XMLHttpRequest();
				// Handler for upload progress
				xhr.upload.addEventListener("progress", function(evt) {
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						if (onUploadProgress) {
							onUploadProgress(percentComplete);
						}
					}
			   }, false);
			   // Handler for download progress:
			   // xhr.addEventListener("progress", function(evt) {}, false);
			   return xhr;
			},
			type: 'POST',
			url: 'save_audio.php',
			data: fd,
			dataType: 'text'
		}).done(function(data, textStatus, jqXHR) {
			if (onDone) {
				onDone(data); // data is server response?
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if (onError) {
				onError(errorThrown);
			}
		}).always(function() {
			
		});
	}
	reader.readAsDataURL(blob)
}


function stopRecordingCallback(ppn){
	console.log("stop recorder callback, ppn: " + ppn)
	var blob = recorder.getBlob()
	/*
	var filename = getFileName('ogg')
	console.log("blob: "+blob.size+" "+blob.type+filename)
	var file = new File([blob], fileName, {
		type: 'audio/ogg',
	})
	*/
	uploadAudio(blob, ppn)
}

var time = -1
function recordTime(t, ppn){
	// microphone is a MediaStream object
	console.log("recordTime, ppn: "+ppn)
	if (!microphone) {
		captureMicrophone(function(mic) {
			microphone = mic
			//click(btnRecordTime) // reclick after catching microphone
			recordTime(t, ppn)
		})
		return
	}

	console.log("microphone: " + microphone)
	var options = {
		type: 'audio',
		numberOfAudioChannels: 1,
		checkForInactiveTracks: true,
		bufferSize: 16384
	}
	// recorder is a MediaStreamRecorder object
	recorder = RecordRTC(microphone, options)
	console.log("recorder: " + recorder)
	recorder.startRecording()
	console.log("started recording")
	
	// stop
	setTimeout(function() {
		console.log("stop recorder")
		// stop recording
		recorder.stopRecording(function(){ stopRecordingCallback(ppn) } )
	
		// release microphone
		if(microphone) {
			microphone.stop()
			microphone = null
		}
	}, 1000*t)
}


function getRecorder(callback) {
	// microphone is a MediaStream object
	captureMicrophone(function(mic) {
		microphone = mic
		
		var options = {
			type: 'audio',
			numberOfAudioChannels: 1,
			checkForInactiveTracks: true,
			bufferSize: 16384
		}

		// recorder is a MediaStreamRecorder object
		recorder = RecordRTC(microphone, options)

		callback(recorder);
	});
}
