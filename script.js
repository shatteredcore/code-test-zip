$("#zipsearch").onsubmit = getDetails;

function getDetails(e){
    e.preventDefault();
    
    let zip = $("#zipsearch [name='zip']").value;
    
    var client = new XMLHttpRequest();
    client.open("GET", "http://api.zippopotam.us/us/"+zip, true);
    client.onreadystatechange = () => {
        if(client.readyState == 4){
            let zipobj = JSON.parse(client.responseText);
            if(zipobj["country"] == null){
                $("#countryInfo").textContent = "No results found";
                return;
            }
            
            $("#countryInfo").textContent = zipobj["country"];
            let headerHTML = '<tr class="table-header">\
                                <th></th>\
                                <th>State</th>\
                                <th>Place Name</th>\
                                <th>Latitude</th>\
                                <th>Longitude</th>\
                            </tr>';
            let placeHTML = '';
            for(let p in zipobj.places){
                placeHTML +=    '<tr class="place">\
                                    <td class="place-state-image"><img src="./states/'+zipobj.places[p]["state abbreviation"]+'.svg"/></td>\
                                    <td class="place-state-name">'+zipobj.places[p]["state"]+'</td>\
                                    <td class="place-name">'+zipobj.places[p]["place name"]+'</td>\
                                    <td class="place-latitude">'+zipobj.places[p]["latitude"]+'</td>\
                                    <td class="place-longitude">'+zipobj.places[p]["longitude"]+'</td>\
                                </tr>';
                
            }
            $("#placeInfo .place-header").innerHTML = headerHTML;
            $("#placeInfo .place-body").innerHTML = placeHTML;
        }
    }
    client.send();
}

function $(selector){
    return document.querySelector(selector);
}