$(document).ready(function() {
  //send registration data to the server
  $("#register").on("click", function(event) {
    event.preventDefault();
    //put registration data in an object
    let newUser = {
      user_name: $("#user_name")
        .val()
        .trim(),
      user_password: $("#user_password")
        .val()
        .trim(),
    };

    //send POST request
    $.ajax("/api/register", {
      type: "POST",
      data: newUser,
    }).then(function() {
      console.log(newUser);
      //redirect page
      //should probably add a success prompt for the user
      //   window.location.href = "/login";
    });
  });
});

// $("#submit-button").on("click", function(event) {
//     event.preventDefault();
//     var newBurger = {
//       burger_name: $("#burger_input")
//         .val()
//         .trim(),
//     };

//     // Send the POST request.
//     $.ajax("/api/burgers", {
//       type: "POST",
//       data: newBurger,
//     }).then(function() {
//       // Reload the page to get the updated list
//       location.reload();
//     });
//   });
