// Initialize global variables

jsPsych.plugins['donders-style-informed-consent'] = (function(){
  var plugin = {};

  plugin.info = {
    name: 'donders-style-informed-consent',
    parameters: {
      audio_recordings: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: false,
        pretty_name: 'Audio Recordings',
        description: 'Are audio recordings required during the experiment?'
      },
      video_recordings: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: false,
        pretty_name: 'Video Recordings',
        description: 'Are video recordings required during the experiment?'
      },
      photo_recordings: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: false,
        pretty_name: 'Photo Recordings',
        description: 'Are photo recordings required during the experiment?'
      },
      reason_recordings: {
        type: jsPsych.plugins.parameterType.STRING,
        default: '',
        pretty_name: 'Reasons for Recordings',
        description: 'Why are recordings being made?'
      },
      vulnerable_participants: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: false,
        pretty_name: 'Vulnerable Participants',
        description: 'Are participants part of a vulnerable group?'
      }
    }
  };

  plugin.trial = function(display_element, trial) {
    var handleSubmit = function() {
      $('#btn-done').prop('disabled', true);

      var submission = {
        "ppn": ppn,
        "name": $('#consent-question-name').val(),
        "dateofbirth": $('#consent-question-date').val(),
        "timestamp": $('#consent-question-time').val(),
        "question_future_studies": $('input[name="consent-question-future"]:checked').val(),
        "question_recordings": $('input[name="consent-question-recordings"]:checked').val(),
        "question_study": $('input[name="consent-question-study"]:checked').val()
      };

      if (submission.name.length < 1) {
        $('#btn-done').prop('disabled', false);
        alert('Please, enter your full name.')
        return;
      }

      if (submission.dateofbirth.length != 8) {
        $('#btn-done').prop('disabled', false);
        alert('Please, enter your date of birth (dd/mm/yy).');
        return;
      }

      if (typeof(submission.question_future_studies) == 'undefined' || !['YES', 'NO'].includes(submission.question_future_studies)) {
        $('#btn-done').prop('disabled', false);
        alert('Please, make a choice whether you would like to be approached for participation in future studies.');
        return;
      }

      if ([trial.audio_recordings, trial.video_recordings, trial.photo_recordings].includes(true)) {
        if (typeof(submission.question_recordings) == 'undefined' || !['YES', 'NO'].includes(submission.question_recordings)) {
          $('#btn-done').prop('disabled', false);
          alert('Please, make a choice whether collected recordings can be made public beyond the scope of this study.');
          return;
        }
      }

      if (typeof(submission.question_study) == 'undefined' || !['YES', 'NO'].includes(submission.question_study)) {
        $('#btn-done').prop('disabled', false);
        alert('Please, make a choice whether you want to consent to participating in this study.');
        return;
      }

      if (submission.question_study != 'YES') {
        $('#btn-done').prop('disabled', false);
        alert('You cannot participate in this study without giving consent. If you do not wish to participate in this study, you can close this window.');
        return;
      }

      var filename = "informed_consent.dat";

      $.ajax({
        type: 'POST',
        url: 'save_data.php',
        data: {
          filename: filename,
          data: JSON.stringify(submission)
        },
        success: function(output) {
          display_element.innerHTML = '';
          jsPsych.finishTrial();
        },
        error: function(request, status, e) {
          $('#btn-done').prop('disabled', false);
          alert('Something went wrong. Try again, or contact the researcher. Error: ' + request.responseText);
          return;
        }
      })
    }

    var container = $(
      '<div id="consent-form">' +
        '<div id="consent-header"><img src="donders_logo.svg" id="donders-logo" width="30%" height="30%" style="float: left;" /><b><font color="red">Donders Centre for Cognition</font></b><br /><b>Informed Consent for Behavioural Online Studies</b><br />To be filled out by the participant prior to the start of the experiment.<br /><br /></div>' +
        '<div id="consent-text-confirm" align="left" style="font-size: 11px;">I confirm that:' +
          '<ul>' +
            '<li>I was satisfactorily informed about the study in writing, by means of the general information brochure (version 2.1, December 2018) and about the study itself by the researcher concerned.</li>' +
            '<li>I have had the opportunity to put forward questions regarding the study and that these questions have been answered satisfactorily.</li>' +
            '<li>I have carefully considered my participation in the experiment.</li>' +
            '<li>I participate voluntarily.</li>' +
          '</ul>' +
        '</div>' +
        '<div id="consent-text-agree" align="left" style="font-size: 11px;">I agree that:' +
          '<ul>' +
            '<li>My research data will be acquired and stored for scientific purposes as mentioned in the general information brochure until 10 years after the research has been finalized.</li>' +
            '<li>Personal data is acquired for administrative and scientific purposes.</li>' +
            '<li>The connection between my personal and research data is stored until maximally one month after finalization of this study.</li>' +
            '<li>Demographic data or data concerning my health, background or preferences is collected for scientific purposes.</li>' +
            '<li id="additional-consent-agree"></li>' +
            '<li>My not directly identifiable experimental data will be made public for verification, re-use and/or replication.</li>' +
            '<li>Regulatory authorities can access my data for verification purposes.</li>' +
          '</ul>' +
        '</div>' +
        '<div id="consent-text-understand" align="left" style="font-size: 11px;">I understand that:' +
          '<ul>' +
            '<li>I have the right to withdraw from the experiment at any time without having to give a reason.</li>' +
            '<li>I have the right to request disposal of my experimental data up to 1 month after participation.</li>' +
            '<li>My privacy is protected according to applicable European law (European General Data Protection Regulation (GDPR).</li>' +
            '<li>My consent will be sought every time I participate in a new experiment.</li>' +
          '</ul>' +
        '</div><br />' +
        '<div id="consent-mkch" align="left" style="font-size: 11px;"><b>Make a choice:</b></div>' +
        '<div id="consent-question-future" align="left" style="font-size: 11px;">' +
          'I agree that I can be approached for a future study for comparable scientific research and to this end my contact details are stored until maximally one month after finalization of this study.&nbsp;&nbsp;&nbsp;' +
          '<span style="float: right;"><input type="radio" id="consent-question-future-yes" name="consent-question-future" value="YES"><label for="consent-question-future-yes">&nbsp;YES&nbsp;</label>' +
          '<input type="radio" id="consent-question-future-no" name="consent-question-future" value="NO"><label for="consent-question-future-no">&nbsp;NO&nbsp;</label></span>' +
        '</div>' +
        '<div id="consent-question-recordings" align="left" style="font-size: 11px;">' +
          '<span id="consent-question-recordings-text"></span>&nbsp;&nbsp;&nbsp;' +
          '<span style="float: right;"><input type="radio" id="consent-question-recordings-yes" name="consent-question-recordings" value="YES"><label for="consent-question-recordings-yes">&nbsp;YES&nbsp;</label>' +
          '<input type="radio" id="consent-question-recordings-no" name="consent-question-recordings" value="NO"><label for="consent-question-recordings-no">&nbsp;NO&nbsp;</label></span>' +
        '</div>' +
        '<div id="consent-question-study" align="left" style="font-size: 11px;">' +
          'I give consent to take part in this experiment.&nbsp;&nbsp;&nbsp;' +
          '<span style="float: right;"><input type="radio" id="consent-question-study-yes" name="consent-question-study" value="YES"><label for="consent-question-study-yes">&nbsp;YES&nbsp;</label>' +
          '<input type="radio" id="consent-question-study-no" name="consent-question-study" value="NO"><label for="consent-question-study-no">&nbsp;NO&nbsp;</label></span>' +
        '</div><br />' +
        '<div id="consent-question-sign" align="center" style="font-size: 11px;">' +
          '<span style="float: left;">Full name: <input type="text" id="consent-question-name" name="consent-question-name"></span>' +
          '<span>Date of birth (dd/mm/yy): <input type="text" id="consent-question-date" name="consent-question-date" maxlength="8"></span>' +
          '<span style="float: right;">Timestamp: <input type="text" id="consent-question-time" name="consent-question-time" value="" disabled></span>' +
        '</div><br />' +
        '<div id="controls">' +
            '<button id="btn-done" class="jspsych-btn">Submit</button>' +
        '</div>' +
        '<br />' +
      '</div>'
    );

    var date = new Date();
    var datestr = ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" +  ("0" + (date.getFullYear())).slice(-2) + " " +  ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
    var additionalConsentExplanation = container.find('#additional-consent-agree');
    var additionalConsentQuestion = container.find('#consent-question-recordings');
    var additionalConsentQuestionText = container.find('#consent-question-recordings-text');
    var consentTimestamp = container.find('#consent-question-time');
    var buttonSubmit = container.find('#btn-done');
    consentTimestamp.val(datestr);
    var d = false;
    var r = [];
    if (trial.audio_recordings) { d = true; r.push('Audio'); }
    if (trial.video_recordings) { d = true; r.push('Video'); }
    if (trial.photo_recordings) { d = true; r.push('Photo'); }
    if (d) {
      additionalConsentExplanation.html(r.join(' and ') + ' recordings are made, in order to ' + trial.reason_recordings + '.');
      additionalConsentQuestionText.html('I agree that collected potential identifiable ' + r.join(' and ') + ' recordings will be made public beyond the scope of this study.');
    }
    else {
      additionalConsentExplanation.hide();
      additionalConsentQuestion.hide();
    }

    display_element.innerHTML = '';
    container.appendTo(display_element);
    buttonSubmit.on('click', handleSubmit);
  }

  return plugin;
})();

// Get participant number from URL query string
var ppn = jsPsych.data.urlVariables()['ppn']
if (ppn === undefined) {
    ppn = 1
}

// find stimulus list for next task
var list_number = jsPsych.data.urlVariables()['list'];
if (list_number === undefined) {
  list_number = 0;
}

var consent = {
  type: 'donders-style-informed-consent',
  audio_recordings: true,
  reason_recordings: 'analyze differences in second language acquisition'
};

var moveOn = function() {
  localStorage.setItem("informedConsentGiven", "yes");
  document.location.replace("experiment.html?ppn="+ppn+"&list="+list_number);
}

var setConsent = {
  type: "call-function",
  func: moveOn,
}

// Make timeline
var timeline = [];
timeline.push(consent);
timeline.push(setConsent);

if (localStorage.getItem("informedConsentGiven") != "yes") {
  jsPsych.init({
      timeline: timeline
  });
} else {
  moveOn();
}
