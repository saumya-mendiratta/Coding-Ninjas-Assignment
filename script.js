// var input = $("form input");
// var prev = $("#prev");
// var next = $("#next");
// var page = 1;


// function updateButtons(photos) {
//     console.log(photos.length);
//     if (page === 1) {
//         prev.attr("disabled", "true");
//         next.removeAttr("disabled");
//     } else if (photos.length === 0) {
//         next.attr("disabled", "true");
//         prev.removeAttr("disabled");
//         --page;
//     } else {
//         prev.removeAttr("disabled");
//         next.removeAttr("disabled");        
//     }
// }


var tagslist = $(".tag-list");
var tag ; 

//Function to show all the tags on the right
function showTags(){

    let url = "https://api.codingninjas.com/api/v3/event_tags";

    $.get(url, function (data) {

        //data is another parameter
        let tags = data.data.tags;

        for (let tag of tags) {
            tagslist.append('<li class ="tag" data-value="' + tag + '">' + tag + '</li>');
        }

    });

}

//Calling the showcard for display of first time
showTags();


//Default variables for the API to load data
let cards = $("#cards");
var category = "ALL_EVENTS" ;
var subcategory = "Archived" ;
var tag_list="";
var offset=1;


//Keeping 2 variables to toggle the click effect on prev and next click
var prev_category_clicked ;
var curr_category_clicked = "ALL_EVENTS"; 

//Creating button arrays onclick rather than adding condition to specific id
var category_buttons = document.getElementsByClassName("category-button");

for (var i = 0; i < category_buttons.length; i++) {

    category_buttons[i].addEventListener('click', function () {
        
        category = this.getAttribute('data-value');

        //Toggle switch functionality implemented
        $("#"+prev_category_clicked).css({
            background: "none" , 
            color: "white"
        });

        curr_category_clicked = category;

        $("#"+curr_category_clicked).css({
            background: "lightgray" , 
            color: "black"
        });

        prev_category_clicked = curr_category_clicked  ; 

        //Bydefault set to archive
        subcategory = "Archived" ;
        
        $(".card").remove();
        showcard();
    });
}


var prev_subcategory_clicked ;
var curr_subcategory_clicked = "Archived"; 
var subcategory_buttons = document.getElementsByClassName("subcategory-button");

for (var i = 0; i < subcategory_buttons.length; i++) {

    subcategory_buttons[i].addEventListener('click', function () {
        
        subcategory = this.getAttribute('data-value');

         //Toggle switch functionality implemented
        $("#"+prev_subcategory_clicked).css({
            background: "none" , 
            color: "white"
        });

        curr_subcategory_clicked = subcategory;

        $("#"+curr_subcategory_clicked).css({
            background: "lightgray" , 
            color: "black"
        });

        prev_subcategory_clicked = curr_subcategory_clicked  ; 

        $(".card").remove();
        showcard();
    });
}

//Function to show all the cards 
function showcard(page) {
    
    let url = "https://api.codingninjas.com/api/v3/events?event_category="+ category + "&event_sub_category=" + subcategory + "&tag_list=" + tag_list  + "&offset="+offset+"";

    $.get(url, function (data) {

        let events = data.data.events;

        if ( data.data.page_count === 0) {
            alert("No Events to show");
        } else {
            for (let ev of events) {

                cards.append(
                '<div class="card" id="' + ev.id + '"> <img src="' + ev.cover_picture + '" alt="' + ev.mobile_cover_picture  + '"> <p class="card-name">' + ev.name + '</p> <div class="card-details"> <div class="card-date"><p>Starts on 8 Jan , 2022 </p> </div> <div class="card-fee-venue"> <div> <span class="fee-venue">Entry Fee : </span> <span class="fee-venue-ans">' +  ev.fees +'</span> </div> <div>  <span class="fee-venue" >Venue : </span> <span class="fee-venue-ans">'+  ev.venue + '</span>  </div> </div> </div> <p class="card-desc">'+ ev.short_desc + '</p> <div class="card-footer"> <span> <img src="'+ `./images/user.png`+  '"></img> </span>' +  ev.seats_filled + ' participated </div> </div>');

                //Created String to get id of the card and adding tags
                if(ev.card_tags.length >= 1){
                    for(let card_tag of ev.card_tags){
                        $("#"+ ev.id ).append('<div class="card-tag"><span>'+ card_tag +'</span></div>');
                    }
                }
            }

        }
    });
}

//Calling the showcard for display of first time
showcard();




// prev.click(function (e) {
//     showPage(--page);
// });


// next.click(function (e) {
//     showPage(++page);
// });
