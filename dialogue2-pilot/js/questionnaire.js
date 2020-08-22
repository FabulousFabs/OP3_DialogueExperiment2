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

		var handleSubmit = function() {
			return false;
		};

		var questionnaire = '<div id="questionnaire" align="left" style="font-size: 11px; line-height: 12px;">' +
			'<p align="center"><b>PERSONAL QUESTIONNAIRE</b></p>' +
			'<p>Please fill in all questions displayed below truthfully and comprehensively in order to complete the experiment. Thanks very much! All of your responses will be stored anonymously and you will remain unidentifiable. Whenever you have filled in all questions, please do not forget to hit \'Submit\' at the bottom of this page to make sure data are transmitted. You will be debriefed after successful submission of the questionnaire.</p><br />' +
			'<br />' +
			'<p style="color: red;">1&nbsp;&nbsp;&nbsp;GENERAL INFORMATION</p>' +
			'<hr />' +
			'<p>' +
				'<i>In this section, you will be asked to answer general biographical questions about yourself. Please note that all answers are mandatory except for 1.2.1. Should your mother tongue not be Dutch or English or should you have grown up bilingually, please indicate additional or another mother tongue(s) in 1.2.1.</i>' +
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
						'2.5&nbsp;&nbsp;How often do you <b>listen</b> to (spoken) English (including media like movies, radio, podcasts, etc.)?' +
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
						'2.6&nbsp;&nbsp;How often do you <b>speak</b> English?' +
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
						'2.7&nbsp;&nbsp;How often do you <b>write</b> English?' +
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
				'<p style="color: red;">3&nbsp;&nbsp;&nbsp;MOTIVATION AND ANXIETY</p>' +
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
						'<span style="float: right;"><select name="q-4-visit-GBIR" id="q-4-visit-USCA" class="qstn-in"><option value="N">NO</option><option value="Y">YES</option></select></span>' +
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
				'<p style="color: red;">6&nbsp;&nbsp;&nbsp;AMERICAN VS. BRITISH ENGLISH: LEXICON</p>' +
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
							'<span style="float: right;"><input type="text" id="q-8-FL1" name="q-1-FL1" class="qstn-in" maxlength="15"></span>' +
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
							'<span style="float: right;"><input type="text" id="q-8-FL2" name="q-1-FL2" class="qstn-in" maxlength="15"></span>' +
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
							'<span style="float: right;"><input type="text" id="q-8-FL3" name="q-1-FL3" class="qstn-in" maxlength="15"></span>' +
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
	        '</div><br />'
			);
		} else {
			questionnaire = questionnaire.concat('<p style="color: red;">2&nbsp;&nbsp;AMERICAN VS. BRITISH ENGLISH</p>');
		}


		var container = $(questionnaire);

		var instructions = container.find('#instruction');
		var btn_continue = container.find('#btn-continue');

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

// couple of helper functions
function hasCompletedQuestionnaire() {
	return localStorage.getItem("pilot_questionnaire_done") == "yes";
}

function getCompletedTrials() {
	var stored_items = localStorage.getItem("pilot_completed_Q");
	if (stored_items === null)
		return [];
	return stored_items.split(",").map(function(v) {
		return parseInt(v);
	});
}

function isImageCompleted(id) {
	var current = getCompletedTrials();
	return !(current.indexOf(id) === -1);
}

function addCompletedImage(id) {
	var items = getCompletedTrials();
	items.push(id);
	localStorage.setItem("pilot_completed_Q", items.join(','));
}

function saveData(data, ppn, ppl) {
    var filename  = "questionnaire_" + ppl + "_" + ppn + "_responses.dat" // server adds datetime
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
						addCompletedImage(data.index);
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
		'<p>Should you have any comments on or questions about the experiment, please contact the senior researcher, Kristin Lemhöfer, at <a href="mailto:k.lemhofer@donders.ru.nl">k.lemhofer@donders.ru.nl</a>.</p>',
		'<p><b>All done.</b></p>' +
		'<p>You have completed the experiment. Thanks very much for your participation!</p>' +
		'<p>You can now close this window.</p>'
	],
	show_clickable_nav: true,
	button_label_next: 'Exit',
	button_label_previous: 'Previous'
};

// setup experiment

var timeline = [];

if (!hasCompletedQuestionnaire()) {
	timeline.push({type: 'pilot-questionnaire', ppl: ppl});
}

timeline.push(exitDone);

if (localStorage.getItem("informedConsentGiven_pilot") != "yes") {
	alert('You must have given informed consent to participate in this study.');
	document.location.replace("informedconsent.html?ppn="+ppn+"&ppl="+ppl);
} else {
	jsPsych.init({ timeline: timeline, on_data_update: function(data){ saveData(data, ppn, ppl); } });
}
