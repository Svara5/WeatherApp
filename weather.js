var weatherData = {
    city: "",
    region: "",
    latitude: "",
    longitude: "",
    temperatureF: "",
    temperatureC: "",
    currentUnitF: true,
    appKey: "d59cec1729d511b9f8a27d9ba5da03cc",
    toggleTemp: function() {
        if (weatherData.currentUnitF) {
            document.getElementById("txt2").innerHTML = weatherData.temperatureC + "&degC";
            $("#degreeF").css("color", "blue");
            $("#degreeC").css("color", "");
            weatherData.currentUnitF = false;
        } else {
            document.getElementById("txt2").innerHTML = weatherData.temperatureF + "&degF";
            $("#degreeF").css("color", "");
            $("#degreeC").css("color", "blue");
            weatherData.currentUnitF = true;
        }
    },
    getWeatherData: function() {
        $.get("http://ipinfo.io", function(response) {
            weatherData.city = response.city;
            weatherData.region = response.region;
            weatherData.latitude = response.loc.split(',')[0];
            weatherData.longitude = response.loc.split(',')[1];
            //Getting Weather Data
            $.get("http://api.openweathermap.org/data/2.5/weather?lat=" + weatherData.latitude + "&lon=" + weatherData.longitude + "&appid=" + weatherData.appKey, function(resp) {
                weatherData.temperatureC = Math.round(resp.main.temp - 273.15);
                weatherData.temperatureF = Math.round(((resp.main.temp * 9) / 5) - 459.67);
                document.getElementById("txt1").innerHTML = weatherData.city + ", " + weatherData.region;
                document.getElementById("txt2").innerHTML = weatherData.temperatureF + "&degF";
                $("#degreeC").css("color", "blue");
                document.getElementById("tempToggle").addEventListener("click", function() { weatherData.toggleTemp(); }, false);
                document.getElementById("txt3").innerHTML = resp.weather[0].description;
                document.getElementById("img1").setAttribute("src", "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png");
                switch (resp.weather[0].main) {

                    case "Extreme":
                        $('body').css("background", "url(https://cdn.arstechnica.net/wp-content/uploads/2011/12/tornado-road-4ef0edc-intro.jpg)");
                        break;

                    case "Clear":
                        $('body').css("background", "url(http://www.hotel-r.net/im/hotel/gb/clear-sky-5.jpg)");
                        break;

                    case "Rain":
                    case "Drizzle":
                        $('body').css("background", "url(https://az616578.vo.msecnd.net/files/responsive/cover/main/desktop/2016/07/23/6360489276541063011337890522_rainyday-2.jpeg)");
                        break;

                    case "Snow":
                        $('body').css("background", "url(http://militaryfamily.com/wp-content/uploads/2011/12/Barnstaple-snowy-road.jpg)");
                        break;

                    case "Thunderstorm":
                        $('body').css("background", "url(http://cdn.farmersalmanac.com/wp-content/uploads/2015/06/Thunderstorm-5best-1024x683.jpg)");
                        break;

                    case "Clouds":
                        $('body').css("background", "url(http://www.gazetteseries.co.uk/resources/images/5360796/)");
                        break;

                    case "Mist":
                        $('body').css("background", "url(http://www.khoras.net/Khoras/Planet/Forests/Mist%20Forest/MistForest.jpg)");
                        break;

                    default:
                        $('body').css("background", "url(http://www.solidbackgrounds.com/images/2560x1440/2560x1440-black-solid-color-background.jpg)");


                }

            }, "jsonp");
        }, "jsonp");
    }
};


window.onload = weatherData.getWeatherData;
