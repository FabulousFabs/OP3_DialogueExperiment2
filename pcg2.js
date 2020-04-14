// conversation plugin

jsPsych.plugins['conversation-pcg'] = (function(){
  jsPsych.pluginAPI.registerPreload('conversation-pcg', 'stimulus', 'image');
  jsPsych.pluginAPI.registerPreload('conversation-pcg', 'stimulus', 'audio');

  var txt = {
      btnStopRecording: 'Opname stoppen',
      btnContinue: 'Verdergaan',
      titleInstructionT1: 'Hoe zou je deze objecten waarderen?',
      titleInstructionT2: 'Ben je het eens met de waardering van de beoordelaar?',
      statusInitializing: 'Initialeseren',
      statusRecording: 'Aan het opnemen...',
      statusStoppingRecording: 'Even geduld alsjeblieft',
      statusUploading: 'Opslaan',
      statusDone: 'Klaar',
  }

  var maxRecordingTime = 30000;
  var stopRecordingDelay = 1000;

  var keycharacter_disagree = 'z';
  var keycharacter_agree = 'm';
  var keycode_disagree = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(keycharacter_disagree);
  var keycode_agree = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(keycharacter_agree);
  var audioDelay = 300; // delay of onset of audio stimuli

  var plugin = {};

  plugin.info = {
      name: 'conversation-pcg',
      parameters: {
          imgFileLeft: {
              type: jsPsych.plugins.parameterType.IMAGE, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
              default: undefined,
              pretty_name: 'Image filename (left)',
              description: 'Filename of the image to be displayed on left (no path)'
          },
          imgFileRight: {
            type: jsPsych.plugins.parameterType.IMAGE,
            default: undefined,
            pretty_name: 'Image filename (right)',
            description: 'Filename of the image to be displayed on right (no path)'
          },
          imgDir: {
              type: jsPsych.plugins.parameterType.STRING,
              default: "",
              pretty_name: 'Image dir',
              description: 'Directory where images are stored, relative to main html file'
          },
          audDir: {
            type: jsPsych.plugins.parameterType.STRING,
            default: "",
            pretty_name: 'Audio directory',
            description: 'Directory where audio are stored, relative to main html file'
          },
          audFile: {
            type: jsPsych.plugins.parameterType.AUDIO,
            default: undefined,
            pretty_name: 'Audio stimulus',
            description: 'Audio file to be played during trial (if any)'
          },
          block: {
            type: jsPsych.plugins.parameterType.INT,
            default: 0,
            pretty_name: 'Block',
            description: 'Block the stimulus is presented in.'
          },
          stimIndex: {
              type: jsPsych.plugins.parameterType.INT,
              default: 0,
              pretty_name: 'Stimulus index',
              description: 'Number that uniquely identifies the stimulus, used to show progress (4/100) and for saving data'
          },
          lastStimIndex: {
              type: jsPsych.plugins.parameterType.INT,
              default: 0,
              pretty_name: 'Last stimulus index',
              description: 'Number of the last image (used to show progress: 4/100)'
          },
          ppn: {
              type: jsPsych.plugins.parameterType.INT,
              default: 1,
              pretty_name: 'Proefpersoon nummer',
              description: 'Participant number, used for saving data'
          },
          list: {
            type: jsPsych.plugins.parameterType.INT,
            default: 0,
            pretty_name: 'List number',
            description: 'The list of stimuli that this belong to.'
          },
      }
  }

  plugin.trial = function(display_element, trial) {
    console.log("Working on trial", trial);

    var data = {
      ppn: trial.ppn,
      list: trial.list,
      stimIndex: trial.stimIndex,
      block: trial.block,
      imgFileLeft: trial.imgFileLeft,
      imgFileRight: trial.imgFileRight,
      timeShow: null, // images are shown
      timeStartRec: null, // recording of participant is started
      timeStopRec: null, // recording of participant is stopped
      timeAudioStart: null, // audio file is presented to participant
      timeAudioEnd: null, // audio file presentation is stopped
      respKey: null, // the response key given by the participant
      respTime: null, // reaction time
      timeStartUpload: null, // starting time of upload
      timeStopUpload: null, // stopping time of upload
      timeContinue: null // time the participant asked for the next stimulus
    };

    var isAudTrial = function(t) {
      if (typeof(t) !== 'undefined') {
        if (!['pp', 'participant', 'undefined', undefined, null, 'null'].includes(t)) {
          return true;
        }
      }
      return false;
    };

    var endTrial = function(){
      jsPsych.pluginAPI.clearAllTimeouts();
      display_element.innerHTML = '';
      jsPsych.finishTrial(data);
    };

    if (!isAudTrial(trial.audFile)) {
      // trial of participant speaking
      var uploadAudioFile = function(blob){
        var onProgress = function(percentage) {
            progress.attr('value', Math.round(percentage*100));
        }
        var onDone = function(serverResponse) {
            // Done uploading, allow user to continue
            status.html(txt.statusDone);
            progress.attr('value', 100);
            btnContinue.prop('disabled', false);
            data.timeStopUpload = Date.now();
        }
        var onError = function(err) {
            // Audio file could not be uploaded
            // Show alert and keep continue button disabled
            status.html("Error uploading audio: "+err);
            alert("Error uploading audio: '"+err+"'. Do you have a stable internet connection?\nPlease restart the experiment or contact the experimenter.")
        }

        status.html(txt.statusUploading);
        progress.attr('value', 0);

        data.timeStartUpload = Date.now();
        var date = new Date();
        var datestr = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "_" + ("0" + date.getHours()).slice(-2) + "-" + ("0" + date.getMinutes()).slice(-2) + "-" + ("0" + date.getSeconds()).slice(-2);
        var filename = "ppn" + trial.ppn + "_main_list" + list_number + "_stim" + trial.stimIndex + "_time" + datestr;
        uploadAudio(blob, filename, onProgress, onDone, onError);
      };

      var handleDoneClick = function() {
        if (data.timeStopRec === null) {
            // Stop recording and then start uploading
            data.timeStopRec = Date.now();

            status.html(txt.statusStoppingRecording)
            btnDone.prop('disabled', true);
            btnContinue.prop('disabled', true);

            jsPsych.pluginAPI.setTimeout(function() {
                recorder.stopRecording(function() {
                    var blob = recorder.getBlob();
                    uploadAudioFile(blob);
                });
            }, stopRecordingDelay);
        }
      }

      var handleContinueClick = function() {
          if (data.timeContinue === null) {
              data.timeContinue = Date.now();

              btnDone.prop('disabled', true);
              btnContinue.prop('disabled', true);

              endTrial();
          }
      }

      var container = $(
          '<div id="naming">'+
              '<div id="instruction"></div>'+
              '<div id="stimulus-container">'+
                  '<img id="stimulus-left" src="" />'+
                  '<img id="stimulus-right" src="" />'+
              '</div>'+
              '<div id="status"></div>'+
              '<progress id="progress" value="0" max="100"></progress>'+
              '<div id="controls">'+
                  '<button id="btn-done" class="jspsych-btn">'+txt.btnStopRecording+'</button>'+
                  '<button id="btn-continue" class="jspsych-btn">'+txt.btnContinue+'</button>'+
              '</div>'+
          '</div>'
      );

      var instruction = container.find('#instruction');
      var btnDone = container.find('#btn-done');
      var btnContinue = container.find('#btn-continue');
      var img_l = container.find('#stimulus-left');
      var img_r = container.find('#stimulus-right');
      var status = container.find('#status');
      var progress = container.find('#progress');

      // Clear the display and add the container
      display_element.innerHTML = '';
      container.appendTo(display_element);

      // Set instruction and image
      instruction.html((trial.stimIndex+1) + "/" + (trial.lastStimIndex+1) + "<br>" + txt.titleInstructionT1);
      img_l.attr('src', trial.imgDir+"/"+trial.imgFileLeft);
      img_r.attr('src', trial.imgDir+"/"+trial.imgFileRight);
      data.timeShow = Date.now();

      // Initialize buttons and status
      status.html(txt.statusInitializing);
      btnDone.prop('disabled', true);
      btnContinue.prop('disabled', true);
      btnDone.on('click', handleDoneClick);
      btnContinue.on('click', handleContinueClick);

      // Get recording and when found, start recording
      var recorder = null;
      getRecorder(function(rec) {
            data.timeStartRec = Date.now();
            recorder = rec;
            recorder.startRecording();
            status.html(txt.statusRecording);
            btnDone.prop('disabled', false);
            progress.attr('value', null); // Set progress to indeterminate

            // After a max time, stop recording
            jsPsych.pluginAPI.setTimeout(function() {
                  if (!btnDone.prop('disabled')) {
                      btnDone.click();
                  }
              }, maxRecordingTime);
      });
    } else {
        // trial of participant listening
        var handleKey = function(e) {
            if ([keycode_disagree, keycode_agree].includes(e.key)) {
              jsPsych.pluginAPI.cancelKeyboardResponse(key_listener);

              data.respKey = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(e.key);
              data.respTime = e.rt;
              data.timeContinue = Date.now();

              end_audio_events();
              endTrial();
            }
        }

        var key_listener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: handleKey,
          valid_responses: jsPsych.ALL_KEYS,
          rt_method: 'performance',
          persist: true
        });

        var container = $(
            '<div id="naming">'+
                '<div id="instruction"></div>'+
                '<div id="stimulus-container">'+
                    '<img id="stimulus-left" src="" />'+
                    '<img id="stimulus-right" src="" />'+
                '</div>'+
            '</div>'
        );

        var instruction = container.find('#instruction');
        var img_l = container.find('#stimulus-left');
        var img_r = container.find('#stimulus-right');

        // Clear the display and add the container
        display_element.innerHTML = '';
        container.appendTo(display_element);

        // Set instruction and image
        instruction.html((trial.stimIndex+1) + "/" + (trial.lastStimIndex+1) + "<br>" + txt.titleInstructionT2);
        img_l.attr('src', trial.imgDir+"/"+trial.imgFileLeft);
        img_r.attr('src', trial.imgDir+"/"+trial.imgFileRight);
        data.timeShow = Date.now();

        // Setup audio stimulus
        var context = jsPsych.pluginAPI.audioContext();
        if (context !== null){
          var source = context.createBufferSource();
          source.buffer = jsPsych.pluginAPI.getAudioBuffer(trial.audDir + "/" + trial.audFile);
          source.connect(context.destination);
        } else {
          var audio = jsPsych.pluginAPI.getAudioBuffer(trial.audDir + "/" + trial.audFile);
          audio.currentTime = 0;
        }

        var end_audio = function() {
          data.timeAudioEnd = Date.now();

          if (context !== null) {
            source.stop();
          } else {
            audio.pause();
          }
        };

        var end_audio_events = function() {
          if (context !== null) {
            source.onended = function(){};
          } else {
            audio.removeEventListener('ended', end_audio);
          }
        };

        // Add event listeners
        if (context !== null) {
            source.onended = end_audio;
        } else {
          audio.addEventListener('ended', end_audio);
        }

        // Play audio
        data.timeAudioStart = Date.now();
        jsPsych.pluginAPI.setTimeout(function(){
          if (context !== null) {
            startTime = context.currentTime;
            source.start(startTime);
          } else {
            audio.play();
          }
        }, audioDelay);
    }
  }

  return plugin;
})();


// Note: returns array of numbers, not strings
function getcompletedTrials() {
    var str = localStorage.getItem("completedTrials_L" + list_number);
    if (str == null) {
        return [];
    } else {
        var arr = str.split(",");
        arr = arr.map(function(val) { return parseInt(val); });
        return arr;
    }
}

function addCompletedImage(imgIndex) {
    var arr = getcompletedTrials();
    arr.push(imgIndex);
    var str = arr.join(",");
    localStorage.setItem("completedTrials_L" + list_number, str);
}

// Note: imgIndex must be a number, not a string
function isImageCompleted(imgIndex) {
    var completedNrs = getcompletedTrials();
    if (completedNrs.indexOf(imgIndex) === -1) {
        return false;
    } else {
        return true;
    }
}

function resetcompletedTrials() {
    localStorage.removeItem("completedTrials_L" + list_number);
}

function saveData(data, ppn) {
    var filename  = ppn + "_trials.dat" // server adds datetime
    var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'POST',
		url: 'save_data.php',
        data: {
            filename: filename,
            data: jsonData
        },
		success: function(output) {
            // For picture-naming tasks, store img index in local storage so it can be skipped on page reload
            if (data.trial_type == 'conversation-pcg') {
                addCompletedImage(data.stimIndex);
            }
		}
	});
}

// Initialize global variables

// Get participant number from URL query string
var ppn = jsPsych.data.urlVariables()['ppn']
if (ppn === undefined) {
    ppn = 1
}

var list_number = jsPsych.data.urlVariables()['list'];
if (list_number === undefined) {
  list_number = 0;
}

// Check if pictureList is loaded from JS file
/*if (typeof stimulusList === 'undefined') {
    var err = new Error("Picture list not loaded, try a page refresh or contact the experimenter");
    alert(err);
    throw err; // die if we don't have the pictures
}*/

// Directory where images are located (relative to naming.html)
var imgDir = "resources";
var audDir = "resources";

// Make instruction trials
var recordTestPrompt = {
	type: "call-function",
	func: function(){
        // Make and send a 1 second recording
        // mainly to show a prompt in browser asking for permission to record
        recordTime(1, ppn+"_audio-test-2");

        // Send some data about the browser
        var initialData = {
            time: (new Date()).toString(),
            userAgent: navigator.userAgent,
            screenWidth: screen.width,
            screenHeight: screen.height,
            windowWidth: $(window).width(),
            windowHeight: $(window).height(),
        };
        saveData(initialData, ppn);
    },
}

var generalInstructions = {
    type: 'instructions',
    pages: [
      '<p><b>Taak 2 uit 3</b></p>' +
      '<p>Je gaat nu beginnen aan de tweede taak van het onderzoek.</p>' +
      '<p>In deze taak voer je een gesprek met een \'digitale partner\'. Jullie zullen om en om prijsvergelijkingen maken tussen twee objecten. Probeer dit als volgt te doen: “X is cheaper than Y”, of “X is more expensive than Y”, waarbij X het links staande object is en Y dat op de rechter afbeelding. Maak gebruik van de prijsbepalingen die je hebt gemaakt in de eerste taak, en probeer daarbij consistent te blijven. Onthoud dat er geen goed of fout antwoord is.</p>' +
      '<p>Deze taak is wederom in het Engels.</p>',
      '<p>Trials waarbij het jouw beurt is om te praten, zal jouw antwoord automatisch opgenomen worden zodra beide objecten gepresenteerd worden. Dit wordt aangegeven door een “Stop recording” knop die onderaan je scherm zal verschijnen. Klik alsjeblieft op de knop “Opname stoppen” wanneer je klaar bent met het spreken van jouw prijsvergelijking. Nadat de opname is opgeslagen kun je op de knop “Verdergaan” klikken om verder te gaan met de andere trials. Nogmaals, als je een pauze nodig hebt, doe dit dan voordat je op “Verdergaan” klikt.</p>' +
      '<p>Voor trials waarbij het jouw beurt is om te luisteren, gebruik dan de \'M\'-toets op je toetsenbord wanneer je het eens bent met de prijsvergelijking van de ander, gebruik de \'Z\'-toets als je het niet eens bent met de ander. De volgende trial zal beginnen zodra je een antwoord hebt gegeven.</p>'
    ],
    show_clickable_nav: true,
    button_label_next: "Verdergaan",
    button_label_previous: "Vorige",
}

var practiceTrialsInstruction = {
	type: "html-button-response",
    stimulus:
        '<p>De volgende objecten zijn oefentrials zodat je de taak onder de knie kunt krijgen.</p>',
	choices: ["Verdergaan"],
}

var realTrialsInstruction = {
	type: "html-button-response",
    stimulus:
        '<p>De taak zal nu beginnen.</p>',
	choices: ["Verdergaan"],
}

var blockPauseInstruction = {
	type: "html-button-response",
    stimulus:
        '<p>Neem een korte pauze. Wanneer je er klaar voor bent voor het volgende blok, klik op "Verdergaan".</p>',
	choices: ["Verdergaan"],
}

var thanks = {
	type: "html-button-response",
    stimulus: '<p>Je bent klaar met de tweede taak! Neem een korte pauze.<br><br><a href="experiment3.html?ppn=' + ppn + '&list=' + list_number + '">Wanneer je er klaar voor bent, klik hier om door te gaan naar de laatste taak.</a></p>',
    choices: [],
}

function makeTrialsFromBlock(block, lastIndex, imgDir, audDir, ppn) {
  var tl = [];

  block.map(function(t){
    tl.push({
        type: 'conversation-pcg',
        imgFileLeft: t.fileleft,
        imgFileRight: t.fileright,
        audFile: t.audfile,
        stimIndex: t.index,
        block: t.block,
        lastStimIndex: lastIndex,
        imgDir: imgDir,
        audDir: audDir,
        ppn: ppn,
        list: list_number
    });
  });

  return tl;
}

// find stimulus list

if (lists === undefined) {
  var err = new error("Could not load stimuli. Please contact the experimenter.");
  alert(err);
  throw err;
}

if (list_number > (lists.length-1)) {
  var err = new error("Could not load list. Please contact the experimenter.");
  alert(err);
  throw err;
}

stimulusList = lists[list_number];

// For debugging to reset localStorage, add ?reset=1 to url:
if (jsPsych.data.urlVariables()['reset']) {
    resetcompletedTrials();
    document.location.replace("experiment2.html?ppn="+ppn+"&list="+list_number);
}

// Make trials and remove trials already seen
var s = stimulusList.map(function(e) {
  return {
    fileleft: e[4],
    fileright: e[5],
    audfile: e[3],
    block: e[2],
    index: e[1],
    list: e[0],
  }
}).filter(function(e){
  if (isImageCompleted(e.index)) {
    return false;
  }
  return true;
});

// slice into blocks
var timeline = [];
var required_trials = [];

if (s.length > 0) {
  var lastStimulus = s[s.length - 1].index;
  var lastBlock = s[s.length - 1].block;
  var firstBlock = s[0].block;
  var blocks = [];

  var i;
  for (i = 0; i <= lastBlock; i++) {
    blocks.push([]);
  }

  s.map(function(e){
    blocks[e.block].push(e);
  });

  timeline.push(recordTestPrompt);
  timeline.push(generalInstructions);

  if (blocks[0].length > 0) {
    var trials_pretest = makeTrialsFromBlock(blocks[0], lastStimulus, imgDir, audDir, ppn);
    timeline = timeline.concat(practiceTrialsInstruction, trials_pretest);
    required_trials = required_trials.concat(blocks[0]);
  }

  timeline.push(realTrialsInstruction);

  for (i = 1; i < blocks.length; i++) {
    var trials_block = makeTrialsFromBlock(blocks[i], lastStimulus, imgDir, audDir, ppn);
    timeline = timeline.concat(trials_block);
    required_trials = required_trials.concat(blocks[i]);
    if (i != lastBlock) {
      timeline.push(blockPauseInstruction);
    }
  }
}

timeline.push(thanks);

// preload stuff
var preload_audio = required_trials.map(function(stim) {
  if (typeof(stim.audfile) !== 'undefined') {
    if (!['pp', 'participant', 'undefined', undefined, null, 'null'].includes(stim.audfile)) {
      return audDir + "/" + stim.audfile;
    }
  }
  return null;
}).filter(function(e) {
  return e != null;
});

var preload_images = [];
required_trials.map(function(stim) {
  preload_images.push(imgDir + "/" + stim.fileleft);
  preload_images.push(imgDir + "/" + stim.fileright);
});

/// Initialize experiment, but only if informed consent has been obtained
if (localStorage.getItem("informedConsentGiven") != "yes") {
  var err = new Error("Je moet aanvankelijk met de informed consent akkord gaan.");
  alert(err);
  document.location.replace("informedconsent.html?ppn="+ppn+"&list="+list_number);
  throw err;
} else {
  jsPsych.init({
    timeline: timeline,
    on_data_update: function(data) { saveData(data, ppn); },
    preload_images: preload_images,
    preload_audio: preload_audio
  });
}
