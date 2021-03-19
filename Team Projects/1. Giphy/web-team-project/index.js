/* eslint-disable no-undef */
import { upload, search, myUploads, showSearch, showUploaded, showFavorites, showTrending } from './events/events.js';
import { uploadGifReq, searchGifReq, trendFunc, getById } from './requests/request.js'
import { display } from './templates/templates.js';




(() => {

    upload('click', '#upload-file-btn', async () => {
        const files = $('#inputGroupFile03').prop('files');
        if (files.length == 0) {
            console.error('No gif selected');
            return;
        }
        console.log(files[0]);
        const myFileData = new FormData();
        myFileData.append('file', files[0]);
        const responseBody = await uploadGifReq(myFileData);
        console.log(responseBody);
        if (responseBody.meta.msg === 'OK' && responseBody.meta.status === 200) {
            const imageId = responseBody.data.id;
            const myUploadsIds = localStorage.getItem('ourUploads')
            localStorage.setItem('ourUploads', myUploadsIds === null ? imageId : myUploadsIds + `,${imageId}`);
        }
    });

    myUploads('click', '#my-uploads', () => {
        let $container = $('#upload-container');
        $container.empty();
        const upId = localStorage.getItem('ourUploads');

        if (upId != null) {
            upId.split(',').map(async (id) => {
                const imgData = await getById(id);
                console.log(imgData);
                display($('#upload-container'), imgData.data);
                return imgData;
            });
        }
    });
})();

const addToFav = (gif) => {
    let fav = [];
    $('#favorites').append(gif);
}

(() => {

    trendFunc();

})()

//Should put search in an IIFE func>>>>


// SEARCH
$('#searchDiv').hide();
search('click', '#searchBtn', async () => {
    const $input = $('#text-input');
    const $resultDiv = $('#searchDiv');
    $resultDiv.empty();
    const searchTerm = $input.val();

    $('#link2').show();
    //const pageLimit = 5;
    $('#searchDiv').show();


    if (searchTerm) {
        const result = await searchGifReq(searchTerm);
        result.data.forEach((gif) => {
            if (!gif.title) {
                $('#searchDiv').append(`<div class="imgContainer"><img id="${gif.id}" class="imgTrend" src=${gif.images.fixed_height_downsampled.url}>
                                                        <span id = "heart" class="imgSpan"><i class="fa fa-heart-o fa-48x" aria-hidden="true" ></i></span>                                
                                                        <div class='authorDiv' >N/A</div></div>`);
              } else {
                $('#searchDiv').append(`<div class="imgContainer"><img id="${gif.id}" class="imgTrend" src=${gif.images.fixed_height_downsampled.url}>
                                                        <span id = "heart" class="imgSpan"><i class="fa fa-heart-o" aria-hidden="true" ></i></span>                                
                                                        <div class='authorDiv' >${gif.title}</div></div>
                                                        `);
              
            // $resultDiv.append(`<img src="${gif.images.fixed_height_downsampled.url}">`);
            //$resultDiv.fadeIn(8000).fadeOut(8000);//.slideToggle();//.slideToggle(10000);
        }});
    }
    $input.val('');

});





// search();
// Applying show/hide author and heart to the images

(() => {

    $(document)
        .on('mouseover', '.imgContainer', (function () {
            $(this).find('div.authorDiv').show();
            $(this).find('span#heart').show();
        }))
        .on('mouseout', '.imgContainer', (function () {
            $(this).find('div.authorDiv').hide();
            $(this).find('span#heart').hide();
        }));

})();

(() => {
    $(document)
        .on('click', '.imgSpan', (function () {
            if ($(this).hasClass("liked")) {
                $(this).html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
                $(this).removeClass("liked");
            } else {
                $(this).html('<i class="fa fa-heart" aria-hidden="true"></i>');
                $(this).addClass("liked");
            }
        }));
    showFavorites('click', '.imgSpan', async (like) => {
        console.log(like);
        console.log(like.target);
    });
})();

// Начална страница
const hideAllContainers = () => {
    // $('#main-container').hide();
    $('#searchBtn').hide();
    $('#uploadDiv').hide();
    $('#upload-container').hide();
    $('#uploaded').hide();
    $('#favorites').hide();

    //$('#link1').hide();
    $('#link2').hide();
    $('#link3').hide();
    $('#link4').hide();
    $('#link5').hide();
};

hideAllContainers();

showTrending('click', '#trending-nav', () => {
    $('#main-container').show();
    $('#link1').show();
    // $('#searchBtn').show();
    //$('#link2').show();
});

showSearch('click', '#search-nav', () => {
    $('#main-container').hide();
    $('#link1').hide();
    $('#searchBtn').show();
    //$('#link2').show();
});

const showUploadBtn = () => $(document).on('click', '#upload-nav', () => {
    $('#uploadDiv').show();
    $('#link3').show();
});
showUploadBtn();

showUploaded('click', '#my-uploads', () => {
    $('#upload-container').show();
    $('#link4').show();
});

showFavorites('click', '#favourites-nav', () => {
    $('#favorites').show();
    $('#link5').show();
});


(async () => {
    let fetchQuery = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=osWuwacDvhPrwMMDVakrXogzcrd8qsiD&tag=&rating=G`);
    let result = await fetchQuery.json();
    let url = result.data.images.fixed_height_downsampled.url;
    
    
    $('#favorites').append(`<img src=${url}>`);
    $('#favorites').fadeToggle().fadeIn(5000);
    })()