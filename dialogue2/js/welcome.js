// Initialize global variables

// Get participant number from URL query string
var ppn = jsPsych.data.urlVariables()['ppn']
if (ppn === undefined) {
    ppn = 1
}

// Initialise timeline
var greetings = {
	type: 'instructions',
	pages : [
		'<p><b>Welcome!</b></p>' +
		'<p>Thanks very much for your interest in this experiment. Before being forwarded to the actual experiment, it is vital that you read this short technical disclaimer.</p>' +
		'<p>Due to technical limitations, this experiment can only be completed in up-to-date versions of Google Chrome, Microsoft Edge or Mozilla Firefox. Should you be using a different browser (for example, Safari or Internet Explorer), please close this tab and open it in one of the before mentioned browsers instead. Thanks very much for your co-operation.</p>' +
		'<p>If you are using one of the permitted browsers already, please hit \'To the experiment\'.'
	],
	show_clickable_nav: true,
	button_label_next: "To the experiment",
	button_label_previous: "Previous",
};

var forward = {
	type: 'call-function',
	func: function(){
		document.location.replace("informedconsent.html?ppn=" + ppn);
	},
};

var timeline = [];
timeline.push(greetings);
timeline.push(forward);

jsPsych.init({
	timeline: timeline
});
