
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
// Click functionality on category
var category_buttons = document.getElementsByClassName("category-button");

for (var i = 0; i < category_buttons.length; i++) {

    category_buttons[i].addEventListener('click', function () {

        $("#no-event").remove();

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
        $("#no-event").remove();
        offset=1;
        pg_number=1;
        istagclicked = false ;
        tag_list="";
        $("#page-number").text(pg_number);
        showcard();
    });
}

//Keeping 2 variables to toggle the click effect on prev and next click
var prev_subcategory_clicked ;
var curr_subcategory_clicked = "Archived"; 

// Click functionality on subcategory
var subcategory_buttons = document.getElementsByClassName("subcategory-button");

for (var i = 0; i < subcategory_buttons.length; i++) {

    subcategory_buttons[i].addEventListener('click', function () {

        $("#no-event").remove();
        
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
        $("#no-event").remove();
        offset=1;
        pg_number=1;
        istagclicked = false ;
        tag_list="";
        $("#page-number").text(pg_number);
        showcard();
    });
}

// Click functionality on tags
var tag_buttons = document.getElementsByClassName("tag");

var istagclicked = false ; 
for (var i = 0; i < tag_buttons.length; i++) {

    tag_buttons[i].addEventListener('click', function () {

        tag_button = this.getAttribute('data-value');

        tag_list = "," + tag_button ; 

        // console.log(tag_list);

        if(!istagclicked)
           $(".card").remove();

        istagclicked = true; 

        showcard();

    });
}



//Function to show all the cards 
function showcard(page) {
    
    let url = "https://api.codingninjas.com/api/v3/events?event_category="+ category + "&event_sub_category=" + subcategory + "&tag_list=" + tag_list  + "&offset="+offset+"";

    $.get(url, function (data) {

        let events = data.data.events;

        if ( data.data.page_count === 0) {
            $("#cards").append('<h1 id="no-event" style="font-size:100px"> No events found </h1>');
        } else {
            for (let ev of events) {

                cards.append(
                '<div class="card" id="' + ev.id + '"> <img src="' + ev.cover_picture + '" alt="' + ev.mobile_cover_picture  + '"> <p class="card-name">' + ev.name + '</p> <div class="card-details"> <div class="card-date"><p>Starts on ' + timeConverter(ev.event_start_time)  +'</p> </div> <div class="card-fee-venue"> <div> <span class="fee-venue">Entry Fee : </span> <span class="fee-venue-ans">' +  ev.fees +'</span> </div> <div>  <span class="fee-venue" >Venue : </span> <span class="fee-venue-ans">'+  ev.venue + '</span>  </div> </div> </div> <p class="card-desc">'+ ev.short_desc + '</p> <div class="card-footer"> <span> <img src="'+ `./images/user.png`+  '"></img> </span>' +  ev.seats_filled + ' participated </div> </div>');

                //Created String to get id of the card and adding tags
                if(ev.card_tags.length >= 1 ){
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


//Unix time to Day , Month and year format
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

//Paginator 
var pg_number = 1 ; 
var prev_button = $("#prev-page a");
prev_button.click(function () {
        if(offset>1){
            offset -- ; 
            pg_number -- ; 
            $("#page-number").text(pg_number);
            $(".card").remove();
            $("#no-event").remove();
            // istagclicked = false ;
            // tag_list="";
            showcard();
        }
    });

var next_button = $("#next-page a");
next_button.click(function () {
            offset ++ ; 
            pg_number ++ ; 
            $("#page-number").text(pg_number);
            $(".card").remove();
            $("#no-event").remove();
            // istagclicked = false ;
            // tag_list="";
            showcard();
    });

