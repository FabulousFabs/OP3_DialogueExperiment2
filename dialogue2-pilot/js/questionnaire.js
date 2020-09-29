// simple plugin for the questionnaire because it's a bit of a pain to synthesis this as different elements
// this is technically a terrible plugin because it is completely rigid but it's what we need here (easiest anyway)
jsPsych.plugins['pilot-questionnaire'] = (function(){
	var txt = {
		btnContinue: 'Submit'
	};

	var plugin = {};

	plugin.info = {
		name: 'pilot-questionnaire',
		parameters: {
			ppl: {
				type: jsPsych.plugins.parameterType.INT,
				default: 0,
				pretty_name: 'Participant language',
				description: 'Identifier for a participant\'s language, based on which the questions will be selected.'
			}
		}
	};

	plugin.trial = function(display_element, trial) {
		console.log("Working on trial ", trial);

		var lockForm = function() {
			$('input').attr('disabled', true);
			$('select').attr('disabled', true);
			$('button').attr('disabled', true);
		};

		var unlockForm = function() {
			$('input').attr('disabled', false);
			$('select').attr('disabled', false);
			$('button').attr('disabled', false);
		};

		var handleSubmit = function() {
			lockForm();

			if (ppl == 1) {
				// dutch participants
				var data = {
					// preexisting data
					ppn: ppn,
					ppl: ppl,
					// block 1
					answers_age: $('#q-1-age').val(),
					answers_gender: $('#q-1-gender option:checked').val(),
					answers_mother_tongue: $('#q-1-mt option:checked').val(),
					answers_mother_tongue_other: $('#q-1-mt-other').val(),
					answers_occupation: $('#q-1-occupation option:checked').val(),
					answers_qualification: $('#q-1-education option:checked').val(),
					// block 2
					answers_aoe: $('#q-2-aoe').val(),
					answers_aoe_way: $('#q-2-fe').val(),
					answers_yoe: $('#q-2-yoe').val(),
					answers_grades: $('#q-2-grades option:checked').val(),
					answers_reading: $('input[name=q-2-english-reading]:checked').val(),
					answers_listening: $('input[name=q-2-english-listening]:checked').val(),
					answers_speaking: $('input[name=q-2-english-speaking]:checked').val(),
					answers_writing: $('input[name=q-2-english-writing]:checked').val(),
					answers_proficiency: $('input[name=q-2-english-self]:checked').val(),
					// block 3
					answers_glad: $('input[name=q-3-glad]:checked').val(),
					answers_wish: $('input[name=q-3-wish]:checked').val(),
					answers_nervousness: $('input[name=q-3-nervousness]:checked').val(),
					answers_career: $('input[name=q-3-career]:checked').val(),
					answers_neuroticism: $('input[name=q-3-neuroticism]:checked').val(),
					// block 4
					answers_taught: $('input[name=q-4-taught]:checked').val(),
					answers_taught_other: $('#q-4-taught-specify').val(),
					answers_input: $('input[name=q-4-exposure]:checked').val(),
					answers_input_other: $('input[name=q-4-exposure-specify]').val(),
					answers_period_USCA: $('#q-4-visit-USCA option:checked').val(),
					answers_period_USCA_duration: $('#q-4-visit-USCA-duration').val(),
					answers_period_USCA_ago: $('#q-4-visit-USCA-ago').val(),
					answers_period_BI: $('#q-4-visit-GBIR option:checked').val(),
					answers_period_BI_duration: $('#q-4-visit-GBIR-duration').val(),
					answers_period_BI_ago: $('#q-4-visit-GBIR-ago').val(),
					// block 5
					answers_awareness_accent: $('input[name=q-5-awareness]:checked').val(),
					answers_understanding_accent: $('#q-5-understanding option:checked').val(),
					answers_closest_accent: $('#q-5-ownaccent option:checked').val(),
					answers_adaptation_accent: $('input[name=q-5-adaptation]:checked').val(),
					// block 6
					answers_awareness_lexicon: $('input[name=q-6-awareness]:checked').val(),
					answers_understanding_lexicon: $('#q-6-understanding option:checked').val(),
					answers_closest_lexicon: $('#q-6-ownwords option:checked').val(),
					answers_adaptation_lexicon: $('input[name=q-6-adaptation]:checked').val(),
					// block 7
					answers_affinity: $('input[name=q-7-affinity]:checked').val(),
					// block 8
					answers_FL1_name: $('#q-8-FL1').val(),
					answers_FL1_proficiency: $('input[name=q-8-proficiency-FL1]:checked').val(),
					answers_FL1_usage: $('input[name=q-8-frequency-FL1]:checked').val(),
					answers_FL2_name: $('#q-8-FL2').val(),
					answers_FL2_proficiency: $('input[name=q-8-proficiency-FL2]:checked').val(),
					answers_FL2_usage: $('input[name=q-8-frequency-FL2]:checked').val(),
					answers_FL3_name: $('#q-8-FL3').val(),
					answers_FL3_proficiency: $('input[name=q-8-proficiency-FL3]:checked').val(),
					answers_FL3_usage: $('input[name=q-8-frequency-FL3]:checked').val()
				};

				// block 1 checks

				if (data.answers_age.length < 1 || typeof(data.answers_age) === undefined) {
					alert('Please fill in your age before submitting (1.0).');
					unlockForm();
					return false;
				}

				if (data.answers_mother_tongue == 'Other' && (data.answers_mother_tongue_other.length < 3 || typeof(data.answers_mother_tongue_other) === undefined)) {
					alert('Since you indicated \'other\', please make sure to fill in your other mother tongues (1.2).');
					unlockForm();
					return false;
				}

				// block 2 checks

				if (data.answers_aoe.length < 1 || typeof(data.answers_aoe) === undefined) {
					alert('Please fill in your age of exposure before submitting (2.0).');
					unlockForm();
					return false;
				}

				if (data.answers_aoe_way.length < 3 || typeof(data.answers_aoe_way) === undefined) {
					alert('Please fill in your way of exposure before submitting (2.1).');
					unlockForm();
					return false;
				}

				if (data.answers_yoe.length < 1 || typeof(data.answers_yoe) === undefined) {
					alert('Please fill in your years of exposure before submitting (2.2).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_reading) === undefined || data.answers_reading == undefined) {
					alert('Please fill in your amount of reading in English (2.4).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_listening) === undefined || data.answers_listening == undefined) {
					alert('Please fill in in your amount of listening to English (2.5).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_speaking) === undefined || data.answers_speaking == undefined) {
					alert('Please fill in your amount of speaking in English (2.6).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_writing) === undefined || data.answers_writing == undefined) {
					alert('Please fill in your amount of writing in English (2.7).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_proficiency) === undefined || data.answers_proficiency == undefined) {
					alert('Please fill in your proficiency in English (2.8).');
					unlockForm();
					return false;
				}

				// block 3 checks

				if (typeof(data.answers_glad) === undefined || data.answers_glad == undefined) {
					alert('Please fill in whether you are glad about speaking English (3.0).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_wish) === undefined || data.answers_wish == undefined) {
					alert('Please fill in whether you wish to speak perfect English (3.1).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_nervousness) === undefined || data.answers_nervousness == undefined) {
					alert('Please fill in whether you are nervous about speaking English (3.2).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_career) === undefined || data.answers_career == undefined) {
					alert('Please fill in whether English is important for your career (3.3).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_neuroticism) === undefined || data.answers_neuroticism == undefined) {
					alert('Please fill in whether you hate making mistakes in English (3.4).');
					unlockForm();
					return false;
				}

				// block 4 checks

				if (typeof(data.answers_taught) === undefined || data.answers_taught === undefined) {
					alert('Please fill in the English you were taught in school (4.0).');
					unlockForm();
					return false;
				}

				if ((data.answers_taught == '8' || data.answers_taught == 8) && (data.answers_taught_other.length < 3 || typeof(data.answers_taught_other) === undefined)) {
					alert('Since you indicated \'other\', please make sure to fill in the variant of English you were taught in school (4.0).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_input) === undefined || data.answers_input === undefined) {
					alert('Please fill in the English you usually hear (4.1).');
					unlockForm();
					return false;
				}

				if ((data.answers_input == '8' || data.answers_input == 8) && (data.answers_input_other.length < 3 || typeof(data.answers_input_other) === undefined)) {
					alert('Since you indicated \'other\', please make sure to fill in the variant of English you usually hear (4.1).');
					unlockForm();
					return false;
				}

				if (data.answers_period_USCA == 'Y' && ((data.answers_period_USCA_ago.length < 1 || typeof(data.answers_period_USCA_ago) === undefined) || (data.answers_period_USCA_duration.length < 1 || typeof(data.answers_period_USCA_duration) === undefined))) {
					alert('Since you indicated that you have spent significant time in the United States or Canada before, please also indicate how long you stayed and how long this was ago (4.2).');
					unlockForm();
					return false;
				}

				if (data.answers_period_BI == 'Y' && ((data.answers_period_BI_ago.length < 1 || typeof(data.answers_period_BI_ago) === undefined) || (data.answers_period_BI_duration.length < 1 || typeof(data.answers_period_BI_duration) === undefined))) {
					alert('Since you indicated that you have spent significant time in Great Britan or Ireland before, please also indicate how long you stayed and how long this was ago (4.3).');
					unlockForm();
					return false;
				}

				// block 5 checks

				if (typeof(data.answers_awareness_accent) === undefined || data.answers_awareness_accent == undefined) {
					alert('Please fill in whether you are typically aware of the English accent of speakers (5.0).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_adaptation_accent) === undefined || data.answers_adaptation_accent == undefined) {
					alert('Please fill in whether you typically try to adapt to the accent of a speaker (5.3).');
					unlockForm();
					return false;
				}

				// block 6 checks

				if (typeof(data.answers_awareness_lexicon) === undefined || data.answers_awareness_lexicon == undefined) {
					alert('Please fill in whether you are typically aware of the English accent of speakers (6.0).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_adaptation_lexicon) === undefined || data.answers_adaptation_lexicon == undefined) {
					alert('Please fill in whether you typically try to adapt to the accent of a speaker (6.3).');
					unlockForm();
					return false;
				}

				// block 7 checks

				if (typeof(data.answers_affinity) === undefined || data.answers_affinity == undefined) {
					alert('Please fill in your affinity for some variant of English (7.0).');
					unlockForm();
					return false;
				}

				// block 8 checks
				if (data.answers_FL1_name.length > 0 && ((typeof(data.answers_FL1_usage) === undefined || data.answers_FL1_usage === undefined) || (typeof(data.answers_FL1_proficiency) === undefined || data.answers_FL1_proficiency === undefined))) {
					alert('Since you indicated that you speak another foreign language (#1), please also indicate your proficiency and usage of this language (8.0).');
					unlockForm();
					return false;
				}

				if (data.answers_FL2_name.length > 0 && ((typeof(data.answers_FL2_usage) === undefined || data.answers_FL2_usage === undefined) || (typeof(data.answers_FL2_proficiency) === undefined || data.answers_FL2_proficiency === undefined))) {
					alert('Since you indicated that you speak another foreign language (#2), please also indicate your proficiency and usage of this language (8.1).');
					unlockForm();
					return false;
				}

				if (data.answers_FL3_name.length > 0 && ((typeof(data.answers_FL3_usage) === undefined || data.answers_FL3_usage === undefined) || (typeof(data.answers_FL3_proficiency) === undefined || data.answers_FL3_proficiency === undefined))) {
					alert('Since you indicated that you speak another foreign language (#3), please also indicate your proficiency and usage of this language (8.2).');
					unlockForm();
					return false;
				}

				// all good

				console.log(data);

				jsPsych.pluginAPI.clearAllTimeouts();
				display_element.innerHTML = '';
				jsPsych.finishTrial(data);
			} else {
				// english native participants
				var data = {
					// preexisting data
					ppn: ppn,
					ppl: ppl,
					// block 1
					answers_age: $('#q-1-age').val(),
					answers_gender: $('#q-1-gender option:checked').val(),
					answers_mother_tongue: $('#q-1-mt option:checked').val(),
					answers_mother_tongue_other: $('#q-1-mt-other').val(),
					answers_occupation: $('#q-1-occupation option:checked').val(),
					answers_qualification: $('#q-1-education option:checked').val(),
					// block 2
					answers_grew_up_with: $('#q-2-1 option:checked').val(),
					answers_grew_up_with_other: $('#q-2-1-1').val(),
					answers_considers_self: $('#q-2-2 option:checked').val(),
					answers_considers_self_other: $('#q-2-2-1').val(),
					answers_exposure_to: $('input[name=q-2-3]:checked').val(),
					answers_exposure_to_other: $('#q-2-3-specify').val(),
					answers_experience_BE: $('input[name=q-2-4]:checked').val(),
					answers_trouble_BE: $('input[name=q-2-5]:checked').val(),
					answers_period_BI: $('#q-2-6 option:checked').val(),
					answers_period_BI_duration: $('#q-2-6-duration').val(),
					answers_period_BI_ago: $('#q-2-6-ago').val(),
					answers_AEBE_awareness: $('input[name=q-2-7]:checked').val(),
					answers_AEBE_knowledge: $('input[name=q-2-8]:checked').val(),
					answers_AEBE_usage: $('input[name=q-2-9]:checked').val(),
					// block 3
					answers_FL1_name: $('#q-3-FL1').val(),
					answers_FL1_proficiency: $('input[name=q-3-proficiency-FL1]:checked').val(),
					answers_FL1_usage: $('input[name=q-3-frequency-FL1]:checked').val(),
					answers_FL2_name: $('#q-3-FL2').val(),
					answers_FL2_proficiency: $('input[name=q-3-proficiency-FL2]:checked').val(),
					answers_FL2_usage: $('input[name=q-3-frequency-FL2]:checked').val(),
					answers_FL3_name: $('#q-3-FL3').val(),
					answers_FL3_proficiency: $('input[name=q-3-proficiency-FL3]:checked').val(),
					answers_FL3_usage: $('input[name=q-3-frequency-FL3]:checked').val()
				};

				// block 1 checks

				if (data.answers_age.length < 1 || typeof(data.answers_age) === undefined) {
					alert('Please fill in your age before submitting (1.0).');
					unlockForm();
					return false;
				}

				if (data.answers_mother_tongue == 'Other' && (data.answers_mother_tongue_other.length < 3 || typeof(data.answers_mother_tongue_other) === undefined)) {
					alert('Since you indicated \'other\', please make sure to fill in your other mother tongues (1.2).');
					unlockForm();
					return false;
				}

				// block 2 checks

				if (data.answers_grew_up_with == 'Other' && (data.answers_grew_up_with_other.length < 3 || typeof(data.answers_grew_up_with_other) === undefined)) {
					alert('Since you indicated \'other / mix\', please make sure to fill in the variant of English you grew up with (2.0).');
					unlockForm();
					return false;
				}

				if (data.answers_considers_self == 'Other' && (data.answers_considers_self_other.length < 3 || typeof(data.answers_grew_up_with_other) === undefined)) {
					alert('Since you indicated \'other\', please make sure to fill in the variant of English you consider yourself to be a speaker of (2.1).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_exposure_to) === undefined || data.answers_exposure_to === undefined) {
					alert('Please fill in the English you usually hear (2.2).');
					unlockForm();
					return false;
				}

				if ((data.answers_exposure_to == '8' || data.answers_exposure_to == 8) && (data.answers_exposure_to_other.length < 3 || typeof(data.answers_exposure_to_other) === undefined)) {
					alert('Since you indicated \'other\', please make sure to fill in the variant of English you usually hear (2.2).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_experience_BE) === undefined || data.answers_experience_BE == undefined) {
					alert('Please fill in your experience with British English (2.3).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_trouble_BE) === undefined || data.answers_trouble_BE == undefined) {
					alert('Please fill in whether you have trouble with British English (2.4).');
					unlockForm();
					return false;
				}

				if (data.answers_period_BI == 'Y' && ((data.answers_period_BI_ago.length < 1 || typeof(data.answers_period_BI_ago) === undefined) || (data.answers_period_BI_duration.length < 1 || typeof(data.answers_period_BI_duration) === undefined))) {
					alert('Since you indicated that you have spent significant time in Great Britan or Ireland before, please also indicate how long you stayed and how long this was ago (2.5).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_AEBE_awareness) === undefined || data.answers_AEBE_awareness === undefined) {
					alert('Please fill in whether you are aware of word differences between British and American English (2.6).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_AEBE_knowledge) === undefined || data.answers_AEBE_knowledge === undefined) {
					alert('Please fill in whether you know word differences between British and American English (2.7).');
					unlockForm();
					return false;
				}

				if (typeof(data.answers_AEBE_usage) === undefined || data.answers_AEBE_usage === undefined) {
					alert('Please fill in whether you use British English words (2.8).');
					unlockForm();
					return false;
				}

				// block 3 checks

				if (data.answers_FL1_name.length > 0 && ((typeof(data.answers_FL1_usage) === undefined || data.answers_FL1_usage === undefined) || (typeof(data.answers_FL1_proficiency) === undefined || data.answers_FL1_proficiency === undefined))) {
					alert('Since you indicated that you speak another foreign language (#1), please also indicate your proficiency and usage of this language (3.0).');
					unlockForm();
					return false;
				}

				if (data.answers_FL2_name.length > 0 && ((typeof(data.answers_FL2_usage) === undefined || data.answers_FL2_usage === undefined) || (typeof(data.answers_FL2_proficiency) === undefined || data.answers_FL2_proficiency === undefined))) {
					alert('Since you indicated that you speak another foreign language (#2), please also indicate your proficiency and usage of this language (3.1).');
					unlockForm();
					return false;
				}

				if (data.answers_FL3_name.length > 0 && ((typeof(data.answers_FL3_usage) === undefined || data.answers_FL3_usage === undefined) || (typeof(data.answers_FL3_proficiency) === undefined || data.answers_FL3_proficiency === undefined))) {
					alert('Since you indicated that you speak another foreign language (#3), please also indicate your proficiency and usage of this language (3.2).');
					unlockForm();
					return false;
				}

				// all good

				console.log(data);

				jsPsych.pluginAPI.clearAllTimeouts();
				display_element.innerHTML = '';
				jsPsych.finishTrial(data);
			}
		};

		var questionnaire = '<div id="questionnaire" align="left" style="font-size: 11px; line-height: 12px;">' +
			'<p align="center"><b>PERSONAL QUESTIONNAIRE</b></p>' +
			'<p>Please fill in all questions displayed below truthfully and comprehensively in order to complete the experiment. Thanks very much! All of your responses will be stored anonymously and you will remain unidentifiable. Whenever you have filled in all questions, please do not forget to hit \'Submit\' at the bottom of this page to make sure data are transmitted. You will be debriefed after successful submission of the questionnaire.</p><br />' +
			'<br />' +
			'<p style="color: red;">1&nbsp;&nbsp;&nbsp;GENERAL INFORMATION</p>' +
			'<hr />' +
			'<p>' +
				'<i>In this section, you will be asked to answer general biographical questions about yourself. Please note that all answers are mandatory except for 1.2.1. Should your mother tongue not be Dutch or English or should you have grown up bilingually, please another or additional mother tongue(s) in 1.2.1.</i>' +
				'<div id="q-1-0" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
					'1.0&nbsp;&nbsp;How old are you?' +
					'<span style="float: right;"><input type="text" id="q-1-age" name="q-1-age" class="qstn-in" maxlength="2"></span>' +
				'</div>' +
				'<br />' +
				'<div id="q-1-1" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
					'1.1&nbsp;&nbsp;What is your gender?' +
					'<span style="float: right;"><select name="q-1-gender" id="q-1-gender" class="qstn-in"><option value="M">male</option><option value="F">female</option><option value="NBO">non-binary/other</option><option value="NA">prefer not to say</option></select></span>' +
				'</div>' +
				'<br />' +
				'<div id="q-1-2" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
					'1.2&nbsp;&nbsp;What is your mother tongue?' +
					'<span style="float: right;"><select name="q-1-mt" id="q-1-mt" class="qstn-in"><option value="DUTCH">Dutch</option><option value="ENGLISH">English</option><option value="Other">other</option></select></span>' +
					'<br /><br /><br />' +
					'&nbsp;&nbsp;&nbsp;1.2.1&nbsp;&nbsp;If you chose \'other\’ or grew up bilingually, please specify (e.g., <i>German, Spanish</i>).' +
					'<span style="float: right;"><input type="text" id="q-1-mt-other" name="q-1-mt-other" class="qstn-in" maxlength="30"></span>' +
				'</div>' +
				'<br />' +
				'<div id="q-1-3" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
					'1.3&nbsp;&nbsp;What is your current occupation?' +
					'<span style="float: right;"><select name="q-1-occupation" id="q-1-occupation" class="qstn-in"><option value="S">student</option><option value="E">in a different education</option><option value="W">working</option><option value="U">unemployed</option></select></span>' +
				'</div>' +
				'<br />' +
				'<div id="q-1-4" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
					'1.4&nbsp;&nbsp;What is your highest completed qualification?' +
					(trial.ppl == 1 ? '<span style="float: right;"><select name="q-1-education" id="q-1-education" class="qstn-in"><option value="1">Basisschool / MAVO</option><option value="2">HAVO</option><option value="3">VWO</option><option value="4">MBO</option><option value="5">HBO</option><option value="6">WO</option></select></span>' : '<span style="float: right;"><select name="q-1-education" id="q-1-education" class="qstn-in"><option value="1">Junior high / middle school</option><option value="2">high school</option><option value="3">community / vocational college</option><option value="4">university or liberal arts college</option></select></span>') +
				'</div>' +
			'</p><hr /><br /><br /><br />';
		if (trial.ppl == 1) {
			questionnaire = questionnaire.concat('<p style="color: red;">2&nbsp;&nbsp;&nbsp;ENGLISH EXPERIENCE AND PROFICIENCY</p>' +
				'<hr />' +
				'<p>' +
					'<i>In this section, you will be asked questions about your experience with and proficiency in English. Please note that that all answers are mandatory and must be filled in properly.</i>' +
					'<div id="q-2-0" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'2.0&nbsp&nbsp;At which age did you first come in contact with English?' +
						'<span style="float: right;"><input type="text" id="q-2-aoe" name="q-2-aoe" class="qstn-in" maxlength="2"></span>' +
					'</div>' +
					'<br />' +
					'<div id="q-2-1" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'2.1&nbsp;&nbsp;In which way(s) did this happen? (e.g., <i>school</i>, <i>extensive trip</i>, <i>course</i>, etc.)' +
						'<span style="float: right;"><input type="text" id="q-2-fe" name="q-2-fe" class="qstn-in" maxlength="45"></span>' +
					'</div>' +
					'<br />' +
					'<div id="q-2-2" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'2.2&nbsp;&nbsp;How many years of experience do you have with English?' +
						'<span style="float: right;"><input type="text" id="q-2-yoe" name="q-2-yoe" class="qstn-in" maxlength="2"></span>' +
					'</div>' +
					'<br />' +
					'<div id="q-2-3" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'2.3&nbsp;&nbsp;In what range were your school grades in English typically?' +
						'<span style="float: right;"><select name="q-2-grades" id="q-2-grades" class="qstn-in"><option value="1">0-5</option><option value="2">6-7.5</option><option value="3">8-10</option></select></span>' +
					'</div>' +
					'<br />' +
					'<div id="q-2-4" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'2.4&nbsp&nbsp;How often do you <b>read</b> English in comparison to reading other languages?' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-reading" id="q-2-english-reading-1" value="1"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-reading" id="q-2-english-reading-2" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-reading" id="q-2-english-reading-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-reading" id="q-2-english-reading-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-reading" id="q-2-english-reading-5" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-reading" id="q-2-english-reading-6" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-reading" id="q-2-english-reading-7" value="7"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-2-english-reading-1">very rarely</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-reading-3">occasionally</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-reading-5">regularly</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-reading-7">very often</label></td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
					'<br />' +
					'<div id="q-2-5" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'2.5&nbsp;&nbsp;How often do you <b>listen</b> to (spoken) English (including media like movies, radio, podcasts, etc.) in comparison to reading other languages?' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-listening" id="q-2-english-listening-1" value="1"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-listening" id="q-2-english-listening-2" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-listening" id="q-2-english-listening-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-listening" id="q-2-english-listening-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-listening" id="q-2-english-listening-5" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-listening" id="q-2-english-listening-6" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-listening" id="q-2-english-listening-7" value="7"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-2-english-listening-1">very rarely</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-listening-3">occasionally</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-listening-5">regularly</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-listening-7">very often</label></td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
					'<br />' +
					'<div id="q-2-6" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'2.6&nbsp;&nbsp;How often do you <b>speak</b> English in comparison to reading other languages?' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-speaking" id="q-2-english-speaking-1" value="1"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-speaking" id="q-2-english-speaking-2" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-speaking" id="q-2-english-speaking-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-speaking" id="q-2-english-speaking-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-speaking" id="q-2-english-speaking-5" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-speaking" id="q-2-english-speaking-6" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-speaking" id="q-2-english-speaking-7" value="7"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-2-english-speaking-1">very rarely</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-speaking-3">occasionally</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-speaking-5">regularly</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-speaking-7">very often</label></td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
					'<br />' +
					'<div id="q-2-7" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'2.7&nbsp;&nbsp;How often do you <b>write</b> English in comparison to reading other languages?' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-writing" id="q-2-english-writing-1" value="1"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-writing" id="q-2-english-writing-2" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-writing" id="q-2-english-writing-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-writing" id="q-2-english-writing-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-writing" id="q-2-english-writing-5" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-writing" id="q-2-english-writing-6" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-writing" id="q-2-english-writing-7" value="7"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-2-english-writing-1">very rarely</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-writing-3">occasionally</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-writing-5">regularly</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-writing-7">very often</label></td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
					'<br />' +
					'<div id="q-2-8" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'2.8&nbsp;&nbsp;In all, how good do you think your English is for a non-native speaker?' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-self" id="q-2-english-self-1" value="1"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-self" id="q-2-english-self-2" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-self" id="q-2-english-self-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-self" id="q-2-english-self-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-self" id="q-2-english-self-5" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-self" id="q-2-english-self-6" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-2-english-self" id="q-2-english-self-7" value="7"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-2-english-self-1">very basic</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-self-3">modest</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-self-5">pretty good</label></td>' +
								'<td style="width: 14%;"></td>' +
								'<td style="width: 14%;"><label for="q-2-english-self-7">excellent</label></td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
				'</p><hr /><br /><br /><br />' +
				'<p style="color: red;">3&nbsp;&nbsp;&nbsp;ATTITUDE TOWARDS SPEAKING ENGLISH</p>' +
				'<hr />' +
				'<p>' +
					'<i>In this section, you will be asked questions about your motivation for as well as your levels of anxiety about learning and/or using English. Please note that that all answers are mandatory and must be filled in properly.</i>' +
					'<div id="q-3-0" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'3.0&nbsp;&nbsp;I am always glad when I get the opportunity to speak English.' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-3-glad" id="q-3-glad-1" value="1"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-glad" id="q-3-glad-2" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-glad" id="q-3-glad-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-glad" id="q-3-glad-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-glad" id="q-3-glad-5" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-glad" id="q-3-glad-6" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-glad" id="q-3-glad-7" value="7"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-3-glad-1">strongly disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-glad-2">moderately disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-glad-3">slightly disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-glad-4">neither</label></td>' +
								'<td style="width: 14%;"><label for="q-3-glad-5">slightly agree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-glad-6">moderately agree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-glad-7">strongly agree</label></td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
					'<br />' +
					'<div id="q-3-1" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'3.1&nbsp;&nbsp;I wish I spoke perfect English.' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-3-wish" id="q-3-wish-1" value="1"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-wish" id="q-3-wish-2" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-wish" id="q-3-wish-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-wish" id="q-3-wish-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-wish" id="q-3-wish-5" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-wish" id="q-3-wish-6" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-wish" id="q-3-wish-7" value="7"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-3-wish-1">strongly disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-wish-2">moderately disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-wish-3">slightly disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-wish-4">neither</label></td>' +
								'<td style="width: 14%;"><label for="q-3-wish-5">slightly agree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-wish-6">moderately agree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-wish-7">strongly agree</label></td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
					'<br />' +
					'<div id="q-3-2" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'3.2&nbsp;&nbsp;I feel nervous when I have to speak English.' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-3-nervousness" id="q-3-nervousness-1" value="1"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-nervousness" id="q-3-nervousness-2" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-nervousness" id="q-3-nervousness-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-nervousness" id="q-3-nervousness-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-nervousness" id="q-3-nervousness-5" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-nervousness" id="q-3-nervousness-6" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-nervousness" id="q-3-nervousness-7" value="7"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-3-nervousness-1">strongly disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-nervousness-2">moderately disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-nervousness-3">slightly disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-nervousness-4">neither</label></td>' +
								'<td style="width: 14%;"><label for="q-3-nervousness-5">slightly agree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-nervousness-6">moderately agree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-nervousness-7">strongly agree</label></td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
					'<br />' +
					'<div id="q-3-3" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'3.3&nbsp;&nbsp;Learning English is important because I need it for my career.' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-3-career" id="q-3-career-1" value="1"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-career" id="q-3-career-2" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-career" id="q-3-career-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-career" id="q-3-career-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-career" id="q-3-career-5" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-career" id="q-3-career-6" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-career" id="q-3-career-7" value="7"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-3-career-1">strongly disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-career-2">moderately disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-career-3">slightly disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-career-4">neither</label></td>' +
								'<td style="width: 14%;"><label for="q-3-career-5">slightly agree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-career-6">moderately agree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-career-7">strongly agree</label></td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
					'<br />' +
					'<div id="q-3-4" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'3.4&nbsp;&nbsp;I hate it when I make mistakes in English.' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-3-neuroticism" id="q-3-neuroticism-1" value="1"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-neuroticism" id="q-3-neuroticism-2" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-neuroticism" id="q-3-neuroticism-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-neuroticism" id="q-3-neuroticism-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-neuroticism" id="q-3-neuroticism-5" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-neuroticism" id="q-3-neuroticism-6" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-3-neuroticism" id="q-3-neuroticism-7" value="7"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-3-neuroticism-1">strongly disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-neuroticism-2">moderately disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-neuroticism-3">slightly disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-neuroticism-4">neither</label></td>' +
								'<td style="width: 14%;"><label for="q-3-neuroticism-5">slightly agree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-neuroticism-6">moderately agree</label></td>' +
								'<td style="width: 14%;"><label for="q-3-neuroticism-7">strongly agree</label></td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
				'</p><hr /><br /><br /><br />' +
				'<p style="color: red;">4&nbsp;&nbsp;&nbsp;AMERICAN VS. BRITISH ENGLISH: INPUT</p>' +
				'<hr />' +
				'<p>' +
					'<i>In this section, you will be asked questions about your English input with regards to American and British English. For questions 4.0 and 4.1, please note that, should neither British nor American English be applicable to you, you should choose the option for a different variant of English and specify which other variant and in which mixtures it applies. Questions 4.2.1 and 4.2.2 as well as 4.3.1 and 4.3.2 must be answered only if you have, indeed, spent longer periods of time in each of the countries. All other questions are mandatory.</i>' +
					'<div id="q-4-0" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'4.0&nbsp&nbsp;The English I was taught at school was...' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-4-taught" id="q-4-taught-1" value="1"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-4-taught" id="q-4-taught-2" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-4-taught" id="q-4-taught-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-4-taught" id="q-4-taught-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-4-taught" id="q-4-taught-5" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-4-taught" id="q-4-taught-6" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-4-taught" id="q-4-taught-7" value="7"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-4-taught-1">exclusively American</label></td>' +
								'<td style="width: 14%;"><label for="q-4-taught-2">mostly American</label></td>' +
								'<td style="width: 14%;"><label for="q-4-taught-3">a little more American</label></td>' +
								'<td style="width: 14%;"><label for="q-4-taught-4">both equally</label></td>' +
								'<td style="width: 14%;"><label for="q-4-taught-5">a little more British</label></td>' +
								'<td style="width: 14%;"><label for="q-4-taught-6">mostly British</label></td>' +
								'<td style="width: 14%;"><label for="q-4-taught-7">exclusively British</label></td>' +
							'</tr>' +
							'<tr><td colspan="7">&nbsp;</td></tr>' +
							'<tr><td colspan="7" align="center"><input type="radio" name="q-4-taught" id="q-4-taught-8" value="8">&nbsp;&nbsp;<label for="q-4-taught-8">a different variant of English (please specify which and in which mixture with American and/or British):</label>&nbsp;&nbsp;<input type="text" id="q-4-taught-specify" name="q-4-taught-specify" class="qstn-in" maxlength="50"></td></tr>' +
						'</table>' +
					'</div>' +
					'<br />' +
					'<div id="q-4-1" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'4.1&nbsp&nbsp;In the last couple of years, the English input I receive (via personal contact and/or media) is...' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-4-exposure" id="q-4-exposure-1" value="1"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-4-exposure" id="q-4-exposure-2" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-4-exposure" id="q-4-exposure-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-4-exposure" id="q-4-exposure-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-4-exposure" id="q-4-exposure-5" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-4-exposure" id="q-4-exposure-6" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-4-exposure" id="q-4-exposure-7" value="7"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-4-exposure-1">exclusively American</label></td>' +
								'<td style="width: 14%;"><label for="q-4-exposure-2">mostly American</label></td>' +
								'<td style="width: 14%;"><label for="q-4-exposure-3">a little more American</label></td>' +
								'<td style="width: 14%;"><label for="q-4-exposure-4">both equally</label></td>' +
								'<td style="width: 14%;"><label for="q-4-exposure-5">a little more British</label></td>' +
								'<td style="width: 14%;"><label for="q-4-exposure-6">mostly British</label></td>' +
								'<td style="width: 14%;"><label for="q-4-exposure-7">exclusively British</label></td>' +
							'</tr>' +
							'<tr><td colspan="7">&nbsp;</td></tr>' +
							'<tr><td colspan="7" align="center"><input type="radio" name="q-4-exposure" id="q-4-exposure-8" value="8">&nbsp;&nbsp;<label for="q-4-exposure-8">a different variant of English (please specify which and in which mixture with American and/or British):</label>&nbsp;&nbsp;<input type="text" id="q-4-exposure-specify" name="q-4-exposure-specify" class="qstn-in" maxlength="50"></td></tr>' +
						'</table>' +
					'</div>' +
					'<br />' +
					'<div id="q-4-2" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'4.2&nbsp;&nbsp;Have you ever spent a longer period of time (>4 weeks) in the United States or Canada?' +
						'<span style="float: right;"><select name="q-4-visit-USCA" id="q-4-visit-USCA" class="qstn-in"><option value="N">NO</option><option value="Y">YES</option></select></span>' +
						'<br /><br /><br />' +
						'&nbsp;&nbsp;&nbsp;4.2.1&nbsp;&nbsp;If yes, how long was your stay in months (e.g., <i>6</i>)?' +
						'<span style="float: right;"><input type="text" id="q-4-visit-USCA-duration" name="q-4-visit-USCA-duration" class="qstn-in" maxlength="3"></span>' +
						'<br /><br /><br />' +
						'&nbsp;&nbsp;&nbsp;4.2.2&nbsp;&nbsp;If yes, how many years ago did you stay there (e.g., <i>2</i>)?' +
						'<span style="float: right;"><input type="text" id="q-4-visit-USCA-ago" name="q-4-visit-USCA-ago" class="qstn-in" maxlength="3"></span>' +
					'</div>' +
					'<br />' +
					'<div id="q-4-3" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'4.3&nbsp;&nbsp;Have you ever spent a longer period of time (>4 weeks) in Great Britain or Ireland?' +
						'<span style="float: right;"><select name="q-4-visit-GBIR" id="q-4-visit-GBIR" class="qstn-in"><option value="N">NO</option><option value="Y">YES</option></select></span>' +
						'<br /><br /><br />' +
						'&nbsp;&nbsp;&nbsp;4.3.1&nbsp;&nbsp;If yes, how long was your stay in months (e.g., <i>6</i>)?' +
						'<span style="float: right;"><input type="text" id="q-4-visit-GBIR-duration" name="q-4-visit-GBIR-duration" class="qstn-in" maxlength="3"></span>' +
						'<br /><br /><br />' +
						'&nbsp;&nbsp;&nbsp;4.3.2&nbsp;&nbsp;If yes, how many years ago did you stay there (e.g., <i>2</i>)?' +
						'<span style="float: right;"><input type="text" id="q-4-visit-GBIR-ago" name="q-4-visit-GBIR-ago" class="qstn-in" maxlength="3"></span>' +
					'</div>' +
				'</p><hr /><br /><br /><br />' +
				'<p style="color: red;">5&nbsp;&nbsp;&nbsp;AMERICAN VS. BRITISH ENGLISH: ACCENT</p>' +
				'<hr />' +
				'<p>' +
					'<i>In this section, you will be asked questions about different accents of English. Please note that that all answers are mandatory and must be filled in properly.</i>' +
					'<div id="q-5-0" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'5.0&nbsp&nbsp;When listening to a native English speaker, how often are you aware of which variant of English they speak in terms of their <b>accent</b>?' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;">&nbsp;</td>' +
								'<td style="width: 14%;"><input type="radio" name="q-5-awareness" id="q-5-awareness-1" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-5-awareness" id="q-5-awareness-2" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-5-awareness" id="q-5-awareness-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-5-awareness" id="q-5-awareness-4" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-5-awareness" id="q-5-awareness-5" value="1"></td>' +
								'<td style="width: 14%;">&nbsp;</td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;">&nbsp;</td>' +
								'<td style="width: 14%;"><label for="q-5-awareness-1">always aware</label></td>' +
								'<td style="width: 14%;"><label for="q-5-awareness-2">mostly aware</label></td>' +
								'<td style="width: 14%;"><label for="q-5-awareness-3">sometimes aware</label></td>' +
								'<td style="width: 14%;"><label for="q-5-awareness-4">rarely aware</label></td>' +
								'<td style="width: 14%;"><label for="q-5-awareness-5">never aware</label></td>' +
								'<td style="width: 14%;">&nbsp;</td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
					'<br />' +
					'<div id="q-5-1" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'5.1&nbsp;&nbsp;I understand native speakers of English best when they speak...' +
						'<span style="float: right;"><select name="q-5-understanding" id="q-5-understanding" class="qstn-in"><option value="NB">both / neither</option><option value="AE">American English</option><option value="BE">British English</option></select></span>' +
					'</div>' +
					'<br />' +
					'<div id="q-5-2" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'5.2&nbsp;&nbsp;When speaking English myself, I believe my accent is generally closest to...' +
						'<span style="float: right;"><select name="q-5-ownaccent" id="q-5-ownaccent" class="qstn-in"><option value="NB">both / neither</option><option value="AE">American English</option><option value="BE">British English</option></select></span>' +
					'</div>' +
					'<br />' +
					'<div id="q-5-3" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'5.3&nbsp;&nbsp;I generally try to adapt my accent depending on who I am talking to.' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-5-adaptation" id="q-5-adaptation-1" value="7"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-5-adaptation" id="q-5-adaptation-2" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-5-adaptation" id="q-5-adaptation-3" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-5-adaptation" id="q-5-adaptation-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-5-adaptation" id="q-5-adaptation-5" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-5-adaptation" id="q-5-adaptation-6" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-5-adaptation" id="q-5-adaptation-7" value="1"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-5-adaptation-1">strongly agree</label></td>' +
								'<td style="width: 14%;"><label for="q-5-adaptation-2">moderately agree</label></td>' +
								'<td style="width: 14%;"><label for="q-5-adaptation-3">slightly agree</label></td>' +
								'<td style="width: 14%;"><label for="q-5-adaptation-4">neither</label></td>' +
								'<td style="width: 14%;"><label for="q-5-adaptation-5">slightly disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-5-adaptation-6">moderately disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-5-adaptation-7">strongly disagree</label></td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
				'</p><hr /><br /><br /><br />' +
				'<p style="color: red;">6&nbsp;&nbsp;&nbsp;AMERICAN VS. BRITISH ENGLISH: VOCABULARY</p>' +
				'<hr />' +
				'<p>' +
					'<i>In this section, you will be asked questions about differences in word use between American and British English. Please note that all questions are mandatory and must be filled in properly.</i>' +
					'<div id="q-6-0" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'6.0&nbsp&nbsp;How aware are you of the differences between American and British English in terms of <b>words</b> (e.g., different words for the same thing)?' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;">&nbsp;</td>' +
								'<td style="width: 14%;"><input type="radio" name="q-6-awareness" id="q-6-awareness-1" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-6-awareness" id="q-6-awareness-2" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-6-awareness" id="q-6-awareness-3" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-6-awareness" id="q-6-awareness-4" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-6-awareness" id="q-6-awareness-5" value="1"></td>' +
								'<td style="width: 14%;">&nbsp;</td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;">&nbsp;</td>' +
								'<td style="width: 14%;"><label for="q-6-awareness-1">always aware</label></td>' +
								'<td style="width: 14%;"><label for="q-6-awareness-2">mostly aware</label></td>' +
								'<td style="width: 14%;"><label for="q-6-awareness-3">sometimes aware</label></td>' +
								'<td style="width: 14%;"><label for="q-6-awareness-4">rarely aware</label></td>' +
								'<td style="width: 14%;"><label for="q-6-awareness-5">never aware</label></td>' +
								'<td style="width: 14%;">&nbsp;</td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
					'<br />' +
					'<div id="q-6-1" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'6.1&nbsp;&nbsp;I understand English words best when they are from...' +
						'<span style="float: right;"><select name="q-6-understanding" id="q-6-understanding" class="qstn-in"><option value="NB">both / neither</option><option value="AE">American English</option><option value="BE">British English</option></select></span>' +
					'</div>' +
					'<br />' +
					'<div id="q-6-2" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'6.2&nbsp;&nbsp;When speaking English myself, I believe my word choice is based on mostly...' +
						'<span style="float: right;"><select name="q-6-ownwords" id="q-5-ownwords" class="qstn-in"><option value="NB">both / neither</option><option value="AE">American English</option><option value="BE">British English</option></select></span>' +
					'</div>' +
					'<br />' +
					'<div id="q-6-3" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
						'6.3&nbsp;&nbsp;I try to adapt my word choice depending on who I am talking to.' +
						'<br /><br />' +
						'<table style="width: 770px;" align="center">' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><input type="radio" name="q-6-adaptation" id="q-6-adaptation-1" value="7"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-6-adaptation" id="q-6-adaptation-2" value="6"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-6-adaptation" id="q-6-adaptation-3" value="5"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-6-adaptation" id="q-6-adaptation-4" value="4"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-6-adaptation" id="q-6-adaptation-5" value="3"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-6-adaptation" id="q-6-adaptation-6" value="2"></td>' +
								'<td style="width: 14%;"><input type="radio" name="q-6-adaptation" id="q-6-adaptation-7" value="1"></td>' +
							'</tr>' +
							'<tr style="width: 98%;" align="center">' +
								'<td style="width: 14%;"><label for="q-6-adaptation-1">strongly agree</label></td>' +
								'<td style="width: 14%;"><label for="q-6-adaptation-2">moderately agree</label></td>' +
								'<td style="width: 14%;"><label for="q-6-adaptation-3">slightly agree</label></td>' +
								'<td style="width: 14%;"><label for="q-6-adaptation-4">neither</label></td>' +
								'<td style="width: 14%;"><label for="q-6-adaptation-5">slightly disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-6-adaptation-6">moderately disagree</label></td>' +
								'<td style="width: 14%;"><label for="q-6-adaptation-7">strongly disagree</label></td>' +
							'</tr>' +
						'</table>' +
					'</div>' +
					'</p><hr /><br /><br /><br />' +
					'<p style="color: red;">7&nbsp;&nbsp;&nbsp;AMERICAN VS. BRITISH ENGLISH: OVERALL</p>' +
					'<hr />' +
					'<p>' +
						'<i>In this section, you will be asked to which variant of English (American or British) you feel more affinity. Please note that the question is mandatory and must be filled in properly.</i>' +
						'<div id="q-7-0" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'7.0&nbsp&nbsp;Generally speaking, I feel affinity in English with...' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><input type="radio" name="q-7-affinity" id="q-7-affinity-1" value="1"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-7-affinity" id="q-7-affinity-2" value="2"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-7-affinity" id="q-7-affinity-3" value="3"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-7-affinity" id="q-7-affinity-4" value="4"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-7-affinity" id="q-7-affinity-5" value="5"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-7-affinity" id="q-7-affinity-6" value="6"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-7-affinity" id="q-7-affinity-7" value="7"></td>' +
								'</tr>' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><label for="q-7-affinity-1">exclusively American</label></td>' +
									'<td style="width: 14%;"><label for="q-7-affinity-2">mostly American</label></td>' +
									'<td style="width: 14%;"><label for="q-7-affinity-3">a little more American</label></td>' +
									'<td style="width: 14%;"><label for="q-7-affinity-4">both/neither equally</label></td>' +
									'<td style="width: 14%;"><label for="q-7-affinity-5">a little more British</label></td>' +
									'<td style="width: 14%;"><label for="q-7-affinity-6">mostly British</label></td>' +
									'<td style="width: 14%;"><label for="q-7-affinity-7">exclusively British</label></td>' +
								'</tr>' +
							'</table>' +
						'</div>' +
					'</p><hr /><br /><br /><br />' +
					'<p style="color: red;">8&nbsp;&nbsp;&nbsp;OTHER FOREIGN LANGUAGES</p>' +
					'<hr />' +
					'<p>' +
						'<i>In this section, please indicate which other foreign languages you speak (if any). You can fill out a maximum of three additional foreign languages and must answer two extra questions for each. Should you speak more than three additional foreign languages, please indicate only those three in which you are most proficient and neglect the others. If you do not speak three (or any) additional foreign languages, you can leave the respective groups of questions unanswered.</i>' +
						'<div id="q-8-0" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'8.0&nbsp&nbsp;Foreign language #1' +
							'<span style="float: right;"><input type="text" id="q-8-FL1" name="q-8-FL1" class="qstn-in" maxlength="15"></span>' +
							'<br /><br /><br />' +
							'&nbsp;&nbsp;&nbsp;8.0.1&nbsp;&nbsp;How well do you think you speak this language (i.e., what is your proficiency in it)?' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL1" id="q-8-proficiency-FL1-1" value="1"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL1" id="q-8-proficiency-FL1-2" value="2"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL1" id="q-8-proficiency-FL1-3" value="3"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL1" id="q-8-proficiency-FL1-4" value="4"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL1" id="q-8-proficiency-FL1-5" value="5"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL1" id="q-8-proficiency-FL1-6" value="6"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL1" id="q-8-proficiency-FL1-7" value="7"></td>' +
								'</tr>' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><label for="q-8-proficiency-FL1-1">very basic</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-proficiency-FL1-3">modest</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-proficiency-FL1-5">pretty good</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-proficiency-FL1-7">excellent</label></td>' +
								'</tr>' +
							'</table>' +
							'<br /><br /><br />' +
							'&nbsp;&nbsp;&nbsp;8.0.2&nbsp;&nbsp;How often do you use this language?' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL1" id="q-8-frequency-FL1-1" value="1"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL1" id="q-8-frequency-FL1-2" value="2"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL1" id="q-8-frequency-FL1-3" value="3"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL1" id="q-8-frequency-FL1-4" value="4"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL1" id="q-8-frequency-FL1-5" value="5"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL1" id="q-8-frequency-FL1-6" value="6"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL1" id="q-8-frequency-FL1-7" value="7"></td>' +
								'</tr>' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><label for="q-8-frequency-FL1-1">very rarely</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-frequency-FL1-3">occasionally</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-frequency-FL1-5">regularly</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-frequency-FL1-7">very often</label></td>' +
								'</tr>' +
							'</table>' +
						'</div>' +
						'<br />' +
						'<div id="q-8-1" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'8.1&nbsp&nbsp;Foreign language #2' +
							'<span style="float: right;"><input type="text" id="q-8-FL2" name="q-8-FL2" class="qstn-in" maxlength="15"></span>' +
							'<br /><br /><br />' +
							'&nbsp;&nbsp;&nbsp;8.1.1&nbsp;&nbsp;How well do you think you speak this language (i.e., what is your proficiency in it)?' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL2" id="q-8-proficiency-FL2-1" value="1"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL2" id="q-8-proficiency-FL2-2" value="2"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL2" id="q-8-proficiency-FL2-3" value="3"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL2" id="q-8-proficiency-FL2-4" value="4"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL2" id="q-8-proficiency-FL2-5" value="5"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL2" id="q-8-proficiency-FL2-6" value="6"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL2" id="q-8-proficiency-FL2-7" value="7"></td>' +
								'</tr>' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><label for="q-8-proficiency-FL2-1">very basic</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-proficiency-FL2-3">modest</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-proficiency-FL2-5">pretty good</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-proficiency-FL2-7">excellent</label></td>' +
								'</tr>' +
							'</table>' +
							'<br /><br /><br />' +
							'&nbsp;&nbsp;&nbsp;8.1.2&nbsp;&nbsp;How often do you use this language?' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL2" id="q-8-frequency-FL2-1" value="1"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL2" id="q-8-frequency-FL2-2" value="2"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL2" id="q-8-frequency-FL2-3" value="3"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL2" id="q-8-frequency-FL2-4" value="4"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL2" id="q-8-frequency-FL2-5" value="5"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL2" id="q-8-frequency-FL2-6" value="6"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL2" id="q-8-frequency-FL2-7" value="7"></td>' +
								'</tr>' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><label for="q-8-frequency-FL2-1">very rarely</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-frequency-FL2-3">occasionally</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-frequency-FL2-5">regularly</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-frequency-FL2-7">very often</label></td>' +
								'</tr>' +
							'</table>' +
						'</div>' +
						'<br />' +
						'<div id="q-8-2" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'8.2&nbsp&nbsp;Foreign language #3' +
							'<span style="float: right;"><input type="text" id="q-8-FL3" name="q-8-FL3" class="qstn-in" maxlength="15"></span>' +
							'<br /><br /><br />' +
							'&nbsp;&nbsp;&nbsp;8.2.1&nbsp;&nbsp;How well do you think you speak this language (i.e., what is your proficiency in it)?' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL3" id="q-8-proficiency-FL3-1" value="1"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL3" id="q-8-proficiency-FL3-2" value="2"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL3" id="q-8-proficiency-FL3-3" value="3"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL3" id="q-8-proficiency-FL3-4" value="4"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL3" id="q-8-proficiency-FL3-5" value="5"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL3" id="q-8-proficiency-FL3-6" value="6"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-proficiency-FL3" id="q-8-proficiency-FL3-7" value="7"></td>' +
								'</tr>' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><label for="q-8-proficiency-FL3-1">very basic</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-proficiency-FL3-3">modest</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-proficiency-FL3-5">pretty good</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-proficiency-FL3-7">excellent</label></td>' +
								'</tr>' +
							'</table>' +
							'<br /><br /><br />' +
							'&nbsp;&nbsp;&nbsp;8.2.2&nbsp;&nbsp;How often do you use this language?' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL3" id="q-8-frequency-FL3-1" value="1"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL3" id="q-8-frequency-FL3-2" value="2"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL3" id="q-8-frequency-FL3-3" value="3"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL3" id="q-8-frequency-FL3-4" value="4"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL3" id="q-8-frequency-FL3-5" value="5"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL3" id="q-8-frequency-FL3-6" value="6"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-8-frequency-FL3" id="q-8-frequency-FL3-7" value="7"></td>' +
								'</tr>' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><label for="q-8-frequency-FL3-1">very rarely</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-frequency-FL3-3">occasionally</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-frequency-FL3-5">regularly</label></td>' +
									'<td style="width: 14%;"></td>' +
									'<td style="width: 14%;"><label for="q-8-frequency-FL3-7">very often</label></td>' +
								'</tr>' +
							'</table>' +
						'</div>' +
					'</p><hr /><br /><br /><br />' +
					'<div id="controls" align="center" style="font-size: 11px;">' +
	            '<button id="btn-done" class="jspsych-btn">Submit</button>' +
	        '</div><br /><br /><br /><br />'
			);
		} else {
			questionnaire = questionnaire.concat('<p style="color: red;">2&nbsp;&nbsp;AMERICAN VS. BRITISH ENGLISH</p>' +
					'<hr />' +
					'<p>' +
						'<i>In this section, you will be asked questions about your experience with and proficiency in American and British English. Please note that that all answers are mandatory and must be filled in properly, except for 2.1.1, 2.2.1, 2.5.1 and 2.5.2 which must be filled in only if the preceding question has been answered with \'other\' or \'Yes\'.</i>' +
						'<div id="q-2-1" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'2.0&nbsp;&nbsp;Which variant of English did you grow up with primarily?' +
							'<span style="float: right;"><select name="q-2-1" id="q-2-1" class="qstn-in"><option value="AE">American English</option><option value="BE">British English</option><option value="Other">other / mix (specify below)</option></select></span>' +
							'<br /><br /><br />' +
							'&nbsp;&nbsp;&nbsp;2.1.1&nbsp;&nbsp;If you chose \'other / mix\’, please specify (e.g., <i>Australian English</i>).' +
							'<span style="float: right;"><input type="text" id="q-2-1-1" name="q-2-1-1" class="qstn-in" maxlength="50"></span>' +
						'</div>' +
						'<br />' +
						'<div id="q-2-2" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'2.1&nbsp;&nbsp;I consider myself a speaker of...' +
							'<span style="float: right;"><select name="q-2-2" id="q-2-2" class="qstn-in"><option value="AE">American English</option><option value="BE">British English</option><option value="Other">other (specify below)</option></select></span>' +
							'<br /><br /><br />' +
							'&nbsp;&nbsp;&nbsp;2.2.1&nbsp;&nbsp;If you chose \'other\’, please specify (e.g., <i>Indian English</i>).' +
							'<span style="float: right;"><input type="text" id="q-2-2-1" name="q-2-2-1" class="qstn-in" maxlength="50"></span>' +
						'</div>' +
						'<br />' +
						'<div id="q-2-3" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'2.2&nbsp;&nbsp;The English I usually hear (for example, in personal contact or media) is...' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><input type="radio" name="q-2-3" id="q-2-3-1" value="1"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-3" id="q-2-3-2" value="2"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-3" id="q-2-3-3" value="3"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-3" id="q-2-3-4" value="4"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-3" id="q-2-3-5" value="5"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-3" id="q-2-3-6" value="6"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-3" id="q-2-3-7" value="7"></td>' +
								'</tr>' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;"><label for="q-2-3-1">exclusively American</label></td>' +
									'<td style="width: 14%;"><label for="q-2-3-2">mostly American</label></td>' +
									'<td style="width: 14%;"><label for="q-2-3-3">a little more American</label></td>' +
									'<td style="width: 14%;"><label for="q-2-3-4">both equally</label></td>' +
									'<td style="width: 14%;"><label for="q-2-3-5">a little more British</label></td>' +
									'<td style="width: 14%;"><label for="q-2-3-6">mostly British</label></td>' +
									'<td style="width: 14%;"><label for="q-2-3-7">exclusively British</label></td>' +
								'</tr>' +
								'<tr><td colspan="7">&nbsp;</td></tr>' +
								'<tr><td colspan="7" align="center"><input type="radio" name="q-2-3" id="q-2-3-8" value="8">&nbsp;&nbsp;<label for="q-2-3-8">a different variant of English (please specify which and in which mixture with American and/or British):</label>&nbsp;&nbsp;<input type="text" id="q-2-3-specify" name="q-2-3-specify" class="qstn-in" maxlength="50"></td></tr>' +
							'</table>' +
						'</div>' +
						'<br />' +
						'<div id="q-2-4" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'2.3&nbsp;&nbsp;How much experience do you have with British English?' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;">&nbsp;</td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-4" id="q-2-4-1" value="5"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-4" id="q-2-4-2" value="4"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-4" id="q-2-4-3" value="3"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-4" id="q-2-4-4" value="2"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-4" id="q-2-4-5" value="1"></td>' +
									'<td style="width: 14%;">&nbsp;</td>' +
								'</tr>' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;">&nbsp;</td>' +
									'<td style="width: 14%;"><label for="q-2-4-1">a lot of experience</label></td>' +
									'<td style="width: 14%;"><label for="q-2-4-2">quite some experience</label></td>' +
									'<td style="width: 14%;"><label for="q-2-4-3">moderate experience</label></td>' +
									'<td style="width: 14%;"><label for="q-2-4-4">little experience</label></td>' +
									'<td style="width: 14%;"><label for="q-2-4-5">(almost) no experience</label></td>' +
									'<td style="width: 14%;">&nbsp;</td>' +
								'</tr>' +
							'</table>' +
						'</div>' +
						'<br />' +
						'<div id="q-2-5" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'2.4&nbsp;&nbsp;Do you have any trouble understanding British English?' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;">&nbsp;</td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-5" id="q-2-5-1" value="5"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-5" id="q-2-5-2" value="4"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-5" id="q-2-5-3" value="3"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-5" id="q-2-5-4" value="2"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-5" id="q-2-5-5" value="1"></td>' +
									'<td style="width: 14%;">&nbsp;</td>' +
								'</tr>' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;">&nbsp;</td>' +
									'<td style="width: 14%;"><label for="q-2-5-1">not at all</label></td>' +
									'<td style="width: 14%;"><label for="q-2-5-2">very rarely</label></td>' +
									'<td style="width: 14%;"><label for="q-2-5-3">sometimes</label></td>' +
									'<td style="width: 14%;"><label for="q-2-5-4">quite frequently</label></td>' +
									'<td style="width: 14%;"><label for="q-2-5-5">absolutely</label></td>' +
									'<td style="width: 14%;">&nbsp;</td>' +
								'</tr>' +
							'</table>' +
						'</div>' +
						'<br />' +
						'<div id="q-2-6" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'2.5&nbsp;&nbsp;Have you ever spent a longer period of time (>4 weeks) in Great Britain or Ireland?' +
							'<span style="float: right;"><select name="q-2-6" id="q-2-6" class="qstn-in"><option value="N">NO</option><option value="Y">YES</option></select></span>' +
							'<br /><br /><br />' +
							'&nbsp;&nbsp;&nbsp;2.5.1&nbsp;&nbsp;If yes, how long was your stay in months (e.g., <i>6</i>)?' +
							'<span style="float: right;"><input type="text" id="q-2-6-duration" name="q-2-6-duration" class="qstn-in" maxlength="3"></span>' +
							'<br /><br /><br />' +
							'&nbsp;&nbsp;&nbsp;2.5.2&nbsp;&nbsp;If yes, how many years ago did you stay there (e.g., <i>2</i>)?' +
							'<span style="float: right;"><input type="text" id="q-2-6-ago" name="q-2-6-ago" class="qstn-in" maxlength="3"></span>' +
						'</div>' +
						'<br />' +
						'<div id="q-2-7" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'2.6&nbsp&nbsp;How aware are you of the differences between American and British English in terms of <b>words</b> (e.g., different words for the same thing)?' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;">&nbsp;</td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-7" id="q-2-7-1" value="5"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-7" id="q-2-7-2" value="4"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-7" id="q-2-7-3" value="3"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-7" id="q-2-7-4" value="2"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-7" id="q-2-7-5" value="1"></td>' +
									'<td style="width: 14%;">&nbsp;</td>' +
								'</tr>' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;">&nbsp;</td>' +
									'<td style="width: 14%;"><label for="q-2-7-1">fully aware</label></td>' +
									'<td style="width: 14%;"><label for="q-2-7-2">mostly aware</label></td>' +
									'<td style="width: 14%;"><label for="q-2-7-3">partially aware</label></td>' +
									'<td style="width: 14%;"><label for="q-2-7-4">slightly aware</label></td>' +
									'<td style="width: 14%;"><label for="q-2-7-5">not aware</label></td>' +
									'<td style="width: 14%;">&nbsp;</td>' +
								'</tr>' +
							'</table>' +
						'</div>' +
						'<br />' +
						'<div id="q-2-8" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'2.7&nbsp&nbsp;Do you feel that you know many British words that deviate from American ones (for example, <i>lorry</i> for <i>truck</i>)?' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;">&nbsp;</td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-8" id="q-2-8-1" value="5"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-8" id="q-2-8-2" value="4"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-8" id="q-2-8-3" value="3"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-8" id="q-2-8-4" value="2"></td>' +
									'<td style="width: 14%;"><input type="radio" name="q-2-8" id="q-2-8-5" value="1"></td>' +
									'<td style="width: 14%;">&nbsp;</td>' +
								'</tr>' +
								'<tr style="width: 98%;" align="center">' +
									'<td style="width: 14%;">&nbsp;</td>' +
									'<td style="width: 14%;"><label for="q-2-8-1">almost all of them</label></td>' +
									'<td style="width: 14%;"><label for="q-2-8-2">most of them</label></td>' +
									'<td style="width: 14%;"><label for="q-2-8-3">some of them</label></td>' +
									'<td style="width: 14%;"><label for="q-2-8-4">a couple of them</label></td>' +
									'<td style="width: 14%;"><label for="q-2-8-5">(almost) none</label></td>' +
									'<td style="width: 14%;">&nbsp;</td>' +
								'</tr>' +
							'</table>' +
						'</div>' +
						'<br />' +
						'<div id="q-2-9" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
							'2.8&nbsp&nbsp;Do you ever use those British words?' +
							'<br /><br />' +
							'<table style="width: 770px;" align="center">' +
								'<tr style="width: 100%;" align="center">' +
									'<td style="width: 25%;"><input type="radio" name="q-2-9" id="q-2-9-1" value="4"></td>' +
									'<td style="width: 25%;"><input type="radio" name="q-2-9" id="q-2-9-2" value="3"></td>' +
									'<td style="width: 25%;"><input type="radio" name="q-2-9" id="q-2-9-3" value="2"></td>' +
									'<td style="width: 25%;"><input type="radio" name="q-2-9" id="q-2-9-4" value="1"></td>' +
								'</tr>' +
								'<tr style="width: 100%;" align="center">' +
									'<td style="width: 25%;"><label for="q-2-9-1">yes, regularly</label></td>' +
									'<td style="width: 25%;"><label for="q-2-9-2">yes, occasionally</label></td>' +
									'<td style="width: 25%;"><label for="q-2-9-3">yes, but rarely</label></td>' +
									'<td style="width: 25%;"><label for="q-2-9-4">no, never</label></td>' +
								'</tr>' +
							'</table>' +
						'</div>' +
						'</p><hr /><br /><br /><br />' +
						'<p style="color: red;">3&nbsp;&nbsp;&nbsp;FOREIGN LANGUAGES</p>' +
						'<hr />' +
						'<p>' +
							'<i>In this section, please indicate which foreign languages you speak (i.e., languages that you speak that are not English, if any). You can fill in a maximum of three additional foreign languages and must answer two extra questions for each. Should you speak more than three additional foreign languages, please indicate only those three in which you are most proficient and neglect the others. If you do not speak three (or any) additional foreign languages, you can leave the respective groups of questions unanswered.</i>' +
							'<div id="q-3-0" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
								'3.0&nbsp&nbsp;Foreign language #1' +
								'<span style="float: right;"><input type="text" id="q-3-FL1" name="q-3-FL1" class="qstn-in" maxlength="15"></span>' +
								'<br /><br /><br />' +
								'&nbsp;&nbsp;&nbsp;3.0.1&nbsp;&nbsp;How well do you think you speak this language (i.e., what is your proficiency in it)?' +
								'<br /><br />' +
								'<table style="width: 770px;" align="center">' +
									'<tr style="width: 98%;" align="center">' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL1" id="q-3-proficiency-FL1-1" value="1"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL1" id="q-3-proficiency-FL1-2" value="2"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL1" id="q-3-proficiency-FL1-3" value="3"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL1" id="q-3-proficiency-FL1-4" value="4"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL1" id="q-3-proficiency-FL1-5" value="5"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL1" id="q-3-proficiency-FL1-6" value="6"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL1" id="q-3-proficiency-FL1-7" value="7"></td>' +
									'</tr>' +
									'<tr style="width: 98%;" align="center">' +
										'<td style="width: 14%;"><label for="q-3-proficiency-FL1-1">very basic</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-proficiency-FL1-3">modest</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-proficiency-FL1-5">pretty good</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-proficiency-FL1-7">excellent</label></td>' +
									'</tr>' +
								'</table>' +
								'<br /><br /><br />' +
								'&nbsp;&nbsp;&nbsp;3.0.2&nbsp;&nbsp;How often do you use this language?' +
								'<br /><br />' +
								'<table style="width: 770px;" align="center">' +
									'<tr style="width: 98%;" align="center">' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL1" id="q-3-frequency-FL1-1" value="1"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL1" id="q-3-frequency-FL1-2" value="2"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL1" id="q-3-frequency-FL1-3" value="3"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL1" id="q-3-frequency-FL1-4" value="4"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL1" id="q-3-frequency-FL1-5" value="5"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL1" id="q-3-frequency-FL1-6" value="6"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL1" id="q-3-frequency-FL1-7" value="7"></td>' +
									'</tr>' +
									'<tr style="width: 98%;" align="center">' +
										'<td style="width: 14%;"><label for="q-3-frequency-FL1-1">very rarely</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-frequency-FL1-3">occasionally</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-frequency-FL1-5">regularly</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-frequency-FL1-7">very often</label></td>' +
									'</tr>' +
								'</table>' +
							'</div>' +
							'<br />' +
							'<div id="q-3-1" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
								'3.1&nbsp&nbsp;Foreign language #2' +
								'<span style="float: right;"><input type="text" id="q-3-FL2" name="q-3-FL2" class="qstn-in" maxlength="15"></span>' +
								'<br /><br /><br />' +
								'&nbsp;&nbsp;&nbsp;3.1.1&nbsp;&nbsp;How well do you think you speak this language (i.e., what is your proficiency in it)?' +
								'<br /><br />' +
								'<table style="width: 770px;" align="center">' +
									'<tr style="width: 98%;" align="center">' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL2" id="q-3-proficiency-FL2-1" value="1"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL2" id="q-3-proficiency-FL2-2" value="2"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL2" id="q-3-proficiency-FL2-3" value="3"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL2" id="q-3-proficiency-FL2-4" value="4"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL2" id="q-3-proficiency-FL2-5" value="5"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL2" id="q-3-proficiency-FL2-6" value="6"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL2" id="q-3-proficiency-FL2-7" value="7"></td>' +
									'</tr>' +
									'<tr style="width: 98%;" align="center">' +
										'<td style="width: 14%;"><label for="q-3-proficiency-FL2-1">very basic</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-proficiency-FL2-3">modest</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-proficiency-FL2-5">pretty good</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-proficiency-FL2-7">excellent</label></td>' +
									'</tr>' +
								'</table>' +
								'<br /><br /><br />' +
								'&nbsp;&nbsp;&nbsp;3.1.2&nbsp;&nbsp;How often do you use this language?' +
								'<br /><br />' +
								'<table style="width: 770px;" align="center">' +
									'<tr style="width: 98%;" align="center">' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL2" id="q-3-frequency-FL2-1" value="1"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL2" id="q-3-frequency-FL2-2" value="2"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL2" id="q-3-frequency-FL2-3" value="3"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL2" id="q-3-frequency-FL2-4" value="4"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL2" id="q-3-frequency-FL2-5" value="5"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL2" id="q-3-frequency-FL2-6" value="6"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL2" id="q-3-frequency-FL2-7" value="7"></td>' +
									'</tr>' +
									'<tr style="width: 98%;" align="center">' +
										'<td style="width: 14%;"><label for="q-3-frequency-FL2-1">very rarely</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-frequency-FL2-3">occasionally</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-frequency-FL2-5">regularly</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-frequency-FL2-7">very often</label></td>' +
									'</tr>' +
								'</table>' +
							'</div>' +
							'<br />' +
							'<div id="q-3-2" align="left" style="font-size: 11px; background: #eee; padding: 15px;">' +
								'3.2&nbsp&nbsp;Foreign language #3' +
								'<span style="float: right;"><input type="text" id="q-3-FL3" name="q-3-FL3" class="qstn-in" maxlength="15"></span>' +
								'<br /><br /><br />' +
								'&nbsp;&nbsp;&nbsp;3.2.1&nbsp;&nbsp;How well do you think you speak this language (i.e., what is your proficiency in it)?' +
								'<br /><br />' +
								'<table style="width: 770px;" align="center">' +
									'<tr style="width: 98%;" align="center">' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL3" id="q-3-proficiency-FL3-1" value="1"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL3" id="q-3-proficiency-FL3-2" value="2"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL3" id="q-3-proficiency-FL3-3" value="3"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL3" id="q-3-proficiency-FL3-4" value="4"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL3" id="q-3-proficiency-FL3-5" value="5"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL3" id="q-3-proficiency-FL3-6" value="6"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-proficiency-FL3" id="q-3-proficiency-FL3-7" value="7"></td>' +
									'</tr>' +
									'<tr style="width: 98%;" align="center">' +
										'<td style="width: 14%;"><label for="q-3-proficiency-FL3-1">very basic</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-proficiency-FL3-3">modest</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-proficiency-FL3-5">pretty good</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-proficiency-FL3-7">excellent</label></td>' +
									'</tr>' +
								'</table>' +
								'<br /><br /><br />' +
								'&nbsp;&nbsp;&nbsp;3.2.2&nbsp;&nbsp;How often do you use this language?' +
								'<br /><br />' +
								'<table style="width: 770px;" align="center">' +
									'<tr style="width: 98%;" align="center">' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL3" id="q-3-frequency-FL3-1" value="1"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL3" id="q-3-frequency-FL3-2" value="2"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL3" id="q-3-frequency-FL3-3" value="3"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL3" id="q-3-frequency-FL3-4" value="4"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL3" id="q-3-frequency-FL3-5" value="5"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL3" id="q-3-frequency-FL3-6" value="6"></td>' +
										'<td style="width: 14%;"><input type="radio" name="q-3-frequency-FL3" id="q-3-frequency-FL3-7" value="7"></td>' +
									'</tr>' +
									'<tr style="width: 98%;" align="center">' +
										'<td style="width: 14%;"><label for="q-3-frequency-FL3-1">very rarely</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-frequency-FL3-3">occasionally</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-frequency-FL3-5">regularly</label></td>' +
										'<td style="width: 14%;"></td>' +
										'<td style="width: 14%;"><label for="q-3-frequency-FL3-7">very often</label></td>' +
									'</tr>' +
								'</table>' +
							'</div>' +
						'</p><hr /><br /><br /><br />' +
						'<div id="controls" align="center" style="font-size: 11px;">' +
		            '<button id="btn-done" class="jspsych-btn">Submit</button>' +
		        '</div><br /><br /><br /><br />'
				);
		}


		var container = $(questionnaire);

		var instructions = container.find('#instruction');
		var btn_continue = container.find('#btn-done');

		btn_continue.on('click', handleSubmit);
		container.find('.qstn-in').attr('style', 'font-size: 10px; width: 100px;');

		display_element.innerHTML = '';
		container.appendTo(display_element);
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

// Get experiment mode
var ppe = jsPsych.data.urlVariables()['ppe']
if (ppe === undefined) {
	ppe = 'P';
}

// couple of helper functions
function hasCompletedQuestionnaire() {
	return localStorage.getItem("pilot_questionnaire_done_" + ppe) == "yes";
}

function completeQuestionnaire() {
	localStorage.setItem("pilot_questionnaire_done_" + ppe, "yes");
}

function saveData(data, ppn, ppl, ppe) {
    var filename  = ppe + "_questionnaires_" + ppl + ".dat" // server adds datetime
    var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'POST',
		url: 'save_data.php',
        data: {
            filename: filename,
            data: jsonData
        },
		success: function(output) {
            completeQuestionnaire();
		}
	});
}

// instructions etc.

var exitDone = {
	type: 'instructions',
	pages: [
		'<p><b>Debrief</b></p>' +
		'<p>Thank you again for your participation. As already stated in the beginning, we are interested in word use by native and non-native speakers of English. In particular, you might have noticed that some objects tend to have different names in British versus American English (for example, cookie / biscuit); other objects have synonymous names regardless of English variant (for example, couch / sofa). We need to know the naming preferences of different speaker populations for these objects in order to be able to use them in a future study on word alignment (i.e., taking words over from another person in a conversation).</p>' +
		'<p>The study has been approved by the Ethical Committee of the Faculty of Social Sciences, Radboud University, Nijmegen.</p>' +
		'<p>Should you have any comments on or questions about the experiment, please contact the senior researcher, Kristin Lemhöfer, at <a href="mailto:k.lemhofer@donders.ru.nl">k.lemhofer@donders.ru.nl</a>.</p>' +
		'<p>Please hit \’Exit\' to complete this study. <i><b>It is critical that you do this in order to receive credit/compensation.</b></i></p>'
	],
	show_clickable_nav: true,
	button_label_next: 'Exit',
	button_label_previous: 'Previous'
};

var moveOn = function(){
	if (ppl == 0) {
		document.location.replace("https://app.prolific.co/submissions/complete?cc=241B3376"); // prolific forward for study completion
	} else {
		 // SONA forward for study completion
	}
};

var finishStudy = {
	type: 'call-function',
	func: moveOn
};

// setup experiment

var timeline = [];

if (!hasCompletedQuestionnaire()) {
	timeline.push({type: 'pilot-questionnaire', ppl: ppl});
}

timeline.push(exitDone);
timeline.push(finishStudy);

if (localStorage.getItem("informedConsentGiven_pilot") != "yes") {
	alert('You must have given informed consent to participate in this study.');
	document.location.replace("informedconsent.html?ppn="+ppn+"&ppl="+ppl+"&ppe="+ppe);
} else {
	jsPsych.init({ timeline: timeline, on_data_update: function(data){ saveData(data, ppn, ppl, ppe); } });
}
