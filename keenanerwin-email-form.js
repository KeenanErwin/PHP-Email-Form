$(document).ready(function(){ 


// EMAIL VALIDATOR
  $(function() {

    // Get the form
    var form = $('#ajax-contact');


    // Get the messages div
    var formMessages = $('#form-messages');


    // Set up an event listener for the contact form
    $(form).submit(function(e) {
      

      // Stop the browser from submitting the form
      e.preventDefault();


      // Serialize the form data
      var formData = $(form).serialize();


      // Submit the form using AJAX
      $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
      })


      .done(function(response) {
        // toggle email form and lightbox
        $("#email-form , #form-messages").fadeToggle(500, function(){
          

          // Make sure that the formMessages div has the 'success' class
          $(formMessages).removeClass('error');
          $(formMessages).addClass('success');


          // Set the message text
          $(formMessages).text(response);


          // Clear the form
          $('#name').val('');
          $('#email').val('');
          $('#message').val('');
        });      
      })


      .fail(function(data) {
        // Make sure that the formMessages div has the 'error' class
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');


        // Set the message text
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text('Oops! An error occured and your message could not be sent.');
        }
      });
    });
  });


  // Custom error messages
  var name = document.querySelector('input[name="name"]');
  var email = document.querySelector('input[name="email"]');
  var message = document.querySelector('textarea[name="message"]');


  name.oninvalid = function(e) {
  e.target.setCustomValidity("");
  if (!e.target.validity.valid) {
  if (e.target.value.length === 0) {
  e.target.setCustomValidity("That's a funny name");
  } } };


  email.oninvalid = function(e) {
  e.target.setCustomValidity("");
  if (!e.target.validity.valid) {
  if (e.target.value.length === 0) {
  e.target.setCustomValidity("I need your email address");
  } } };


  message.oninvalid = function(e) {
  e.target.setCustomValidity("");
  if (!e.target.validity.valid) {
  if (e.target.value.length === 0) {
  e.target.setCustomValidity("You forgot to say something");
  } } };


});