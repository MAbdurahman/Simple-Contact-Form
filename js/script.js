/*-----Javascript for Project Name */



/* =========================================
            contact__form--text js-input
============================================ */
$(function () {

});

/* =========================================
            contact__form validation
============================================ */
$(function () {
   //js-input class - toggles not-empty class for input fields
   $('.js-input').keyup(function () {
      if ($(this).val()) {
         $(this).addClass('not-empty');
      } else {
         $(this).removeClass('not-empty');
      }
   });

   const green = '#335536';
   const red = '#9a0220';

   const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/;
   const email_pattern = /^[A-Za-z\.\-_0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
   const required_message_length = 30;

   let isNameValid = false;
   let isEmailValid = false;
   let isMessageValid = false;

   //getPrompt function - produces the message at the element id in the specific color
   function getPrompt(message, prompt_location, color) {
      document.getElementById(prompt_location).innerHTML = message;
      document.getElementById(prompt_location).style.color = color;

   } //end of getPrompt function

   //checkNameInput function - check the name input field
   function checkNameInput() {

      let name = $('#contact__form--name').val();
      let message = "";

      if (name.length == 0) {
         message = "Your first and last name is required!";
         isNameValid = false;
         getPrompt(message, "contact__form--name-prompt", red);

         return false;
      }
      if (!name.match(name_pattern)) {
         message = "Enter first and last name only!";
         isNameValid = false;
         getPrompt(message, "contact__form--name-prompt", red);

         return false;
      }

      message = "Welcome " + name;
      isNameValid = true;
      getPrompt(message, "contact__form--name-prompt", green);

      return true;

   } //end of the checkNameInput Function

   //checkEmailInput Function - checks the email input field
   function checkEmailInput() {

      let email = $('#contact__form--email').val();
      let message = "";

      if (email.length == 0) {

         message = "Your email address is required!";
         isEmailValid = false;
         getPrompt(message, "contact__form--email-prompt", red);

         return false;
      }
      if (!email.match(email_pattern)) {

         message = "Invalid email address!";
         isEmailValid = false;
         getPrompt(message, "contact__form--email-prompt", red);

         return false;
      }

      message = "Valid email address";
      isEmailValid = true;
      getPrompt(message, "contact__form--email-prompt", green);

      return true;

   } //end of the checkEmailInput Function

   //checkMessageInput Function - checks the message input field
   function checkMessageInput() {

      let form_message = $("#contact__form--message").val();
      let characters_left = (required_message_length - form_message.length);
      let message = "";

      if (form_message.length < required_message_length) {

         message = characters_left + " more characters required in message!";
         isMessageValid = false;
         getPrompt(message, "contact__form--message-prompt", red);

         return false;

      } else {

         message = "Valid message";
         isMessageValid = true;
         getPrompt(message, "contact__form--message-prompt", green);

         return true;
      }

   } //end of the checkMessageInput Function

   //performValidForm Function - 
   function performValidForm() {

      $('#contact__form--submit').val('Valid Form');
      $('#contact__form--submit').addClass('valid');

      $('#error__message').hide(500);
      setTimeout(function () {
         $('#contact__form--submit').val('Sending Message...');
      }, 500);

      $('#contact__form--submit').prop('disable', true);

      if ($('#contact__form--submit').hasClass('valid')) {
         setTimeout(function () {
            $('#contact__form--submit').val('Message Sent');
            $('#success__message').show(1000);
         }, 3000);

         
         // $('#contact__form--reusable').each(function() {
         //    this.reset();
         //    let message = "";
         //    isNameValid = false;
         //    isEmailValid = false;
         //    isMessageValid = false;

         //    getPrompt(message, "contact__form--name-prompt", red);
         //    getPrompt(message, "contact__form--email-prompt", red);
         //    getPrompt(message, "contact__form--message-prompt", red);
         //    $('contact__form--name').val().length = 0;
         // });

         // $('contact__form--email').val('');
         // $('contact__form--message').val('');
      }

   } //end of the performValidForm Function

   //performInvalidForm Function -
   function performInvalidForm() {

      $('#contact__form--submit').val('Check Form & Click Again!');
      $('#contact__form--submit').removeClass('valid');
      updateErrors();
      $('#success__message').hide(250);
      $('#error__message').show(1250);
      $('#error__message').effect('shake', {
         times: 5
      }, 1000);

   } //end of the performInvalidForm Function

   //updateErrors Function -
   function updateErrors() {
      $('#error__message').html(`<h4>Error!</h4>
                  <p>The following are error(s) in the form:</p>`);

      if (!isNameValid) {
         if ($('#contact__form--name').val().length == 0) {
            $('#error__message').append(`<p>Your first and last name is required!!</p>`);

         } else {
            $('#error__message').append(`<p>Enter first and last name only!!</p>`);
         }
      }
      if (!isEmailValid) {
         if ($('#contact__form--email').val().length == 0) {
            $('#error__message').append(`<p>Your email address is required!!</p>`);

         } else {
            $('#error__message').append(`<p>Your email address is Invalid!!</p>`);

         }
      }
      if (!isMessageValid) {
         let characters_left = (required_message_length - $('#contact__form--message').val().length);
         let message = characters_left + " more characters required in message";

         $('#error__message').append(`<p>${message}!!</p>`);

      }

   } //end of the updateErrors Function

   //checkFormValidation Function -
   function checkFormValidation() {
      if (isNameValid && isEmailValid && isMessageValid) {
         performValidForm();

      } else {
         performInvalidForm();

      }

   } //end of the checkFormValidation Function

   $('#contact__form--name').keyup(checkNameInput);
   $('#contact__form--email').keyup(checkEmailInput);
   $('#contact__form--message').keyup(checkMessageInput);
   $('#contact__form--submit').click(checkFormValidation);

}); //end of the contact__form validation