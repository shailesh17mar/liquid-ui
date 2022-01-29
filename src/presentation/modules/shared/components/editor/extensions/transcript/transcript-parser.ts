//@ts-nocheck
// This script converts the json transcript file to html so that hyperaudio-lite can interpret it

// function handleFileSelect(evt) {
//     var files = evt.target.files; // FileList object

//     // Loop through the FileList and render image files as thumbnails.
//     for (var i = 0, f; f = files[i]; i++) {

//     // Only process image files.
//     if (!f.type.match('image.*')) {
//         continue;
//     }

//     var reader = new FileReader();

//     // Closure to capture the file information.
//     reader.onload = (function(theFile) {
//         return function(e) {
//         // Render thumbnail.
//         var span = document.createElement('span');
//         span.innerHTML = ['<img class="thumb" src="', e.target.result,
//                             '" title="', escape(theFile.name), '"/>'].join('');
//         document.getElementById('list').insertBefore(span, null);
//         };
//     })(f);

//     // Read in the image file as a data URL.
//     reader.readAsDataURL(f);
//     }
// }

// document.getElementById('files').addEventListener('change', handleFileSelect, false);

// TODO: I need to change this to get the structure for hyper
// This is:
//   a set of paragraphs with data-tc property of the formatted time of the first word
//   after that, a span than has the speaker,
//   attached to each one, the words with data-m and data-d properties
//    data-m is the word start time (ms)
//    data-d is the word duration (ms)
//  punctuation should be included inside the span it came from (check the next character when looping through)

// format seconds to minutes
function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + Math.round(s);
}

// clear transcript text
// TODO 1. add warning before clearing; 2. make it possible to undo
// function clearTranscript() {
//   $("#content").html("");
//   $(".annotation-content").html("");
// }

// create a new paragraph tag
function CreateNewPara(timeOfFirstWord, speaker, paraId) {
  var formattedTime = fmtMSS(timeOfFirstWord);
  var paraTime =
    "<p class='content' id='" +
    paraId +
    "' data-time='" +
    timeOfFirstWord +
    "' data-tc='" +
    formattedTime +
    "'>";
  // only give it span if it's a word?
  var paraSpeaker =
    "<span class='unread' data-m='" +
    timeOfFirstWord +
    "' data-d='0' class='speaker'>" +
    speaker +
    " </span>";
  var paraFormattedTime =
    "<span class ='timecode'>[" + formattedTime + "] </span>";
  var endPara = "</p>";
  var newPara = paraTime + paraSpeaker + paraFormattedTime + "{{}}" + endPara;
  return newPara;
}

// load audio from file or url using the dropdown or text input
// load audio from user selected file
// note that this made the computer crash with large file size. I think audio was loaded to memory. files were way too big with wav
// set limit

// check for user file entry
// this is simpler version of file api audio
// $('#user-audio-file').on('change', function (e) {
//     console.log('trying');
//     var $audio = $('#hyperplayer');
//     var target = e.currentTarget;
//     var file = target.files[0];
//     var reader = new FileReader();

//     if (target.files && file) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             $audio.attr('src', e.target.result);
//             document.getElementById("audio-name").innerHTML = theFile.name;
//         }
//         reader.readAsDataURL(file);
//     }
// });

// load json from user selected file

// Listen for user uploading a json
// load project from user selected file

// load html from file

// activates interactive script after two seconds on page load.
// TODO Load script asynchronously without a the need for a dumb timer

// for the audio control (possibly to be deleted eventually)
var speakerTimes = [];
var transcriptObject = [];
var word_start_time;
var data;
var output = "";

// display transcript from json file
export function displayTranscript(userJson: any) {
  // get json transcript from user input (default transcript.json)
  // var json = "json/" + document.getElementById("user-filename").value;
  // console.log("loading: " + json);

  // $.getJSON(json, function (data) {

  data = userJson;

  // assign variables for use in for loop below

  // contains the html to append for each word
  var text = "";
  // counts upwards each time the speaker changes, it should be as long as the length of speaker_times
  var speaker_counter = 0;
  var new_speaker = "";
  // counts of how long each para is
  var paragraphWordCounter = 0;
  // counts the number of paragraphs
  var paragraphCounter = 0;
  var newPara = "";

  // set the number of words after which a new sentence is started
  // TODO allow user to set
  var max_para_length = 10;

  const paraDictionary = {};
  const paragraphs = {};
  // use the json structure to detect the format being used
  // eg AWS vs DeepSpeech

  // parse the DeepSPeech formatted json
  if (data.results) {
    // AWS formatted json
    console.log("AWS formatted data detected");
    // turn on confidence display toggle

    // parse the AWS formatted json

    //
    var results = data.results;
    var transcript_raw = JSON.stringify(results.transcripts[0].transcript);

    // create empty array to hold speaker names and start times
    // TODO is this array actually used in anything?
    // REPLY: yes, it is used to look up who the speaker is depending on the time
    // Note: in the json a speaker can speak multiple times in a row
    // we simplify this

    if (results.speaker_labels) {
      console.log("multiple speakers");
      var whoIsSpeaker;
      var speaker_times = [];
      var segments = results.speaker_labels.segments;
      for (var i = 1; i < segments.length; i++) {
        // check if the speaker has changed
        if (whoIsSpeaker != segments[i].speaker_label) {
          // if so add to the array
          whoIsSpeaker = segments[i].speaker_label;
          let speaker = [];
          speaker.push(segments[i].speaker_label);
          speaker.push(Number(segments[i].start_time));
          speaker_times.push(speaker);
        }
      }
    } else {
      console.log("one speaker");
      new_speaker = "speaker";
      let speaker_times = [[]];
      let speaker_counter = 0;
      speaker_times[speaker_counter][0] = new_speaker;
    }

    // saving global variables for use in audio-control.js (poss can delete)
    speakerTimes = speaker_times;

    transcriptObject = results.items;

    let jsonLength = results.items.length;

    // loop through json to appeand words and data
    // TODO need to adjust this to create a para first
    // then to append words to that paragraph
    // then when speaker changes to create a new para
    for (var i = 0; i < jsonLength; i++) {
      // get data from JSON string
      let word = results.items[i].alternatives[0].content;
      let confidence = results.items[i].alternatives[0].confidence;
      let word_start_time = results.items[i].start_time;
      let word_start_time_ms = Math.round(word_start_time * 1000);
      if (results.items[i + 1] && results.items[i + 1].start_time) {
        var next_word_start_time = results.items[i + 1].start_time;
        // TODO truncaste this as it can go to lots of decimal places
        var duration_ms = Math.round(
          1000 * (next_word_start_time - word_start_time)
        );
      } else if (results.items[i + 2] && results.items[i + 2].start_time) {
        var next_word_start_time = results.items[i + 2].start_time;
        // ``;
        // TODO truncaste this as it can go to lots of decimal places
        var duration_ms = Math.round(
          1000 * (next_word_start_time - word_start_time)
        );
      }
      let type = results.items[i].type;

      // check for punctuation and ensure punctuation doesn't have spaces before them
      if (type == "pronunciation") {
        var space = " ";
        paragraphWordCounter++;
      } else if (type == "punctuation") {
        var space = "";
      }

      // make sure first word has a speaker - may be unecessary
      if (i == 0) {
        // find out and set the speaker counter for the first word

        // // to check who the speaker is at the time of the first word
        // while (Number(speaker_times[speaker_counter][1]) < Number(word_start_time)) {
        //   speaker_counter++;
        // };

        // TODO temporary if condition
        if (results.speaker_labels) {
          new_speaker = speaker_times[speaker_counter][0];
        }

        // add new para
        // function takes: timeOfFirstWord, speaker, wordCount
        var paraId = "para-" + paragraphCounter;
        var newPara = CreateNewPara(word_start_time, new_speaker, paraId);
        paragraphs[paraId] = newPara;
        output = output + newPara;

        // document.getElementById('speaker').insertAdjacentHTML('beforebegin',
        // newPara);
      }

      // ok this might need overhaul
      // want to detect if the speaker has changed
      // if it has, create a new paragraph and increase speaker counter by 1
      // speaker_times has the times where the speaker changes
      // speaker counter starts at 0
      // when the time of the word exceeds speaker_times 0th row, then change it

      // add new para if speaker changes
      // checks if it's not the last speaker

      // TODO temporary if condition
      if (results.speaker_labels) {
        if (speaker_counter < speaker_times.length && i !== 0) {
          var speakerStart = speaker_times[speaker_counter][1];
          // checks if the time of the speaker is less than the current word
          // ok to do this, we need to check for the next word, not this one
          // also what if the next word is punctuation
          if (speakerStart < next_word_start_time) {
            // checks if the amount of time the speaker spoke for is more than a second
            // might be able to remove this since it addressed a problems that's been solved elsewhere
            var min_time = 1;
            // if
            if (
              speaker_times[speaker_counter + 1] &&
              speaker_times[speaker_counter + 1][1] -
                speaker_times[speaker_counter][1] >
                min_time
            ) {
              speaker_counter++;
              // checks if the speaker has changed
              if (new_speaker != speaker_times[speaker_counter][0]) {
                // console.log(speaker_times);

                // console.log(word);
                // console.log(speaker_counter);

                // changes the speaker variable
                new_speaker = speaker_times[speaker_counter][0];

                // add a new para
                paragraphCounter++;
                paraId = "para-" + paragraphCounter;

                newPara = CreateNewPara(word_start_time, new_speaker, paraId);
                output = output + newPara;
                paragraphs[paraId] = newPara;
                // reset the paragraph word counter
                paragraphWordCounter = 0;
              }
            }
          }
        }
      }

      // add data to each word: confidence, start time, duration, speaker
      var spanStartTime =
        "<span data-m=" +
        word_start_time_ms +
        " data-d=" +
        duration_ms +
        " data-confidence=" +
        confidence +
        ' style="">';
      // create html to be added

      if (type == "pronunciation") {
        // remove

        // text = space + word;
        text = space + spanStartTime + word + "</span>";
      } else if (type == "punctuation") {
        // check if the previous word was also punctuation cause by removing an utterence

        text = space + word;
      }

      // Uncomment out below to use tooltips
      // spanTooltip = "<span class='tooltiptext'>";
      // divTooltip = "<div class='tooltip'>";
      // text = space + divTooltip + spanStartTime + word + "</span>" + spanTooltip + confidence + "<br>" + word_start_time + "</span>" + "</div>";

      // append text to paragraph
      var para = "para-" + paragraphCounter;
      if (!paraDictionary[para]) {
        paraDictionary[para] = [];
      }
      paraDictionary[para].push(text);

      //   $(para).append(text);

      // if it gets to a full stop and the current paragraph is too long, start a new paragraph
      // TODO let user set the paragraph amount

      if (
        type == "punctuation" &&
        (word == "." || word == "!" || word == "?") &&
        paragraphWordCounter > max_para_length &&
        new_speaker == speaker_times[speaker_counter][0]
      ) {
        // set data for new speaker
        paragraphCounter++;
        paraId = "para-" + paragraphCounter;

        // use next word start time as current one is punctuation
        newPara = CreateNewPara(next_word_start_time, new_speaker, paraId);
        output = output + newPara;
        paragraphs[paraId] = newPara;
        // reset the paragraph word counter
        paragraphWordCounter = 0;
        // console.log(word);
        // console.log('para too long');
      }

      //for (var i = 0; i < speaker_times.length; i++) {
      //console.log(speaker_times[i]);
      //}
    }
  }

  //   var autoScrollCheck = document.getElementById("autoscroll-off").checked;
  //   if (autoScrollCheck) {
  //     setTimeout(function () {
  //       console.log("transcript being initiated");
  //       //   hyper(true);
  //     }, 1000);
  //   }

  output = "";
  Object.keys(paragraphs).forEach((id) => {
    const content = paraDictionary[id] ? paraDictionary[id].join("") : "";
    output = output + paragraphs[id].replace("{{}}", content);
  });
  // console.log(paraDictionary);
  return output;
}
