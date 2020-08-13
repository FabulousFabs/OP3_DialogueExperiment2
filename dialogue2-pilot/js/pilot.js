// jsPsych plugin for this pilot's production part
jsPsych.plugins['pilot-production'] = (function(){
	jsPsych.pluginAPI.registerPreload('pilot-production', 'stimulus', 'image');

	var txt = {
		btnContinue: 'Continue',
		dutchName: 'Dutch name',
		englishName: 'English name',
		name: 'Name'
	};

	var maxResponses = 7;

	var plugin = {};

	plugin.info = {
		name: 'pilot-production',
		parameters: {
			ppn: {
				type: jsPsych.plugins.parameterType.INT,
				default: 1,
				pretty_name: 'Participant no.',
				description: 'Integer identifier of the participant completing the experiment.'
			},
			ppl: {
				type: jsPsych.plugins.parameterType.INT,
				default: 0,
				pretty_name: 'Participant language',
				description: 'Integer identifier of the participant language (English/Dutch 0/1).'
			},
			block: {
				type: jsPsych.plugins.parameterType.INT,
				default: 1,
				pretty_name: 'Stimulus block',
				description: 'The block this particular stimulus appears in.'
			},
			index: {
				type: jsPsych.plugins.parameterType.INT,
				default: 0,
				pretty_name: 'Stimulus index',
				description: 'The index of the current stimulus in the materials.'
			},
			final: {
				type: jsPsych.plugins.parameterType.INT,
				default: 0,
				pretty_name: 'Final index',
				description: 'The index of the last stimulus in the materials.'
			},
			imgDir: {
				type: jsPsych.plugins.parameterType.STRING,
				default: '',
				pretty_name: 'Image directory',
				description: 'Main directory for image resources'
			},
			imgFile: {
				type: jsPsych.plugins.parameterType.IMAGE,
				default: undefined,
				pretty_name: 'Stimulus image',
				description: 'Source image used for this particular stimulus.'
			}
		}
	};

	plugin.trial = function(display_element, trial) {
		console.log("Working on trial ", trial);

		var data = {
			ppn: trial.ppn,
			ppl: trial.ppl,
			block: trial.block,
			index: trial.index,
			imgDir: trial.imgDir,
			imgFile: trial.imgFile,
			nameDutch: [],
			namesEnglish: []
		};

		var responseBoxes = (trial.ppl == 1 ? -1 : 0);
		var handleBoxes = function(box_text){
			if (responseBoxes >= maxResponses) { return; }

			responseBoxes += 1;

			if (box_text === undefined || typeof box_text != 'string') {
				box_text = (trial.ppl == 1 ? txt.englishName : txt.name) + ' #' + responseBoxes;
			}

			boxes.find('input').off();
			var newBox = $(
				'<label for="responseBox' + responseBoxes + '">' + box_text + ':</label>&nbsp;<input type="text" id="responseBox' + responseBoxes + '" name="responseBox' + responseBoxes + '" class="pilot-response-box" value="" /><br/>'
			);
			newBox.appendTo(boxes);
			newBox.on('focus', handleBoxes);
		};

		var endTrial = function() {
			jsPsych.pluginAPI.clearAllTimeouts();
			display_element.innerHTML = '';
			jsPsych.finishTrial(data);
		};

		var handleContinue = function(){
			boxes.find('input').prop('disabled', true);
			btnContinue.prop('disabled', true);

			boxes.find('input').each(function(i, el){
				if (trial.ppl == 1 && i == 0) {
					data.nameDutch = $(el).val();
				} else {
					data.namesEnglish.push($(el).val());
				}
			});

			endTrial();
		};

		var container = $(
			'<div id="naming">' +
				'<div id="instruction"></div>' +
				'<div id="pl-cont">' +
					'<div id="stimulus-container" align="left" style="float: left; width: 350px;">' +
						'<img id="stimulus" src="" />' +
					'</div>' +
					'<div id="boxes" align="right" style="float: right; width: 250px;">' +
						'<br /><br /><br /><br /><br />' +
					'</div>' +
				'</div>' +
				'<div id="controls" style="float: none;">' +
					'<p><button id="btn-continue" class="jspsych-btn" style="margin-top: 25px;">' + txt.btnContinue + '</button></p>' +
				'</div>' +
			'</div>'
		);

		var instructions = container.find('#instruction');
		var stimulus = container.find('#stimulus');
		var boxes = container.find('#boxes');
		var btnContinue = container.find('#btn-continue');

		display_element.innerHTML = '';
		container.appendTo(display_element);

		instructions.html("<b>Picture Naming:</b> " + trial.index + " out of " + trial.final);
		stimulus.attr('src', trial.imgDir + "/" + trial.imgFile);
		btnContinue.on('click', handleContinue);

		if (trial.ppl == 1) {
			handleBoxes(txt.dutchName);
			handleBoxes(txt.englishName);
		} else {
			handleBoxes(txt.name);
		}
	};

	return plugin;
})();

// jsPsych plugin for this pilot's reception part
jsPsych.plugins['pilot-reception'] = (function(){
	jsPsych.pluginAPI.registerPreload('pilot-reception', 'stimulus', 'image');

	var txt = {

	};

	var plugin = {};

	plugin.info = {
		name: 'pilot-reception',
		parameters: {
			ppn: {
				type: jsPsych.plugins.parameterType.INT,
				default: 1,
				pretty_name: 'Participant no.',
				description: 'Integer identifier of the participant completing the experiment.'
			},
			ppl: {
				type: jsPsych.plugins.parameterType.INT,
				default: 0,
				pretty_name: 'Participant language',
				description: 'Integer identifier of the participant language (English/Dutch 0/1).'
			},
			block: {
				type: jsPsych.plugins.parameterType.INT,
				default: 1,
				pretty_name: 'Stimulus block',
				description: 'The block this particular stimulus appears in.'
			},
			index: {
				type: jsPsych.plugins.parameterType.INT,
				default: 0,
				pretty_name: 'Stimulus index',
				description: 'The index of the current stimulus in the materials.'
			},
			final: {
				type: jsPsych.plugins.parameterType.INT,
				default: 0,
				pretty_name: 'Final index',
				description: 'The index of the last stimulus in the materials.'
			},
			imgDir: {
				type: jsPsych.plugins.parameterType.STRING,
				default: '',
				pretty_name: 'Image directory',
				description: 'Main directory for image resources'
			},
			imgFile: {
				type: jsPsych.plugins.parameterType.IMAGE,
				default: undefined,
				pretty_name: 'Stimulus image',
				description: 'Source image used for this particular stimulus.'
			},
			alternative: {
				type: jsPsych.plugins.parameterType.STRING,
				default: '',
				pretty_name: 'Stimulus alternative name',
				description: 'Lexical alternative we are testing in this context.'
			}
		};

		plugin.trial = function(display_element, trial) {

		};

		return plugin;
	};
})();

// Initialize global variables

// Get participant number from URL query string
var ppn = jsPsych.data.urlVariables()['ppn']
if (ppn === undefined) {
    ppn = 1
}

// Get participant type
var ppl = jsPsych.data.urlVariables()['ppl']
if (ppl === undefined) {
	ppl = 0;
}

// Couple of helper functions (adopted from Wilbert but made a tad more efficient here and there)
function getCompletedTrials(type) {
	var stored_items = localStorage.getItem("pilot_completed_T" + type);
	if (stored_items === null)
		return [];
	return stored_items.split(",").map(function(v) {
		return parseInt(v);
	});
}

function isImageCompleted(type, id) {
	var current = getCompletedTrials(type);
	return !(current.indexOf(id) === -1);
}

function addCompletedImage(type, id) {
	var items = getCompletedTrials(type);
	items.push(id);
	localStorage.setItem("pilot_completed_T" + type, items.join(','));
}

function saveData(data, ppn, ppl) {
		var type = data.trial_type == 'pilot-production' ? 'prod' : 'recp';
    var filename  = type + "_" + ppl + "_" + ppn + "_trials.dat" // server adds datetime
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
            if (data.trial_type == 'pilot-production') {
                addCompletedImage('prod', data.index);
            } else if (data.trial_type == 'pilot-reception') {
								addCompletedImage('recp', data.index);
						}
		}
	});
}

// Prepare production stimuli
if (typeof(stimuli_production) === undefined) {
	var error = new Error("Failed to load production stimuli. Please contact the experimenter.");
	alert(error);
	throw error;
}

var relevantStimuliProduction = stimuli_production.filter(function(entry){
	return !(isImageCompleted('prod', entry[0]));
});

// Prepare reception stimuli
if (typeof(stimuli_reception) === undefined) {
	var error = new Error("Failed to load reception stimuli. Please contact the experimenter.");
	alert(error);
	throw error;
}

var relevantStimuliReception = stimuli_reception.filter(function(entry){
	return !(isImageCompleted('recp', entry[0]));
});

// Prepare global dialogue
var instructionsGeneral = {
	type: 'instructions',
	pages: [
		'<p><b>General Instructions</b></p>' +
		'<p>Again, thanks very much for your interest in participating in this study.</p>' +
		'<p>In the following, you will have to complete two tasks. Detailed explanations of what you have to do will be given prior to each task.</p>' +
		'<p>For now, please keep in mind that, during the entire experiment (i.e., during both tasks), you cannot make use of a dictionary or any other such resources. This is because we are interested in your particular use of language rather than correct responses. In fact, there are no right or wrong answers in this experiment and a lack of a response will be more helpful to us than a response that was looked up.</p>'
	],
	show_clickable_nav: true,
	button_label_next: 'Next',
	button_label_previous: 'Previous'
};

var instructionsProduction = {
	type: 'instructions',
	pages:
		(
			ppl == 0 ?
				[
					'<p><b>Task 1 of 2: Name the pictures</b></p>' +
					'<p>In the following, you will be shown images of everyday objects. Your job is to name each object spontaneously by typing it into the text box to the right of the image. As you fill in the name, another text box will pop up beneath that. If you can think of another way to name the object, please fill in that other name in the new text box. This will continue until you run out of names for this particular object. Whenever that happens, feel free to move on to the next object by hitting \'Continue\'.</p>',
					'<p><b>Task 1 of 2: Name the pictures</b></p>' +
					'<p>What is critical is that, in doing this, you put down the names of the object in the order that they occur to you.</p>' +
					'<p>So, please put down what occurs to you first in the very top box, then put down what occurs to you second in the second box, and so on and so forth.</p>' +
					'<p>Please, hit \'Next\' whenever you are ready to start with task one.</p>'
				]
				:
				[
					'<p><b>Task 1 of 2: Name the pictures</b></p>' +
					'<p>In the following, you will be shown images of everyday objects. Your job is two fold:</p>' +
					'<p>First, please fill in the text box to the right with the Dutch name of the object. For example, if you see a picture of a <i>wallet</i>, fill in <i>portemonnee</i>.</p>' +
					'<p>Secondly, in the text box below that, name the object spontaneously in English. As you fill in the name, another text box will pop up beneath that. If you can think of another way to name the object in English, please fill in that other name in the new text box. This will continue until you run out of names for this particular object. Whenever that happens, feel free to move on to the next object by hitting \'Continue\'.</p>',
					'<p><b>Task 1 of 2: Name the pictures</b></p>' +
					'<p>What is critical is that, in doing this, you put down the English names of the object in the order that they occur to you.</p>' +
					'<p>So, please put down what occurs to you first in the very top English box, then put down what occurs to you second in the second box, and so on and so forth.</p>' +
					'<p>Please, hit \'Next\' whenever you are ready to start with task one.</p>'
				]
		),
	show_clickable_nav: true,
	button_label_next: 'Next',
	button_label_previous: 'Previous'
};

var exitProduction = {
	type: 'instructions',
	pages: [
		'<p><b>Task 1 of 2: Completed.</b></p>' +
		'<p>You have completed the first task. Please, take a quick break before continuing with the experiment.</p>' +
		'<p>Whenever you are ready, hit \'Continue\' to move on to the next task.</p>'
	],
	show_clickable_nav: true,
	button_label_next: 'Continue',
	button_label_previous: 'Previous'
};

var instructionsReception = {
	type: 'instructions',
	pages: [
		
	],
	show_clickable_nav: true,
	button_label_next: 'Next',
	button_label_previous: 'Previous'
};

var instructionsBlock = {
	type: 'instructions',
	pages: [
		'<p><b>Quick break</b></p>' +
		'<p>Please, take a quick break before continuing with the experiment.</p>' +
		'<p>Whenever you are ready, hit \'Continue\' to move on to the next trial.</p>'
	],
	show_clickable_nav: true,
	button_label_next: 'Continue',
	button_label_previous: 'Previous'
};

// Setup experiment
var timeline = [];
var preload = [];
var imgDir = "resources";

timeline.push(instructionsGeneral);

if (relevantStimuliProduction.length > 0) {
	timeline.push(instructionsProduction);

	var blockLast = relevantStimuliProduction[0][1];

	relevantStimuliProduction.map(function(entry){
		if (entry[1] != blockLast) {
			timeline.push(instructionsBlock);
			blockLast = entry[1];
		}

		preload.push(imgDir + "/" + entry[2]);
		timeline.push({
			type: 'pilot-production',
			ppn: ppn,
			ppl: ppl,
			block: entry[1],
			index: entry[0],
			final: relevantStimuliProduction[relevantStimuliProduction.length-1][0],
			imgDir: imgDir,
			imgFile: entry[2]
		});
	});

	timeline.push(exitProduction);
}

if (relevantStimuliReception.length > 0) {
	timeline.push(instructionsReception);
}

if (localStorage.getItem("informedConsentGiven_pilot") != "yes") {
	alert('You must have given informed consent to participate in this experiment.');
	document.location.replace("informedconsent.html?ppn="+ppn+"&ppl="+ppl);
} else {
	jsPsych.init({
		timeline: timeline,
		on_data_update: function(data){ saveData(data, ppn, ppl); },
		preload_images: preload
	});
}
