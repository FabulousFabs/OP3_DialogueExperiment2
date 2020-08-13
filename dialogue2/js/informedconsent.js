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
        "consent_study": $('input[name="consent-question-agree"]:checked').val(),
        "consent_study_timestamp": $('#consent-question-date-1').val(),
        "consent_audio": $('input[name="consent-question-audio"]:checked').val(),
        "consent_audio_timestamp": $('#consent-question-date-2').val(),
        "consent_publish": $('input[name="consent-question-public"]:checked').val()
      };

      if (typeof(submission.consent_study) == 'undefined' || !['YES', 'NO'].includes(submission.consent_study)) {
        $('#btn-done').prop('disabled', false);
        alert('Please, make a choice whether you consent to participating in this study.');
        return;
      }

      if (submission.consent_study != 'YES') {
        $('#btn-done').prop('disabled', false);
        alert('You cannot participate in this study if you do not consent to it.');
        return;
      }

      if (submission.consent_study_timestamp.length < 10) {
        $('#btn-done').prop('disabled', false);
        alert('Please, fill in the timestamp for when you gave consent for this study (format: dd/mm/yyyy).');
        return;
      }

      if (typeof(submission.consent_audio) == 'undefined' || !['YES', 'NO'].includes(submission.consent_audio)) {
        $('#btn-done').prop('disabled', false);
        alert('Please, make a choice whether you consent to audio recordings being made.');
        return;
      }

      if (submission.consent_audio != 'YES') {
        $('#btn-done').prop('disabled', false);
        alert('You cannot participate in this study if you do not consent to audio recordings being made.');
        return;
      }

      if (submission.consent_audio_timestamp.length < 10) {
        $('#btn-done').prop('disabled', false);
        alert('Please, fill in the timestamp for when you gave consent for audio recordings being made (format: dd/mm/yyyy).');
        return;
      }

      if (typeof(submission.consent_publish) == 'undefined' || !['YES', 'NO'].includes(submission.consent_publish)) {
        $('#btn-done').prop('disabled', false);
        alert('Please, make a choice whether you consent to potentially identifiable audio recordings being made public beyond the scope of this study.');
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
          alert('Something went wrong. Try again or contact the researcher. Error: ' + request.responseText);
          return;
        }
      });

      /*
      $('#btn-done').prop('disabled', true);

      var submission = {
        "ppn": ppn,
        "name": $('#consent-question-name').val(),
        "dateofbirth": $('#consent-question-date').val(),
        "timestamp": $('#consent-question-time').val(),
        "question_future_studies": $('input[name="consent-question-future"]:checked').val(),
        "question_recordings": $('input[name="consent-question-recordings"]:checked').val(),
        //"question_study": $('input[name="consent-question-study"]:checked').val(),
        "question_agree": $('input[name="consent-question-agree"]:checked').val()
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

      /*if ([trial.audio_recordings, trial.video_recordings, trial.photo_recordings].includes(true)) {
        if (typeof(submission.question_recordings) == 'undefined' || !['YES', 'NO'].includes(submission.question_recordings)) {
          $('#btn-done').prop('disabled', false);
          alert('Please, make a choice whether collected recordings can be made public beyond the scope of this study.');
          return;
        }
      }*/

      /*if (typeof(submission.question_study) == 'undefined' || !['YES', 'NO'].includes(submission.question_study)) {
        $('#btn-done').prop('disabled', false);
        alert('Please, make a choice whether you want to consent to participating in this study.');
        return;
      }

      if (submission.question_study != 'YES') {
        $('#btn-done').prop('disabled', false);
        alert('You cannot participate in this study without giving consent. If you do not wish to participate in this study, you can close this window.');
        return;
      }

      if (typeof(submission.question_agree) == 'undefined' || submission.question_agree != 'CHECKED') {
        $('#btn-done').prop('disabled', false);
        alert('You cannot participate in this study if you do not agree to the information provided.');
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
      })*/
    }

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

    var container = $(
      '<div id="consent-form">' +
        '<div id="consent-header"><img src="donders_logo.svg" id="donders-logo" width="30%" height="30%" style="float: left;" /><b><font color="red">Donders Centre for Cognition</font></b><br /><b>Informed Consent for Behavioural Online Studies</b><br />To be filled out by the participant prior to the start of the experiment.<br /><br /></div>' +
        '<div id="consent-information" align="left" style="font-size: 11px; line-height: 12px;">' +
          '<p style="color: red; font-size: 12px;">INFORMATION</p><br />' +
          '<p style="color: red;">General Information (version 2.1, April 2020)</p>' +
          '<p>This study is part of the research of the Donders Centre of Cognition (DCC). This centre is part of the Donders Institute, Radboud University Nijmegen. For our research we need volunteers to participate in various experiments, e.g. language, perception, action or memory tasks.</p><br />' +
          '<p style="color: red;">Ethical approval</p>' +
          '<p>Each study you may participate in has been reviewed and approved by an independent ethics committee (the ‘Ethics Committee of Faculty of Social Sciences, Radboud University Nijmegen’, <a href="https://www.ru.nl/socialsciences/research/ethics-committee-social-science-ecss/" target="_blank">https://www.ru.nl/socialsciences/research/ethics-committee-social-science-ecss/</a>.</p><br />' +
          '<p style="color: red;">Risks, benefits and confidentiality</p>' +
          '<p>All our research and research methods have negligible to minimal risks. Although you will not benefit from this study personally, we hope that the results will contribute to scientific knowledge about behaviour. Demographic data or data concerning health, background or preferences, that are not identifying, may be collected for scientific purposes. In addition audio recordings are made to enable coding of the responses.<br />In order to be able to reimburse you for your participation, we will have to ask you to provide your email address, name, address, bank account number and signature. No coupling will be made between your research data and this personal data.</p><br />' +
          '<p style="color: red;">Information about the experiment and giving consent</p>' +
          '<p>It is recommended to read this information carefully, before you give consent. Consent is provided by ticking the ‘Yes’ box. You have the right to withdraw from the study at any time without giving a reason.</p><br />' +
          '<p style="color: red;">Payment</p>' +
          '<p>The monetary reward rate is 10 euros per hour and occurs via a reimbursement form, that will be sent to you via email by the researcher after you participated in the experiment. On this form you should fill out your name, address, signature and bank account number, either in writing or digitally. Then you should return a digital copy of this form to the researcher via email. After this, it lasts about 3 to 4 weeks before the money is deposited on your bank account.<br />Students of the Radboud University Nijmegen can, instead of with money, be rewarded with credit points. This occurs via the SONA system. For this manner of payment it won’t be necessary to provide personal details.</p><br />' +
          '<p style="color: red;">Use and preservation of your data</p>' +
          '<p>Your research data is stored and archived on protected servers on the Radboud University Nijmegen for at least 10 years. When this experiment is finalized and a report or article is written on this, the concomitant pseudonymized experimental data are shared or made public, enabling verification, re-use and/or replication of these research results.<br />The audio recordings cannot be pseudonymized due to its identifying nature. You have the right to disapprove sharing these data with other researchers beyond the scope of the study. This can be done via the consent form.<br />Your personal data is solely used for the payment procedure. No coupling is made between this personal data and the research data. The researcher will remove your email address and correspondence and reimbursement form directly after this form has been sent to the financial department. The personal details provided on the reimbursement form will be stored and archived at the financial department for 7 years.<br />Your data will be protected according to the European law (European General Data Protection Regulation (GDPR)).</p><br />' +
          '<p style="color: red;">Right to inspection</p>' +
          '<p>Few other people or agencies have the right to inspect your data, both personal and research data. This is necessary in order to check if the research was properly and reliably conducted. The persons or agencies who can obtain access to your data for the purpose of verification are: a controller who works for the responsible institute or national or international regulatory bodies such as the Ministry of Health. They will protect and keep your personal information secret. You are requested to approve this right to inspection. In case you do not agree, you cannot participate in the study.</p><br />' +
          '<p style="color: red;">After participation</p>' +
          '<p>We appreciate hearing about your experiences as a participant. You can give your feedback – with or without personal information - via this <a href="https://www.ru.nl/donders/forms/feedback-webform-dcc-en/" target="_blank">webform</a>. In case of questions or complaints about an experiment or about payment, contact the responsible experimenter first. You can also contact an independent contact person who is not involved in the study (independent contact person: Miriam Kos, of the Donders Centre for Cognition (<a href="mailto:dcclabcoordinator@socsci.ru.nl">dcclabcoordinator@socsci.ru.nl</a>; tel 0243612650)) or fill out the abovementioned <a href="https://www.ru.nl/donders/forms/feedback-webform-dcc-en/" target="_blank">webform</a>. If applicable the independent contact person will contact you by email or phone.</p><br />' +
          '<p style="color: red;">More information concerning your rights for processing data</p>' +
          '<p>For more information with respect to compliance with your rights regarding the processing of your personal data, you may contact the responsible entity for processing your data. The Radboud University is responsible for compliance with the rights of processing personal data for this research. You may contact the office of the Data Protection Officer of the Radboud University via <a href="mailto:privacy@ru.nl">privacy@ru.nl</a>. More information about your rights regarding processing of personal data can be found at <a href="https://www.ru.nl/privacy/english/" target="_blank">https://www.ru.nl/privacy/english/</a> and on the website of the Dutch Data Protection Authority: <a href="https://autoriteitpersoonsgegevens.nl/en" target="_blank">https://autoriteitpersoonsgegevens.nl/en</a>.</p><br /><br /><br />' +
          '<p style="color: red;">CONSENT FORM</p><br />' +
          '<p><b>By ticking on the box "YES"</b></p>' +
          '<p>' +
            '<div id="consent-text-confirm" align="left" style="font-size: 11px;">I confirm that:' +
              '<ul>' +
                '<li>I was satisfactorily informed about the study in writing, by means of the general information, version 2.1, April 2020.</li>' +
                '<li>I have carefully considered my participation in the experiment.</li>' +
                '<li>I participate voluntarily.</li>' +
              '</ul>' +
            '</div>' +
            '<div id="consent-text-agree" align="left" style="font-size: 11px;">I agree that:' +
              '<ul>' +
                '<li>My research data will be acquired and stored for scientific purposes until 10 years after the research has been finalized.</li>' +
                '<li>Audio recordings are made to enable coding of the responses.</li>' +
                '<li>Additional personal data is acquired for administrative purposes.</li>' +
                '<li>My not directly identifiable research data will be made public for verification, re-use and/or replication.</li>' +
                '<li>Regulatory authorities can access my data for verification purposes.</li>' +
              '</ul>' +
            '</div>' +
            '<div id="consent-text-understand" align="left" style="font-size: 11px;">I understand that:' +
              '<ul>' +
                '<li>I have the right to withdraw from the experiment at any time without having to give a reason.</li>' +
                '<li>There is no connection between my personal data used for payment and research data.</li>' +
                '<li>My privacy is protected according to applicable European law (European General Data Protection Regulation (GDPR).</li>' +
                '<li>My consent will be sought every time I participate in a new experiment.</li>' +
              '</ul>' +
            '</div>' +
          '</p><br />' +
          '<p>' +
            '<div id="consent-question-study" align="left" style="font-size: 11px;">' +
              'I give my consent to take part in this experiment' +
              '<span style="float: right;">' +
                '<input type="checkbox" id="consent-question-agree-yes" name="consent-question-agree" value="YES">' +
                '<label for="consent-question-agree">&nbsp;&nbsp;&nbsp;YES</label>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                '<input type="checkbox" id="consent-question-agree-no" name="consent-question-agree" value="NO">' +
                '<label for="consent-question-agree">&nbsp;&nbsp;&nbsp;NO *</label>' +
              '</span><br /><br />' +
              'Timestamp (dd/mm/yyyy):' +
              '<span style="float: right;"><input type="text" id="consent-question-date-1" name="consent-question-date-1" maxlength="10"></span>' +
            '</div>' +
          '</p><br /><hr><br /><br />' +
          '<p>' +
            '<div id="consent-question-audio" align="left" style="font-size: 11px;">' +
              'I give my consent that audio recordings are made' +
              '<span style="float: right;">' +
                '<input type="checkbox" id="consent-question-audio-yes" name="consent-question-audio" value="YES">' +
                '<label for="consent-question-audio-yes">&nbsp;&nbsp;&nbsp;YES</label>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                '<input type="checkbox" id="consent-question-audio-no" name="consent-question-audio" value="NO">' +
                '<label for="consent-question-audio-no">&nbsp;&nbsp;&nbsp;NO *</label>' +
              '</span><br /><br />' +
              'Timestamp (dd/mm/yyyy):' +
              '<span style="float: right;"><input type="text" id="consent-question-date-2" name="consent-question-date-2" maxlength="10"></span>' +
            '</div>' +
          '</p><br /><hr><br /><br />' +
          '<p>' +
            '<div id="consent-question-audio" align="left" style="font-size: 11px;">' +
              'I agree that collected potential identifiable audio recordings will be made public beyond the scope of this study' +
              '<span style="float: right;">' +
                '<input type="checkbox" id="consent-question-public-yes" name="consent-question-public" value="YES">' +
                '<label for="consent-question-public-yes">&nbsp;&nbsp;&nbsp;YES</label>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                '<input type="checkbox" id="consent-question-public-no" name="consent-question-public" value="NO">' +
                '<label for="consent-question-public-no">&nbsp;&nbsp;&nbsp;NO</label>' +
              '</span><hr style="margin-top: 18px;"><br /><br />' +
            '</div>' +
          '</p>' +
          '<p style="float: right;"><i>* when filling out no, you won’t be redirected to the experiment</i></p>' +
        '</div>' +
        '<div id="controls" align="center" style="font-size: 11px;">' +
            '<br /> <br /><button id="btn-done" class="jspsych-btn">Submit</button>' +
        '</div><br />'
    );

    var checkBoxes = container.find('input:checkbox');
    var buttonSubmit = container.find('#btn-done');

    display_element.innerHTML = '';
    container.appendTo(display_element);
    buttonSubmit.on('click', handleSubmit);
    checkBoxes.on('click', handleCheckbox);

    /*var container = $(
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
            '<li>My not directly identifiable experimental data (i.e., excluding audio recordings) may be made public for verification, re-use and/or replication.</li>' +
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
        '</div>' +
        '<br />' +
        '<div id="consent-question-sign" align="center" style="font-size: 11px;">' +
          '<span style="float: left;">Full name: <input type="text" id="consent-question-name" name="consent-question-name"></span>' +
          '<span>Date of birth (dd/mm/yy): <input type="text" id="consent-question-date" name="consent-question-date" maxlength="8"></span>' +
          '<span style="float: right;">Timestamp: <input type="text" id="consent-question-time" name="consent-question-time" value="" disabled></span>' +
        '</div><br />' +
        '<div id="controls" align="center" style="font-size: 11px;">' +
            '<input type="checkbox" id="consent-question-agree" name="consent-question-agree" value="CHECKED">' +
            '<label for="consent-question-agree">&nbsp;&nbsp;&nbsp;I agree to the information above and want to participate in this study.</label>' +
            '<br /> <br /><button id="btn-done" class="jspsych-btn">Submit</button>' +
        '</div>' +
        '<br />' +
      '</div>'
    );*/

    /*var date = new Date();
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
      //additionalConsentQuestionText.html('I agree that collected potential identifiable ' + r.join(' and ') + ' recordings will be made public beyond the scope of this study.');
      additionalConsentQuestion.hide();
    }
    else {
      additionalConsentExplanation.hide();
      additionalConsentQuestion.hide();
    }

    display_element.innerHTML = '';
    container.appendTo(display_element);
    buttonSubmit.on('click', handleSubmit);*/
  }

  return plugin;
})();

// Get participant number from URL query string
var ppn = jsPsych.data.urlVariables()['ppn']
if (ppn === undefined) {
    ppn = 1
}

var consent = {
  type: 'donders-style-informed-consent',
  audio_recordings: true,
  reason_recordings: 'be able to code the responses'
};

var moveOn = function() {
  localStorage.setItem("informedConsentGiven", "yes");
  document.location.replace("browsertesting.html?ppn="+ppn);
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
