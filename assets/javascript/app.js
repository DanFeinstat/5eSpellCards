$(document).ready(function(){
    //click on class button to bring up correct cardback
    $('#classContainer').on('click','.classBtn',function(){
      var cardClass = $(this).attr('value');
      $('#cardDisplay_Main').empty();
      $('#cardDisplay_Main').append('<div class="card animated bounceInRight">\
                  <img class="card-img" src="'+cardClass+'" alt="bard card">\
                </div>')
    })
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

})//document.ready closes
