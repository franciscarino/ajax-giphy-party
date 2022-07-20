"use strict";

console.log("Let's get this party started!");

//API Key Global Variable
const GIPHY_KEY = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const BASE_URL = "http://api.giphy.com/v1/gifs/search";

/**Generate random number based on an array passed through. */
function generateRandomNumber(array) {
  return Math.floor(Math.random() * array.length);
}

/**make a request to GIPHY to find gifs based on the search input; returns a URL
 * of an image.
 */
async function getSearchedGif() {
  const gifSearchInput = $("#gif-search").val();
  const searchResult = await axios.get(BASE_URL, {
    params:
      { q: gifSearchInput, api_key: GIPHY_KEY }
  });
  console.log("got", searchResult);
  const randomIndex = generateRandomNumber(searchResult.data.data);
  return searchResult.data.data[randomIndex].images.original.url;
}

/**Add image to display area */
function addImageToDisplay(imgUrl) {
  const newGif = $("<img>").attr("src", imgUrl);
  $(".display").append(newGif);
}


/**Create an event listener for submission of form that takes the search input,
 * invokes the getSearcheGif function that requests GIPHY for a gif url, and a
 * appends the image onto the display area.
 */
$("form").on("submit", async function (e) {
  e.preventDefault();

  const imgUrl = await getSearchedGif();
  addImageToDisplay(imgUrl);
});

/**emptyDisplay removes all child elements in the div with class display*/
function emptyDisplay() {
  $(".display").empty();
}

$(".remove").on("click", emptyDisplay);

