mapboxgl.accessToken=mapToken;
let Data=JSON.parse(listing);

const map=new mapboxgl.Map({
    container:"map",
    style: "mapbox://styles/mapbox/streets-v12",
    center:Data.geometry.coordinates,
    zoom: 9,
});

const marker=new mapboxgl.Marker({color: "red"})
.setLngLat(Data.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset: 25}).setHTML(
        `<h4>${Data.title}</h4><p>Exact location will be provided after booking</p>`
    )
)
.addTo(map);

