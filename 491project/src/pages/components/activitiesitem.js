import axios from "axios";
import { useEffect } from "react";
import defaultColor from "../assets/image.png";
import KEYS from "../../keys.json";
import { useState } from "react";

export default function ActivitiesItem({ todoItem }) {
  const GOOGLE_API = KEYS[3]["key"];

  const [img, setImg] = useState("");

  const getPhotoReference = async (incomingData) => {
    try {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: incomingData.results[0].geometry.location.lat,
          lng: incomingData.results[0].geometry.location.lng,
        },
        zoom: 15,
      });

      const request = {
        placeId: incomingData.results[0].place_id,
      };

      const service = new google.maps.places.PlacesService(map);

      service.getDetails(request, (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          if (place.photos === undefined) {
            setImg(null);
          } else {
            // Getting Photo
            const photoUrl = place.photos[0].getUrl({ maxHeight: 300 });

            setImg(photoUrl);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Getting Longitude And Latitude
  const retrieveLongLat = async () => {
    try {
      const { data } = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          todoItem.address +
          "&key=" +
          GOOGLE_API
      );
      getPhotoReference(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    retrieveLongLat();
    //eslint-disable-next-line
  }, [todoItem]);

  return (
    <div className="card">
      <div id="map"></div>
      <img
        src={img === null ? defaultColor : img}
        className="card-img-top"
        style={{ width: "100%" }}
        alt="..."
      />
      <div className="card-body" style={{ margin: "0", padding: "0" }}>
        <h5 className="card-title">{todoItem.name}</h5>
      </div>
    </div>
  );
}
