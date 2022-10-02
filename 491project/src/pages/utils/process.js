var currLocation = true;
var newLat;
var newLon;

export const setLocation = (flag) => {
    if (flag) {
        currLocation = true;
    } else if (!flag) {
        currLocation = false;
    }
}

export const getCurrLocationFlag = () => { return currLocation; }

export const setCoords = (lat, lon) => {
    newLat = lat;
    newLon = lon;
}

export const getLocation = async () => {
    if (currLocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                let tempLat = position.coords.latitude;
                let tempLon = position.coords.longitude;
    
                let data = {'lat': tempLat, 'lon': tempLon};
                resolve(data);
            }, () => {
                reject('ERROR');
                alert('Snippet Needs Your Location');
            }); 
        });
    } else {
        return new Promise((resolve, reject) => {
            let data = {'lat':  newLat, 'lon': newLon};
            resolve(data);
        });
    }
};
