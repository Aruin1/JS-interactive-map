

//function taking user lat lon
async function getLocation(){
    const userPos = await new Promise((resolve,reject)=> {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    return [userPos.coords.latitude, userPos.coords.longitude]
}

//function thar grabs data from the user input
function getSearch(){
    e.preventDefault()
    const userSearch = document.getElementById("search")

    return userSearch.value
}



//function that passes input data to foursquare api

async function getResult() {
    //e.preventDefault()

    const userLocation = await getLocation()
    const userSearch = getSearch()

    const searchParams = new URLSearchParams({
        query: `${userSearch}`,
        ll: `${userLocation[0]},${userLocation[1]}`,
        open_now: 'true',
        sort: 'distance',
    })

    const results = await fetch(
        `https://api.foursquare.com/v3/places/search?${searchParams}`,
        {
            method: 'get',
            headers: {
                Accept: 'application/json',
                Authorization: 'fsq35am4k+kDqmK3whn5spBa5pex2VSrH/ntTkzVrU86irw='
            }
        }
    )
    const data = await results.json()
    console.log(data)
}

//function to extract lat lon data from api response

//function to add markers to map using return data

//code to create map on web page

async function main() {
    const coords = await getLocation()

    var map = L.map('map', {
        center: coords,  
        zoom: 12
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
    }).addTo(map)

    var userMarker = L.marker(coords)
    userMarker.addTo(map).bindPopup('<p1><b>Your location.</b></p1>').openPopup()

    document.getElementById("submit").addEventListener("click", () => getResult())
}

main()


// fsq35am4k+kDqmK3whn5spBa5pex2VSrH/ntTkzVrU86irw= api key