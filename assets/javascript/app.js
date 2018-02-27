$(document).ready(function(){
  let cardNum = 0;
  let classSelection = $('#classContainer').html();
    //click on class button to bring up correct cardback
    $('#classContainer').on('click','.classBtn',function(){
      cardNum ++;
      var cardClass = $(this).attr('value');
      $('#cardDisplay_Main').empty();
      $('#cardDisplay_Main').append('<div class="card currentCard animated bounceInRight">\
        <div id="flipper">\
        <img  id="card_'+cardNum+'_img" class="card-img" src="'+cardClass+'" alt="bard card">\
        </div></div>' ).one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationend',function(){
          $('.currentCard').removeClass('animated bounceInRight');
          $('#card_'+cardNum+'_img').attr('class','card-img front');
          $('#flipper').append('<div class="back bg-primary"></div>');
          $('#classContainer').attr('class', 'animated zoomOutUp').one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationend',function(){
            $('#classContainer').empty();
            $('#classContainer').removeClass('animated zoomOutUp');
            $('#classContainer').append(
              '<form>\
                  <div class="form-group">\
                    <label for="spellNameInput">Mystical Tutor</label>\
                      <input type="text" class="form-control" id="spellNameInput" placeholder="Enter Spell Name Here">\
                  </div>\
                  <button type="submit" class="btn btn-dark">Submit</button>\
                </form>');
          })//form entry .one animation closes
        })//current card .one event closes
      })//onclick even closes

    $('#cardDisplay_Main').on('click','.currentCard',function(){
      $('#flipper').attr('class', 'flipper');
    })



})//document.ready closes

//
// let spellName = "Aid";
// let queryURL = "http://www.dnd5eapi.co/api/spells"
//
// //call for the spell list
// $.ajax({
//   url: queryURL,
//   method:"GET"
// }).then(function(response){
//
//   //iterate through spell list for the correct spell and url
//   for(var i = 0; i<response.results.length; i++){
//     if(response.results[i].name == spellName){
//
//       //call for the specific spell
//       $.ajax({
//         url:response.results[i].url,
//         method:"GET"
//
//       //plug in the relevant spell data
//       }).then(function(data){
//         $("#name").append(data.name);
//         $("#range").append(data.range);
//         $("#duration").append(data.duration);
//         $("#material").append(data.material);
//         $("#ritual").append(data.ritual);
//         $("#level").append(data.level);
//         $("#desc").append(data.desc);
//         $("#higher_level").append(data.higher_level);
//         $("#school").append(data.school.name);
//         $("#concentration").append(data.concentration);
//       })//second then statement closes
//     } //if statement closes
//   }//for loop closes
// })//first then statement closes
