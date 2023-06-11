
var lat=35.699739;
var lng=51.338097;

console.log(document.getElementById("lat").value);

if(document.getElementById("lat").value)
    lat=document.getElementById("lat").value;

if(document.getElementById("lng").value)
    lng=document.getElementById("lng").value;

// neshan map
var myMap = new L.Map('map', {
    key: 'web.359f1fc59e134fa196ab318cba9b05d9',
    maptype: 'dreamy',
    poi: true,
    traffic: false,
    center: [lat, lng],
    zoom: 14
});

//add marker
var stuSplit = L.latLng(lat, lng);
var myMarker = new L.Marker(stuSplit,
    {
        title: 'unselected' ,
        draggable : true,
        clickable: true,
    })
    .addTo(myMap).on('dragend', (e)=>{
        document.getElementById("lat").value = e.target.getLatLng().lat;
        document.getElementById("lng").value = e.target.getLatLng().lng;
    });

function geocoding() {
    var log = document.getElementById("log");
    //getting adrress value from input tag
    var address = document.getElementById("address").value;
    //making url
    var url = `https://api.neshan.org/v4/geocoding?address=${address}`;
    console.log(url);
    //add your api key
    var params = {
        headers: {
            'Api-Key': 'service.979ab271f40e4d91b8e3e6505408be41'
        },

    };
    //sending get request
    axios.get(url, params)
        .then(data => {
            //using the data
            var lat = data.data.location.y;
            var lng = data.data.location.x;
            //logging the location
            document.getElementById("lat").value = lat;
            document.getElementById("lng").value = lng;
            //update marker location to address
            myMarker.setLatLng([lat, lng]);
            myMarker.bindPopup(address).openPopup();
            //set map center to address
            myMap.flyTo([lat, lng], 15);

        }).catch(err => {
        console.log("error = " + err);
        log.textContent = "Nothing found";

    });
}
