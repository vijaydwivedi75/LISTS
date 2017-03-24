/*Team nameSpace@HINT2017*/

/*
* This is the javascript file which is used to implement the functionalities of extension
*/


// Pre loader jquery code
jQuery(document).ready(function($) {  

$(window).load(function(){
  $('#preloader').fadeOut('slow',function(){$(this).remove();});
});

});



    var source;
    var xmlhttp;
    function getSource(URL){
   
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            
            source = xmlhttp.responseText;
            var el = document.createElement('html');
            el.innerHTML = source;
            console.log(el.getElementsByTagName('a')[2]);
        }
    }
    xmlhttp.open("GET", URL, true);
    xmlhttp.send();
    return xmlhttp.responseText;
}


var urlCurrent="";
// Get current URL
function getURL(x, callback){
  chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
  }, function(tabs) {
      
      var tab = tabs[0];
      callback(tab.url);
     
  });
}



getURL("address", function(x){
    urlCurrent = x;
    urlCurrent = "http://flask-javascc.herokuapp.com/" + urlCurrent;
    console.log(urlCurrent);

    // Extract Keywords from URL
    var keywords = "";

    function extractKeywords(y, callbacky){
        
        var xmlhttp1 = new XMLHttpRequest();
        xmlhttp1.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                  keywords = xmlhttp1.responseText;          

                  callbacky(keywords);
            }
        };
        console.log(keywords);
        var URLCurrent = urlCurrent;
        xmlhttp1.open("GET", URLCurrent, true);
        xmlhttp1.send();
    }

    extractKeywords("keys", function(yy){
        keywords = yy;


        // Extract json from URL
            jsonURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBOfvd0PrNoxbShPJvCjPMqbkzzK3ijmP4&q=" + 
                      keywords + "&cx=010401654321447249722:6jnhkyjk280";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                      myObj = JSON.parse(this.responseText);
                      
                      var div = document.getElementById('card_container');
                      div.innerHTML = "";
                    for (var i = 0; i < myObj.items.length; i++) {
                      data = "<a target='_blank' href=" + myObj.items[i].link+"><div id='card'><img src='"+ myObj.items[i].pagemap.cse_thumbnail[0].src +"'/>"
                      data1 = "<h2 id='header'>"+ myObj.items[i].title+"</h2>";
                      data2 = "<p id='snippet'>"+myObj.items[i].htmlSnippet+"</p></div></a>";
                      
                      
                      div.innerHTML = div.innerHTML + data + data1 + data2;
                      console.log(data2); 
                    }
                }
            };

            jsonURLCROS = jsonURL;
            xmlhttp.open("GET", jsonURLCROS, true);
            xmlhttp.send();

    });

    

});

