$(document).ready(function() {
  let cardNum = 0;
  let classSelection = $("#classContainer").html();
  let spellDisplayed = false;
  let spellFound = false;
  let currentClass = "";

  //click on class button to bring up correct cardback
  $("#classContainer").on("click", ".classBtn", function() {
    cardNum++;
    var cardClass = $(this).attr("value");
    currentClass = $(this)
      .text()
      .toLowerCase();
    $("#cardDisplay_Main").empty();
    $("#cardDisplay_Main")
      .append(
        '<div class="card currentCard animated bounceInRight">\
        <div id="flipper">\
        <img  id="card_' +
          cardNum +
          '_img" class="card-img" src="' +
          cardClass +
          '" alt="bard card">\
        </div></div>'
      )
      .one(
        //clear the animate classes
        //add necessary content page for card flip
        "webkitAnimationEnd mozAnimationEnd oAnimationEnd animationend",
        function() {
          $(".currentCard").removeClass("animated bounceInRight");
          $("#card_" + cardNum + "_img").attr("class", "card-img front");
          $("#flipper").append(
            '<div class="back mx-auto">\
              <div class="nameDisplay text-center"><h6 class="name"></h6></div>\
              <div class="materialsDisplay">\
                <p class="materials mx-2"><p>\
              </div>\
              <div class="cardDisplaySpace text-center float-left"><h6 class="mt-1">RANGE</h6>\
                <p class="range"></p>\
              </div>\
              <div class="cardDisplaySpace text-center float-left"><h6 class="mt-1">DURATION</h6>\
                <p class="duration"></p>\
              </div>\
              <div class="cardDisplaySpace text-center float-left"><h6 class="mt-1">CASTING TIME</h6>\
                <p class="castingTime"></p>\
              </div>\
              <div class="cardDisplaySpace text-center float-left"><h6 class="mt-1">COMPONENTS</h6>\
                <p class="components"></p>\
              </div>\
              <div class="cardDescDisplay mb-2"><h6 class="mt-1 mb-1 text-center">SPELL DESCRIPTION</h6>\
                <p class="desc mx-2"></p>\
                <p class="higher_level mx-2"></p>\
              </div>\
          \
              <div class="row">\
                <div class="col-1">\
                </div>\
                <div class="schoolDipslay col-5 text-center"><h6 class="school"></h6>\
                </div>\
                <div class="ritualDisplay col-5">\
                  <h6 class="isRitual text-center">R: <span class="ritual"></span></h6>\
                </div>\
              </div>\
            </div>'
          );

          //add event on end of cardback entry animation
          //Class buttons animated leaving and are then replaced with spell selection option
          $("#classContainer")
            .attr("class", "animated zoomOutUp")
            .one(
              "webkitAnimationEnd mozAnimationEnd oAnimationEnd animationend",
              function() {
                $("#classContainer").empty();
                $("#classContainer").removeClass("animated zoomOutUp");
                $("#classContainer").append(
                  '<form>\
                  <div class="form-group">\
                    <label for="spellNameInput">Mystical Tutor</label>\
                      <input type="text" class="form-control" id="spellNameInput" placeholder="Enter Spell Name Here">\
                  </div>\
                  <button class="btn btn-dark submitSpell">Submit</button>\
                </form>'
                );
              }
            ); //form entry .one animation closes
        }
      ); //current card .one event closes
  }); //onclick even closes

  //On click was switched to auto flip on spell population
  //on click of current card it transforms to the content ('.back') div
  // $('#cardDisplay_Main').on('click','.currentCard',function(){
  //   $('#flipper').attr('class', 'flipper');
  // })

  //accept input from mystical tutor form
  //use it to search for the spell from the api
  //populate data on the card
  $("#classContainer").on("click", ".submitSpell", function(event) {
    event.preventDefault();

    if (spellDisplayed === false) {
      spellDisplayed = true;
      let spellName = $("#spellNameInput")
        .val()
        .trim();
      let queryURL = "http://www.dnd5eapi.co/api/spells/" + currentClass;

      String.prototype.toTitleCase = function() {
        var i, j, str, lowers, uppers;
        str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });

        // Certain minor words should be left lowercase unless
        // they are the first or last words in the string
        lowers = [
          "A",
          "An",
          "The",
          "And",
          "But",
          "Or",
          "For",
          "Nor",
          "As",
          "At",
          "By",
          "For",
          "From",
          "In",
          "Into",
          "Near",
          "Of",
          "On",
          "Onto",
          "To",
          "With",
        ];
        for (i = 0, j = lowers.length; i < j; i++)
          str = str.replace(
            new RegExp("\\s" + lowers[i] + "\\s", "g"),
            function(txt) {
              return txt.toLowerCase();
            }
          );

        return str;
      };
      spellName = spellName.toTitleCase();
      console.log(spellName);
      console.log(queryURL);
      //call for the spell list
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function(response) {
        //iterate through spell list for the correct spell and url
        for (var i = 0; i < response.results.length; i++) {
          if (response.results[i].name == spellName) {
            spellFound = true;
            //call for the specific spell
            $.ajax({
              url: response.results[i].url,
              method: "GET",
            }).then(function(data) {
              $(".name").append(data.name);
              $(".range").append(data.range);
              $(".duration").append(data.duration);
              $(".materials").append(data.material);
              $(".ritual").append(data.ritual);
              $(".components").append(data.components);
              $(".desc").append(data.desc);
              $(".higher_level").append(data.higher_level);
              $(".school").append(data.school.name);
              $(".castingTime").append(data.casting_time);
            }); //then statement in second ajax call closes
          } //if statement in first ajax call closes
        } //for loop closes
        console.log(spellFound);
        if (spellFound) {
          $("#flipper").attr("class", "flipper");
          $("#cardContainer").append(
            '<div id="saveBtnContainer" class="fixed-bottom">\
            <div class="col-md-1 ml-auto animated slideInRight">\
              <button id="saveSpell" class="btn float-right btn-success">Inscribe</button>\
              <button id="cancelSpell" class="btn float-right btn-danger">Cancel</button>\
            </div>\
          </div>'
          );
        } else {
          spellDisplayed = false;
          $("#spell_error_modal").modal("show");
        }
      }); //first then statement closes
    } //if statement boolean check closes
  }); //on click submit event closes

  //spell cancel button click
  $("#cardContainer").on("click", "#cancelSpell", function() {
    $("#cardDisplay_Main")
      .attr("class", "animated hinge")
      .one(
        "webkitAnimationEnd mozAnimationEnd oAnimationEnd animationend",
        function() {
          $("#cardDisplay_Main").empty();
          $("#classContainer").html(classSelection);
          $("#saveBtnContainer").remove();
          spellDisplayed = false;
        }
      );
  });
}); //document.ready closes
