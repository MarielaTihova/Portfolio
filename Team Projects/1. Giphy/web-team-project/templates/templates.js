export const display = ($container, imgData) => {
  let $imgContainer = $(`<div class="imgContainer"><img id="${imgData.id}" class="imgTrend" src=${imgData.images.fixed_height_downsampled.url}>
  <span id = "heart" class="imgSpan"><i class="fa fa-heart-o" aria-hidden="true" ></i></span>                                
   <div class='authorDiv' ><b><u>Author:</b></u> ${imgData.user.username}</div>
  </div>`);

  $container.append($imgContainer);
}

//Trending fill html func

export const trendingFill = (jsonResult) => {

  jsonResult.data.forEach(gifs => {
    if (!gifs.user) {
      $('#main-container').append(`<div class="imgContainer"><img id="${gifs.id}" class="imgTrend" src=${gifs.images.fixed_height_downsampled.url}>
                                              <span id = "heart" class="imgSpan"><i class="fa fa-heart-o fa-48x" aria-hidden="true" ></i></span>                                
                                              <div class='authorDiv' >Author username: N/A</div></div>`);
    } else {
      $('#main-container').append(`<div class="imgContainer"><img id="${gifs.id}" class="imgTrend" src=${gifs.images.fixed_height_downsampled.url}>
                                              <span id = "heart" class="imgSpan"><i class="fa fa-heart-o" aria-hidden="true" ></i></span>                                
                                              <div class='authorDiv' >${gifs.title}</div></div>
                                              `);
    }
  })
};