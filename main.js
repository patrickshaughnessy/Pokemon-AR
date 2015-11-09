(function($){
'use strict';

  var ref = new Firebase('https://pokemondemo.firebaseio.com/');
  var textRef = ref.child('text');
  var responseRef = ref.child('response');

  $(document).ready(init);

  function init() {
    // 
    // window.SpeechRecognition = window.SpeechRecognition       ||
    //                                  window.webkitSpeechRecognition ||
    //                                  null;
    //
    //   var recognizer = new window.SpeechRecognition();
    //   var transcription = document.getElementById('transcription');
    //
    //   // Recogniser doesn't stop listening even if the user pauses
    //   recognizer.continuous = true;
    //
    //   // Start recognising
    //   recognizer.onresult = function(event) {
    //     transcription.textContent = '';
    //
    //     for (var i = event.resultIndex; i < event.results.length; i++) {
    //       if (event.results[i].isFinal) {
    //         // console.log('isfinal :' + event.results[i][0].transcript);
    //         var text = event.results[i][0].transcript;
    //         // debugger
    //         text = text.split(' ').join('');
    //         console.log(text);
    //         speakVoice(text);
    //       } else {
    //         console.log(event.results[i][0].transcript);
    //       }
    //     }
    //   };
    //
    //   try {
    //     recognizer.start();
    //   } catch(ex) {
    //     console.log('fuck');
    //   }

    // $("#play").on("click",speakVoice);

    // textRef.on('child_added', textRefHandler);
    responseRef.on('child_added', responseRefHandler);
  }

  // checking the command
  function responseRefHandler(responseSnap){
    // debugger;
    var text = responseSnap.val().text;
    responsiveVoice.speak(text);

    if (text === "Cade, is it? That is a truly impeccable name! Take good care of Cade!"){
      $('#cade').empty();
      var $cade = $('<img>').attr('src', '/025.png');
      $('#cade').append($cade);
    }
    responseRef.remove();
    // debugger
  }

// receiving a command
  function textRefHandler(textSnap){

    var chance = Math.random();
    console.log(chance);

    switch (textSnap.val().text){
      case ('findPokemon'):
        if (chance < 0.5){
          responseRef.push({
            text: "A wild pikachu has appeared"
          });
        } else {
          responseRef.push({
            text: "No pokemon in this area"
          });
        }
        break;
      case ('capturePokemon'):
        if (chance < 0.6){
          responseRef.push({
            text: "You have captured a wild Pikachu! What will you name your new Pikachu?"
          });
        } else {
          responseRef.push({
            text: "The wild pikachu has escaped"
          });
        }
        break;
      case ('Cade'):
        responseRef.push({
          text: "Cade, is it? That is a truly impeccable name! Take good care of Cade!"
        });
        break;
      default:
        return;
  }
}

  // sending a text
  function speakVoice(text){
    textRef.push({
      text: text
    });
    textRef.remove();
  }



})(jQuery)
