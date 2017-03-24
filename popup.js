/*Team nameSpace@HINT2017*/

/*
* This is the javascript file which is used to implement the functionalities of extension
*/


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
/*source = getSource('http://crossorigin.me/http://www.vijaydwivedi.com.np')
document.write(source);*/

var urlCurrent;
// Get current URL
chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function(tabs) {
    // and use that tab to fill in out title and url
    var tab = tabs[0];
    document.getElementById('forURL').innerHTML = tab.url;
   
});
urlCurrent = "http://blog.ecellmnnit.in/the-hype-cycle-predict-tech-hype-make-smart-decisions";
console.log(urlCurrent);
urlCurrent = "http://localhost:5000/" + urlCurrent;


// Extract Keywords from URL
var keywords = ""
var xmlhttp1 = new XMLHttpRequest();
xmlhttp1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          keywords = xmlhttp1.responseText;          
          console.log(keywords);
    }
};
console.log(keywords);
var URLCurrent = /*"http://crossorigin.me/" +*/ urlCurrent;
xmlhttp1.open("GET", URLCurrent, true);
xmlhttp1.send();


// Extract json from URL
jsonURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBOfvd0PrNoxbShPJvCjPMqbkzzK3ijmP4&q=" + 
          keywords + "&cx=010401654321447249722:6jnhkyjk280";
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);
          

        for (var i = 0; i < myObj.items.length / 2; i++) {
          data = "<a target='_blank' href=" + myObj.items[i].link+"><div id='card'><img src='"+ myObj.items[i].pagemap.cse_thumbnail[0].src +"'/>"
          data1 = "<h2 id='header'>"+ myObj.items[i].title+"</h2>";
          data2 = "<p id='snippet'>"+myObj.items[i].htmlSnippet+"</p></div></a>";
          var div = document.getElementById('card_container');
          
          div.innerHTML = div.innerHTML + data + data1 + data2;
          console.log(data2); 
        }
    }
};

jsonURLCROS = "http://crossorigin.me/" + jsonURL;
xmlhttp.open("GET", jsonURLCROS, true);
xmlhttp.send();
