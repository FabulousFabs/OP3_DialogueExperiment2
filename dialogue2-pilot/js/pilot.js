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
			},
			realId: {
				type: jsPsych.plugins.parameterType.INT,
				default: 0,
				pretty_name: 'Real stimulus id',
				description: 'Stimulus ID regardless of the order of the list.'
			},
			typeS: {
				type: jsPsych.plugins.parameterType.STRING,
				default: 'NA',
				pretty_name: 'Stimulus type',
				description: 'Type of the stimulus being presented, i.e. the manipulation.'
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
			id: trial.realId,
			imgDir: trial.imgDir,
			imgFile: trial.imgFile,
			nameDutch: [],
			namesEnglish: [],
			typeS: trial.typeS
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

		instructions.html("<b>Picture Naming:</b> " + trial.index + "  of " + trial.final + "<p style='font-size: 12px;'>How would you name this picture?</p>");
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
		Q1: '1) Was this your preferred name for the object earlier?',
		Q2: '2) Do you know this word?',
		Q3: '3) Do you think this is an appropriate name for the picture?',
		Q4: '4) Do you think this is primarily an American or British English word?',
		A0: 'YES',
		A1: 'NO',
		A2: 'American English',
		A3: 'British English',
		A4: 'Both/Neither',
		btnContinue: 'Continue'
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
			},
			realId: {
				type: jsPsych.plugins.parameterType.INT,
				default: 0,
				pretty_name: 'Real stimulus id',
				description: 'Stimulus ID regardless of the order of the list.'
			},
			typeS: {
				type: jsPsych.plugins.parameterType.STRING,
				default: 'NA',
				pretty_name: 'Stimulus type',
				description: 'The type of the particular stimulus, i.e. the stimulus manipulation.'
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
			id: trial.realId,
			imgDir: trial.imgDir,
			imgFile: trial.imgFile,
			alternative: trial.alternative,
			choseWord: -1,
			knowsWord: -1,
			appropriateWord: -1,
			abeWord: -1,
			typeS: trial.typeS
		};

		var handleCheckbox = function() {
      // in the handler, 'this' refers to the box clicked on
      var $box = $(this);
      if ($box.is(":checked")) {
        // the name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        // the checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method
        $(group).prop("checked", false);
        $box.prop("checked", true);
      } else {
        $box.prop("checked", false);
      }
    };

		var handleClear = function() {
			question.html('');
			cb1_label.html('');
			cb2_label.html('');
			cb1_input.val('');
			cb2_input.val('');
		};

		var handleUnselect = function() {
			$('input[name="p-rcp-cb"]:checked').prop('checked', false);
		};

		var handleQ1 = function() {
			data.choseWord = $('input[name="p-rcp-cb"]:checked').val();

			if (typeof(data.choseWord) === undefined || ![txt.A0, txt.A1].includes(data.choseWord)) {
				data.choseWord = -1;
				alert('Please, indicate whether or not this is how you named the picture earlier.');
				return;
			}

			btnContinue.off();
			btnContinue.prop('disabled', true);
			handleClear();

			if (data.choseWord == txt.A1) {
				handleUnselect();
				question.html(txt.Q2);
				cb1_label.html("&nbsp;" + txt.A0);
				cb2_label.html("&nbsp;" + txt.A1);
				cb1_input.val(txt.A0);
				cb2_input.val(txt.A1);
				btnContinue.on('click', handleQ2);
				btnContinue.prop('disabled', false);
			} else {
				handleUnselect();
				question.html(txt.Q4);
				cb1_label.html("&nbsp;" + txt.A2);
				cb2_label.html("&nbsp;" + txt.A3);
				cb3_label.html("&nbsp;" + txt.A4);
				cb3_label.show();
				cb1_input.val(txt.A2);
				cb2_input.val(txt.A3);
				cb3_input.val(txt.A4);
				cb3_input.show();
				btnContinue.on('click', handleQ4);
				btnContinue.prop('disabled', false);
			}
		};

		var handleQ2 = function() {
			data.knowsWord = $('input[name="p-rcp-cb"]:checked').val();

			if (typeof(data.knowsWord) === undefined || ![txt.A0, txt.A1].includes(data.knowsWord)) {
				data.knowsWord = -1;
				alert('Please, indicate whether or not you know this word.');
				return;
			}

			btnContinue.off();
			btnContinue.prop('disabled', true);
			handleClear();

			if (data.knowsWord == txt.A0) {
				handleUnselect();
				question.html(txt.Q3);
				cb1_label.html("&nbsp;" + txt.A0);
				cb2_label.html("&nbsp;" + txt.A1);
				cb1_input.val(txt.A0);
				cb2_input.val(txt.A1);
				btnContinue.on('click', handleQ3);
				btnContinue.prop('disabled', false);
			} else {
				endTrial();
			}
		};

		var handleQ3 = function() {
			data.appropriateWord = $('input[name="p-rcp-cb"]:checked').val();

			if (typeof(data.appropriateWord) === undefined || ![txt.A0, txt.A1].includes(data.appropriateWord)) {
				data.appropriateWord = -1;
				alert('Please, indicate whether or not you think this is an appropriate word for the picture.');
				return;
			}

			btnContinue.off();
			btnContinue.prop('disabled', true);
			handleClear();

			if (data.appropriateWord == txt.A0) {
				handleUnselect();
				question.html(txt.Q4);
				cb1_label.html("&nbsp;" + txt.A2);
				cb2_label.html("&nbsp;" + txt.A3);
				cb3_label.html("&nbsp;" + txt.A4);
				cb3_label.show();
				cb1_input.val(txt.A2);
				cb2_input.val(txt.A3);
				cb3_input.val(txt.A4);
				cb3_input.show();
				btnContinue.on('click', handleQ4);
				btnContinue.prop('disabled', false);
			} else {
				endTrial();
			}
		};

		var handleQ4 = function() {
			data.abeWord = $('input[name="p-rcp-cb"]:checked').val();

			if (typeof(data.abeWord) === undefined || ![txt.A2, txt.A3, txt.A4].includes(data.abeWord)) {
				data.abeWord = -1;
				alert('Please, indicate whether you think this is primarily an American or British English term.');
				return;
			}

			btnContinue.off();
			btnContinue.prop('disabled', true);
			handleClear();
			handleUnselect();

			data.abeWord = data.abeWord == txt.A2 ? 0 : data.abeWord == txt.A3 ? 1 : 2; // 0 = AE, 1 = BE, 2 = b/n, -1 no entry

			endTrial();
		};

		var endTrial = function() {
			jsPsych.pluginAPI.clearAllTimeouts();
			display_element.innerHTML = '';
			jsPsych.finishTrial(data);
		};

		var container = $(
			'<div id="naming">' +
				'<div id="instruction"></div>' +
				'<div id="pl-cont">' +
					'<div id="stimulus-container" align="left" style="float: left; width: 350px;">' +
						'<img id="stimulus" src="" />' +
					'</div>' +
					'<div id="boxes" align="center" style="float: right; width: 250px; font-size: 12px;">' +
						'<br /><br /><br />' +
						'<p align="center" id="p-rcp-w"></p>' +
						'<p align="center" id="p-rcp-q"></p>' +
						'<input type="checkbox" id="p-rcp-a1-cb" name="p-rcp-cb" value=""><label for="p-rcp-a1-cb" id="p-rcp-a1-lb"></label><br/>' +
						'<input type="checkbox" id="p-rcp-a2-cb" name="p-rcp-cb" value=""><label for="p-rcp-a2-cb" id="p-rcp-a2-lb"></label><br/>' +
						'<input type="checkbox" id="p-rcp-a3-cb" name="p-rcp-cb" value=""><label for="p-rcp-a3-cb" id="p-rcp-a3-lb"></label>' +
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
		var word = boxes.find('#p-rcp-w');
		var question = boxes.find('#p-rcp-q');
		var cb1_label = boxes.find('#p-rcp-a1-lb');
		var cb2_label = boxes.find('#p-rcp-a2-lb');
		var cb3_label = boxes.find('#p-rcp-a3-lb');
		var cb1_input = boxes.find('#p-rcp-a1-cb');
		var cb2_input = boxes.find('#p-rcp-a2-cb');
		var cb3_input = boxes.find('#p-rcp-a3-cb');
		var checkBoxes = container.find('input:checkbox');
		var btnContinue = container.find('#btn-continue');

		display_element.innerHTML = '';
		container.appendTo(display_element);

		instructions.html("<b>Name rating:</b> " + trial.index + " of " + trial.final);
		stimulus.attr('src', trial.imgDir + "/" + trial.imgFile);
		word.html('<b>Proposed name for object:</b> <i>' + trial.alternative + '</i>');
		checkBoxes.on('click', handleCheckbox);
		question.html(txt.Q1);
		cb1_label.html("&nbsp;" + txt.A0);
		cb2_label.html("&nbsp;" + txt.A1);
		cb3_label.html('');
		cb3_label.hide();
		cb1_input.val(txt.A0);
		cb2_input.val(txt.A1);
		cb3_input.val('');
		cb3_input.hide();
		btnContinue.on('click', handleQ1);
	};

	return plugin;
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
					'<p>Please hit \'Next\' whenever you are ready to start with task one.</p>'
				]
				:
				[
					'<p><b>Task 1 of 2: Name the pictures</b></p>' +
					'<p>In the following, you will be shown images of everyday objects. Your job is twofold:</p>' +
					'<p>First, please fill in the text box to the right with the Dutch name of the object. For example, if you see a picture of a <i>wallet</i>, fill in <i>portemonnee</i>.</p>' +
					'<p>Secondly, in the text box below that, name the object spontaneously in English. As you fill in the name, another text box will pop up beneath that. If you can think of another way to name the object in English, please fill in that other name in the new text box. This will continue until you run out of names for this particular object. Whenever that happens, feel free to move on to the next object by hitting \'Continue\'.</p>',
					'<p><b>Task 1 of 2: Name the pictures</b></p>' +
					'<p>What is critical is that, in doing this, you put down the English names of the object in the order that they occur to you.</p>' +
					'<p>So, please put down what occurs to you first in the very top English box, then put down what occurs to you second in the second box, and so on and so forth.</p>' +
					'<p>Please hit \'Next\' whenever you are ready to start.</p>'
				]
		),
	show_clickable_nav: true,
	button_label_next: 'Next',
	button_label_previous: 'Previous'
};

var practiceProduction = {
	type: 'instructions',
	pages: [
		'<p><b>Task 1 of 2: Name the pictures</b></p>' +
		'<p>The following three trials will be practice trials so you can familiarise yourself with the procedure.</p>' +
		'<p>There will be a brief break after the practice trials before the task continues.</p>' +
		'<p>Please hit \'Start\’ whenever you are ready.</p>'
	],
	show_clickable_nav: true,
	button_label_next: 'Start',
	button_label_previous: 'Previous'
};

var exitProduction = {
	type: 'instructions',
	pages: [
		'<p><b>Task 1 of 2: Completed.</b></p>' +
		'<p>You have completed the first task. Please take a quick break before continuing with the experiment.</p>' +
		'<p>Whenever you are ready, hit \'Continue\' to move on to the next task.</p>'
	],
	show_clickable_nav: true,
	button_label_next: 'Continue',
	button_label_previous: 'Previous'
};

var instructionsReception = {
	type: 'instructions',
	pages: [
		'<p><b>Task 2 of 2: Name rating</b></p>' +
		'<p>In the following, some of the pictures you have already seen in part one will be presented on the left. On the right, you will be offered a name for that object. Your task will then be to classify that name for this particular object as follows:</p>' +
		'<p>First, is this how I named the picture in the previous task? If no, continue. If yes, skip to four.</p>' +
		'<p>Secondly, do you know the particular word? If yes, continue.</p>' +
		'<p>Thirdly, do you think this is an appropriate word for this picture? If yes, continue.</p>' +
		'<p>Lastly, do you think this word is primarily used in American or British English or both/neither?</p>',
		'<p><b>Task 2 of 2: Name rating</b></p>' +
		'<p>Please remember that you cannot make use of a dictionary or any other such resources in this task, too. This is because we are interested in your particular use of language rather than correct responses. In fact, there are no right or wrong answers in this experiment and a lack of a response will be more helpful to us than a response that was looked up.</p>'
	],
	show_clickable_nav: true,
	button_label_next: 'Next',
	button_label_previous: 'Previous'
};

var exitReception = {
	type: 'instructions',
	pages: [
		'<p><b>Task 2 of 2: Completed.</b></p>' +
		'<p>You have completed the second part of the experiment. Thanks very much!</p>' +
		'<p>It is vital that you do not leave yet, although you may take a short break if you want to.</p>'
	],
	show_clickable_nav: true,
	button_label_next: 'Continue',
	button_label_previous: 'Previous'
}

var exitTasks = {
	type: 'instructions',
	pages: [
		'<p><b>Tasks completed</b></p>' +
		'<p>You have completed both tasks. Thanks!</p>' +
		'<p>Before you go, please take a couple of minutes to fill in the questionnaire on the following pages.</p>' +
		'<p>Whenever you are ready, please hit \'To the questionnaire\'.</p>'
	],
	show_clickable_nav: true,
	button_label_next: 'To the questionnaire',
	button_label_previous: 'Previous'
};

var moveOn = function() {
	document.location.replace("questionnaire.html?ppn="+ppn+"&ppl="+ppl);
};

var questionnaire = {
	type: 'call-function',
	func: moveOn
};

var exitDone = {
	type: 'instructions',
	pages: [
		'<p><b>Debrief</b></p>' +
		'<p>Thank you again for your participation. As already stated in the beginning, we are interested in word use by native and non-native speakers of English. In particular, you might have noticed that some objects tend to have different names in British versus American English (for example, cookie / biscuit); other objects have synonymous names regardless of English variant (for example, couch / sofa). We need to know the naming preferences of different speaker populations for these objects in order to be able to use them in a future study on word alignment (i.e., taking words over from another person in a conversation).</p>' +
		'<p>The study has been approved by the Ethical Committee of the Faculty of Social Sciences, Radboud University, Nijmegen.</p>' +
		'<p>Should you have any comments on or questions about the experiment, please contact the senior researcher, Kristin Lemhöfer, at <a href="mailto:k.lemhofer@donders.ru.nl">k.lemhofer@donders.ru.nl</a>.</p>',
		'<p><b>All done.</b></p>' +
		'<p>You have completed the experiment. Thanks very much for your participation!</p>' +
		'<p>You can now close this window.</p>'
	],
	show_clickable_nav: true,
	button_label_next: 'Exit',
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

	if (blockLast === 0) {
		timeline.push(practiceProduction);
	}

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
			imgFile: entry[2],
			realId: entry[3],
			typeS: entry[4]
		});
	});

	timeline.push(exitProduction);
}

if (relevantStimuliReception.length > 0) {
	timeline.push(instructionsReception);

	var blockLastR = relevantStimuliReception[0][1];

	relevantStimuliReception.map(function(entry){
		if (entry[1] != blockLastR) {
			timeline.push(instructionsBlock);
			blockLastR = entry[1];
		}

		if (!preload.includes(imgDir + "/" + entry[2])) {
			preload.push(imgDir + "/" + entry[2]);
		}

		timeline.push({
			type: 'pilot-reception',
			ppn: ppn,
			ppl: ppl,
			block: entry[1],
			index: entry[0],
			final: relevantStimuliReception[relevantStimuliReception.length-1][0],
			imgDir: imgDir,
			imgFile: entry[2],
			alternative: entry[3],
			realId: entry[5],
			typeS: entry[4]
		});
	});

	timeline.push(exitReception);
}

if (relevantStimuliProduction.length <= 0 && relevantStimuliReception.length <= 0) {
	timeline = [];
	//timeline.push(exitDone);
}

timeline.push(exitTasks);
timeline.push(questionnaire);

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
