// var input = $("form input");
// var prev = $("#prev");
// var next = $("#next");
// var page = 1;

// (function () {
//     prev.attr("disabled", "true");
//     next.attr("disabled", "true");
// })();

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

function showTags(){

    let url = "https://api.codingninjas.com/api/v3/event_tags";

    $.get(url, function (data) {

        let tags = data.data.tags;

        for (let tag of tags) {
            tagslist.append('<li class ="tag" data-value="' + tag + '">' + tag + '</li>');
        }

    });

}

showTags();

let cards = $("#cards");
var category = "ALL_EVENTS" ;
var subcategory = "Archived" ;
var tag_list="";
var offset=1;


var category_buttons = document.getElementsByClassName("category-button");

for (var i = 0; i < category_buttons.length; i++) {

    category_buttons[i].addEventListener('click', function () {
        
        category = this.getAttribute('data-value');
        subcategory = "Archived" ;
        // console.log(category);
        $(".card").remove();
        showcard();
    });
}

var subcategory_buttons = document.getElementsByClassName("subcategory-button");

for (var i = 0; i < subcategory_buttons.length; i++) {

    subcategory_buttons[i].addEventListener('click', function () {
        
        subcategory = this.getAttribute('data-value');
        // console.log(subcategory);
        $(".card").remove();
        showcard();
    });
}


function showcard(page) {
    
    let url = "https://api.codingninjas.com/api/v3/events?event_category="+ category + "&event_sub_category=" + subcategory + "&tag_list=" + tag_list  + "&offset="+offset+"";

    $.get(url, function (data) {

        let events = data.data.events;

        if ( data.data.page_count === 0) {
            alert("No Events to show");
        } else {
            for (let ev of events) {
                cards.append(
                '<div class="card"> <img src="' + ev.cover_picture + '" alt="' + ev.mobile_cover_picture  + '"> <p class="card-name">' + ev.name + '</p> <div class="card-details"> <div class="card-date"><p>Starts on 8 Jan , 2022 </p> </div> <div class="card-fee-venue"> <div> <span class="fee-venue">Entry Fee : </span> <span class="fee-venue-ans">' +  ev.fees +'</span> </div> <div>  <span class="fee-venue" >Venue : </span> <span class="fee-venue-ans">'+  ev.venue + '</span>  </div> </div> </div> <p class="card-desc">'+ ev.short_desc + '</p><div class="card-tag"> tags associated </div> <div class="card-footer"> <span> <img src="'+ `./images/user.png`+  '"></img> </span>' +  ev.seats_filled + ' participated </div> </div>');
            }


        }
    });
}

showcard();




// prev.click(function (e) {
//     showPage(--page);
// });


// next.click(function (e) {
//     showPage(++page);
// });
