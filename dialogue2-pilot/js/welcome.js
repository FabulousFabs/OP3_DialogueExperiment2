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

// Initialise timeline
var greetings = {
	type: 'instructions',
	pages : [
		'<p><b>Welcome!</b></p>' +
		'<p>Thank you very much for participating in this experiment. Our aim is to find out how individuals from different countries and with different language backgrounds name certain objects in English' + (ppl == 1 ? ' and Dutch' : '') + '. Your task will thus be to name different pictures and to judge already given names later.' +
		'<p>During the experiment, please keep in mind that you cannot make use of a dictionary or any such resources should you ever be unable to name any given picture. It is critical that you adhere to this strictly because we are interested specifically in your use of language rather than technically correct responses. As such, there are no right or wrong answers in this experiment and a blank response will be more helpful than one you retrieve from a dictionary.</p>' +
		'<p>Before the experiment commences, you will be asked to fill in a consent form.</p>',
		'<p><b>Technical brief</b></p>' +
		'<p>Before continuing with the experiment, please make sure that you are running and up-to-date version of Google Chrome, Mozilla Firefox, Safari or Microsoft Edge as your browser, as the experiment will run smoothly only on these. Should you be running a different browser, please switch to one of the supported browsers (see above) and simply reopen this page in that browser.</p>' +
		'<p>Further, should your browser ever freeze or crash or should the tab ever be closed for any other reason, you can simply reopen the experiment in the same browser and start right where you left off.</p>' +
		'<p>Should you run into any persistent issues, please contact Fabian Schneider at <a href="mailto:f.schneider@donders.ru.nl?subject=OP3%20pilot%20technical%20difficulties%20with%20ppl' + ppl + '">f.schneider@donders.ru.nl</a>.</p>' +
		'<p>Please hit \'Continue\' to complete the informed consent form.</p>'
	],
	show_clickable_nav: true,
	button_label_next: "Continue",
	button_label_previous: "Previous",
};

var forward = {
	type: 'call-function',
	func: function(){
		document.location.replace("informedconsent.html?ppn=" + ppn + "&ppl=" + ppl);
	},
};

var timeline = [];
timeline.push(greetings);
timeline.push(forward);

jsPsych.init({
	timeline: timeline
});
