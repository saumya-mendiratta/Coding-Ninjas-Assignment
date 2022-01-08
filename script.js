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
            tagslist.append('<li>' + tag + '</li>');
        }

    });

}

showTags();


// var category = "All Events" ; 

// function showcard(page) {
//     let sol = input.val();
    
    
//     let url = "https://api.codingninjas.com/api/v3/events?event_category="+ category + "&event_sub_category=" + subcategory + "&tag_list=" + tag_list "+&offset="+offset+"";

//     $.get(url, function (data) {
//         let photos = data.photos;
//         updateButtons(photos);

//         if (photos.length === 0) {
//             alert("No more images to show...");
//         } else {
//             $("#nasa-images img").remove();
//             for (let photo of photos) {
//                 nasaImages.append('<img src="' + photo.img_src + '" alt="' + photo.id + '">');
//             }
//         }
//     });
// }

// showcard();


// $("form button").click(function (e) {
//     e.preventDefault();
//     page = 1;
//     showPage(page);
// });

// prev.click(function (e) {
//     showPage(--page);
// });


// next.click(function (e) {
//     showPage(++page);
// });
