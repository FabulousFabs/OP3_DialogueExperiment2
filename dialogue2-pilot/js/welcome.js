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
		'<p>Thanks very much for your interest in this experiment. Your task will be to name different pictures and to indicate the dialect you associate most strongly with any given word.</p>' +
		'<p>During the experiment, please keep in mind that you cannot make use of a dictionary or any such sources should you ever be unable to name any given picture. It is critical that you adhere to this strictly because we are interested specifically in your use of language rather than technically correct responses. As such, there are no right or wrong answers in this experiment and a blank response will be more helpful than one you retrieve from a dictionary.</p>' +
		'<p>Before the experiment commences, you will be asked to fill in a consent form. Whenever you are ready, please hit \'To the experiment\'.</p>'
	],
	show_clickable_nav: true,
	button_label_next: "To the experiment",
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
