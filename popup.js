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
var URLC=""
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
    URLC = x;
    urlCurrent = "http://flask-javascc.herokuapp.com/" + urlCurrent;
    
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
        
        var URLCurrent = urlCurrent;
        xmlhttp1.open("GET", URLCurrent, true);
        xmlhttp1.send();
    }

    extractKeywords("keys", function(yy){
        keywords = yy;
        /*console.log(keywords);*/

        // Extract json from URL
            jsonURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCIYiNTqClcxZK8rdU-AODBJ9KXAvAOnRk&q=" + 
                      keywords + "&cx=010401654321447249722:6jnhkyjk280";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                      myObj = JSON.parse(this.responseText);
                      
                      var div = document.getElementById('card_container');
                      div.innerHTML = "";

                      if(typeof myObj.items == 'undefined'){
                        div.innerHTML = "<center><h1>No results found.</h1><center>";
                      }

                      for (var i = 0; i < myObj.items.length; i++) {
                        if(myObj.items[i].link == URLC)
                          continue;
                        data = "<a target='_blank' title='"+ myObj.items[i].displayLink +"' href=" + myObj.items[i].link+"><div id='card'>";

                        if( (typeof myObj.items[i].pagemap != 'undefined')){
                        	if(typeof myObj.items[i].pagemap.cse_image != 'undefined')
                          		data+="<img src='"+ myObj.items[i].pagemap.cse_image[0].src +"'/>";
                          	else
                          		data+="<img src='icon.png'/>";
                        }


                        data1 = "<h2 id='header'>"+ myObj.items[i].title+"</h2>";
                        data2 = "<p id='snippet'>"+myObj.items[i].htmlSnippet+"</p></div></a>";

                        div.innerHTML = div.innerHTML + data + data1 + data2;
                        
                    }
                }
            };

            jsonURLCROS = jsonURL;
            xmlhttp.open("GET", jsonURLCROS, true);
            xmlhttp.send();

    });

    

});

