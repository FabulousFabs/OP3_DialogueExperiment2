// Plugin to perform ping & package loss tests
jsPsych.plugins['ping-test'] = (function(){
    var txt = {
        instruction: "Connection test",
        stim: "Your connection stability is being tested. This should take no longer than a few seconds. Please, stand by.",
        tests: "Running test:",
        current_ms: "Completed all tests.",
        result_1: "Latency:",
        result_2: "Loss:",
        result_okay: "All tests have been completed. Your internet connection is stable enough to run the experiment. Click 'Next' to proceed.",
        result_warning: "All tests have been completed, but your internet connection seems to be instable.<br/>To improve performance, it is recommended that all downloads or uploads (for example, video or music streaming or updating software in the background) you may be performing are paused during the experiment to save bandwidth. If you are using a wireless connection, we recommend moving closer to the router.<br />In any case, you can click 'Next' to proceed, although you may experience longer loading times during the experiment.",
        btnContinue: "Next"
    };

    var plugin = {};

    plugin.info = {
        name: 'ping-test',
        parameters: {
            pong_address: {
                type: jsPsych.plugins.parameterType.STRING,
                default: "",
                pretty_name: "Pong address",
                description: "Who do we play ping pong with?"
            },
            pong_hits: {
                type: jsPsych.plugins.parameterType.INT,
                default: 5,
                pretty_name: "Pong total counter",
                description: "How many times should we ping/pong to see the connection stability?"
            },
            ping_critical: {
                type: jsPsych.plugins.parameterType.INT,
                default: 2000,
                pretty_name: "Critical ping",
                description: "Maximum ping a user can have before a warning is issued."
            }
        }
    };

    plugin.trial = async function(display_element, trial){
        console.log("Starting ping-pong test.");

        var container = $(
            '<div id="naming">'+
                '<div id="instruction"><b>' + txt.instruction + '</b></div>'+
                '<div id="stimulus-container"></div>'+
                '<div id="status"></div>'+
                '<progress id="progress" value="0" max="100"></progress>'+
                '<div id="controls">'+
                    '<button id="btn-continue" class="jspsych-btn">'+txt.btnContinue+'</button>'+
                '</div>'+
            '</div>'
        );

        var onDone = function(){
            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();
            // clear the display
            display_element.innerHTML = '';
            // move on to the next trial
            jsPsych.finishTrial();
        };

        var instruction = container.find('#instruction');
        var btnContinue = container.find('#btn-continue');
        var stim = container.find('#stimulus-container');
        var status = container.find('#status');
        var progress = container.find('#progress');

        // Clear the display and add the container
        display_element.innerHTML = '';
        container.appendTo(display_element);

        btnContinue.on('click', onDone);
        btnContinue.prop('disabled', true);
        stim.html(txt.stim);

        pv = 0;
        pings = [];
        errors = 0;

        for (var i = 1; i <= trial.pong_hits; i++) {
            var s = txt.tests + " " + i + "/" + trial.pong_hits + "";
            status.html(s);

            t_before = Date.now();
            await $.ajax({
                type: 'POST',
                url: trial.pong_address,
                data: { t: Date.now() },
                success: function(output) {
                    console.log("Pong " + Date.now() + ".");
                    tb = Date.now() - t_before;
                    pv = pv + tb;
                    pings.push(tb);
                },
                error: function(request, status, e) {
                    console.log("Pong " + Date.now() + ".");
                    tb = Date.now() - t_before;
                    pv = pv + tb;
                    pings.push(tb);
                    errors = errors + 1;
                }
              });

            progress.val(Math.floor(i / trial.pong_hits * 100));
        }

        ping = Math.floor(pv / trial.pong_hits);
        loss = Math.floor(errors / trial.pong_hits * 100);

        btnContinue.prop('disabled', false);
        status.html(txt.current_ms + "<br/>(" + txt.result_1 + " " + ping + "ms, " + txt.result_2 + " " + loss + "%)");

        if (errors > 0 || ping >= trial.ping_critical) {
            stim.html(txt.result_warning);
        } else {
            stim.html(txt.result_okay);
        }
    };

    return plugin;
})();

// Plugin to perform audio playback tests
jsPsych.plugins['playback-test'] = (function(){
    jsPsych.pluginAPI.registerPreload('playback-test', 'stimulus', 'audio');

    var txt = {
        header: "Audio playback test",
        description: "To make sure that you can hear audio being played properly, please use the button below to play a sound. If you can hear the sound being played, indicate so by pressing the button below accordingly. Should you not be able to hear the sound, you can indicate so to get help.",
        help: "Please, make sure that your audio device is properly connected to your computer, that it is unmuted and that its volume is sufficiently turned up. If all these are the case, then please also make sure that you have not muted your browser or this tab. Please also make sure that you are using an up-to-date version of Google Chrome, Microsoft Edge or Mozilla Firefox. Further, it is recommended that you use headphones rather than speakers for optimal hearing ability.<br />To test whether your changes have helped, you can hit 'Play sound' at any time again, whereupon you will be prompted to indicate whether or not you heard the sound again.",
        btnPlay: "Play sound",
        btnYes: "I heard it",
        btnNo: "I could not hear it"
    };

    var plugin = {};
    var audioDelay = 300; // delay of onset of audio stimuli

    plugin.info = {
        name: 'playback-test',
        parameters: {
            directory: {
                type: jsPsych.plugins.parameterType.STRING,
                default: null,
                pretty_name: 'File directory',
                description: 'The directory wherein the file is stored.'
            },
            sound: {
                type: jsPsych.plugins.parameterType.STRING,
                default: null,
                pretty_name: 'Test sound',
                description: 'The sound to be used in testing the audio with the participants.'
            }
        }
    };

    plugin.trial = function(display_element, trial) {
        console.log("Starting audio playback test.");

        var container = $(
            '<div id="naming">'+
                '<div id="instruction"><b>' + txt.header + '</b></div>'+
                '<div id="stimulus-container">' + txt.description +'</div>'+
                '<div id="playback-container">' +
                    '<button id="btn-play" class="jspsych-btn">' + txt.btnPlay + '</button>' +
                '</div>' +
                '<div id="controls">' +
                    '<button id="btn-no" class="jspsych-btn">' + txt.btnNo + '</button>' +
                    '<button id="btn-yes" class="jspsych-btn">' + txt.btnYes + '</button>' +
                '</div>'+
            '</div>'
        );

        var onDone = function(){
            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();
            // clear the display
            display_element.innerHTML = '';
            // move on to the next trial
            jsPsych.finishTrial();
        };

        var instruction = container.find('#instruction');
        var btnPlay = container.find('#btn-play');
        var btnYes = container.find('#btn-yes');
        var btnNo = container.find('#btn-no');
        var stim = container.find('#stimulus-container');

        // Clear the display and add the container
        display_element.innerHTML = '';
        container.appendTo(display_element);

        btnYes.prop('disabled', true);
        btnNo.prop('disabled', true);

        var doPlay = function() {
            btnPlay.prop('disabled', true);
            btnYes.prop('disabled', false);
            btnNo.prop('disabled', false);

            var context = jsPsych.pluginAPI.audioContext();
            if (context !== null){
              var source = context.createBufferSource();
              source.buffer = jsPsych.pluginAPI.getAudioBuffer(trial.directory + "/" + trial.sound);
              source.connect(context.destination);
            } else {
              var audio = jsPsych.pluginAPI.getAudioBuffer(trial.directory + "/" + trial.sound);
              audio.currentTime = 0;
            }

            var end_audio = function() {
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
            jsPsych.pluginAPI.setTimeout(function(){
              if (context !== null) {
                startTime = context.currentTime;
                source.start(startTime);
              } else {
                audio.play();
              }
            }, audioDelay);
        };

        var doYes = function() {
            btnPlay.prop('disabled', true);
            btnYes.prop('disabled', true);
            btnNo.prop('disabled', true);
            onDone();
        };

        var doNo = function() {
            btnPlay.prop('disabled', false);
            btnYes.prop('disabled', true);
            btnNo.prop('disabled', true);
            stim.html(txt.help);
        };

        btnPlay.on('click', doPlay);
        btnYes.on('click', doYes);
        btnNo.on('click', doNo);
    };

    return plugin;
})();

// Plugin to perform recording tests
jsPsych.plugins['recording-test'] = (function(){
    var txt = {
        header: 'Audio recording test',
        btnStop: 'Stop recording',
        btnNo: 'I could not hear myself well',
        btnYes: 'I heard the sound well',
        feedback: '<br/>Your audio recording is being played back to you momentarily - it should take no longer than a second or two. Can you hear yourself well? Please indicate below.'
    };

    var plugin = {};
    var stopRecordingDelay = 300;
    var maxRecordingTime = 30000;
    var audioDelay = 300;

    plugin.info = {
        name: 'recording-test',
        parameters: {
            instruction: {
                type: jsPsych.plugins.parameterType.STRING,
                default: null,
                pretty_name: 'Participant instructions',
                description: 'Give a quick description of the task.'
            },
            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                default: null,
                pretty_name: 'Participant speaking prompt',
                description: 'Give some kind of a prompt for the participant to say a word or two.'
            }
        }
    };

    plugin.trial = function(display_element, trial) {
        console.log("Starting audio recording test.");

        var container = $(
            '<div id="naming" align="center">'+
                '<div id="instruction"><b>' + txt.header + '</b></div>'+
                '<div id="instruction-cn"><br />' + trial.instruction  + '<br /></div>' +
                '<div id="stimulus-cn"><br />' + trial.prompt +'</div>'+
                '<br />' +
                '<div id="playback-container">' +
                    '<button id="btn-stop" class="jspsych-btn">' + txt.btnStop + '</button>' +
                '</div>' +
                '<div id="controls">' +
                    '<button id="btn-no" class="jspsych-btn">' + txt.btnNo + '</button>' +
                    '<button id="btn-yes" class="jspsych-btn">' + txt.btnYes + '</button>' +
                '</div>'+
            '</div>'
        );

        var onDone = function(){
            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();
            // clear the display
            display_element.innerHTML = '';
            // move on to the next trial
            jsPsych.finishTrial();
        };

        var instruction = container.find('#instruction');
        var btnStop = container.find('#btn-stop');
        var btnYes = container.find('#btn-yes');
        var btnNo = container.find('#btn-no');
        var stim = container.find('#stimulus-cn');
        var incn = container.find('#instruction-cn');

        // Clear the display and add the container
        display_element.innerHTML = '';
        container.appendTo(display_element);

        btnYes.prop('disabled', true);
        btnNo.prop('disabled', true);

        var handleYes = function() {
            btnYes.prop('disabled', true);
            btnNo.prop('disabled', true);
            btnStop.prop('disabled', true);
            onDone();
        };

        btnYes.on('click', handleYes);

        var handleNo = function() {
            btnYes.prop('disabled', true);
            btnNo.prop('disabled', true);
            btnStop.prop('disabled', false);

            incn.html(trial.instruction);
            stim.show();

            recorder = null;
            getRecorder(function(rec) {
                  recorder = rec;
                  recorder.startRecording();
                  btnStop.prop('disabled', false);
            });
        };

        btnNo.on('click', handleNo);

        var handlePlayback = function(blob) {
            var fileReader = new FileReader();
            var context = null;
            var source = null;
            var audio = null;

            fileReader.onloadend = () => {
                var arrayBuffer = fileReader.result;
                context = jsPsych.pluginAPI.audioContext();
                if (context !== null){
                  context.decodeAudioData(arrayBuffer, (audioBuffer) => {
                      source = context.createBufferSource();
                      source.buffer = audioBuffer;
                      source.connect(context.destination);

                      var end_audio = function() {
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
                      jsPsych.pluginAPI.setTimeout(function(){
                        if (context !== null) {
                          startTime = context.currentTime;
                          source.start(startTime);
                        } else {
                          audio.play();
                        }

                        btnYes.prop('disabled', false);
                        btnNo.prop('disabled', false);
                      }, audioDelay);
                  });
                } else {
                  audio = arrayBuffer;
                  audio.currentTime = 0;
                }
            };

            fileReader.readAsArrayBuffer(blob);
        };

        var handleDoneClick = function() {
            btnStop.prop('disabled', true);
            incn.html(txt.feedback);
            stim.hide();

            jsPsych.pluginAPI.setTimeout(function() {
                recorder.stopRecording(function() {
                    var blob = recorder.getBlob();
                    handlePlayback(blob);
                });
            }, stopRecordingDelay);
        };

        btnStop.on('click', handleDoneClick);

        var recorder = null;
        getRecorder(function(rec) {
              recorder = rec;
              recorder.startRecording();
              btnStop.prop('disabled', false);
        });
    };

    return plugin;
})();

// Get participant number from URL query string
var ppn = jsPsych.data.urlVariables()['ppn']
if (ppn === undefined) {
    ppn = 1
}

// Initialise timeline
var timeline = [];

var instructions_tests = {
    type: "instructions",
    pages: [
        '<p><b>Technical tests</b></p>' +
        '<p>Before the experiment, three brief technical tests will be run to make sure everything runs smoothly.</p>' +
        '<ol align="left">' +
            '<li><u>Connection test</u>: First, a quick test will be run to see if your internet connection is stable. This should take no longer than a few seconds and requires no action taken by you, as it will be handled automatically.</li>' +
            '<li><u>Audio playback</u>: Next, an audio file will be played such that you can indicate whether you could hear it properly.</li>' +
            '<li><u>Audio recording</u>: Finally, a brief snippet of you speaking will be recorded to confirm that your microphone works well.</li>' +
        '</ol>' +
        '<p>Please, hit \'Start\' to proceed.</p>'
    ],
    show_clickable_nav: true,
    button_label_next: "Start",
    button_label_previous: "Previous"
};

timeline.push(instructions_tests);

var pingpong = {
    type: "ping-test",
    pong_address: "pong.php",
    pong_hits: 10,
    ping_critical: 2000
};

timeline.push(pingpong);

var preload_audio = ["resources/playback_test.wav"];
var playback = {
    type: "playback-test",
    directory: "resources",
    sound: "playback_test.wav"
};

timeline.push(playback);

var audiorecording = {
    type: "recording-test",
    instruction: "Please, read the following sentence out loud, speaking clearly and slowly. When you are done, hit 'Stop recording' to listen back to yourself before indicating whether you could hear the recording well by hitting the appropriate button.",
    prompt: "'<i>Brevity is the soul of wit.</i>'&nbsp;(Shakespeare, Hamlet)"
};

timeline.push(audiorecording);

var forward = {
	type: 'call-function',
	func: function(){
		document.location.replace("assignment.php?ppn=" + ppn);
	},
};

timeline.push(forward);

/// Initialize experiment, but only if informed consent has been obtained
if (localStorage.getItem("informedConsentGiven") != "yes") {
  var err = new Error("You cannot participate in this study without having given informed consent.");
  alert(err);
  document.location.replace("informedconsent.html?ppn="+ppn);
  throw err;
} else {
  jsPsych.init({
      timeline: timeline,
      preload_audio: preload_audio
  });
}
