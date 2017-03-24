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

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);
          
          /*var div = document.getElementsByClassName('card')[0],
        h2 = div.getElementsByTagName('h5'),
        p = div.getElementsByTagName('p'),
        
        var i = 0;
       $.each( myObj.items, function() {
            data +="<div id='card_container'><div class='card'><h2 id='header'><a href='"+
            +myObj.items[i].link+"''>"+ myObj.items[i].title+"</a>";

              */ /*$.each( value1, function( key, value) {
                   data +="<div class ='"+ key +"'>"+value+"</div>"; 
               });
               i++;
        }); */


        for (var i = 0; i < myObj.items.length / 2; i++) {
          data = "<div id='card'><img src='"+ myObj.items[i].pagemap.cse_thumbnail[0].src +"'/>"
          data1 = "<h2 id='header'><a target='_blank' href=" + myObj.items[i].link+">" + myObj.items[i].title+"</a></h2>";
          data2 = "<p id='snippet'>"+myObj.items[i].htmlSnippet+"</p></div>";
          var div = document.getElementById('card_container');
          
          div.innerHTML = div.innerHTML + data + data1 + data2;
          console.log(data2); 
        }
    }
};
 
/* Here, URL of the JSON file is to be replaced */
xmlhttp.open("GET", "http://crossorigin.me/http://www.vijaydwivedi.com.np/search.json", true);
xmlhttp.send();
