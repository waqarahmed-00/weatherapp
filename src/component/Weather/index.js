//Import CSS
import './index.css';
import { useState, useEffect } from 'react';

//Make constatat for key and URL of weather API
const api = {
    key: "3afab01108f8264cee8ac42f37990279 ",
    base: "https://api.openweathermap.org/data/2.5/",
};

//Start Component Here 
function Weather() {

    //Make State for Store Search City or Country
    const [search, setSearch] = useState("");

    //Make this for store search City or Country's Detail
    const [weather, setWeather] = useState({});

    //Store History of search city or country
    const [searchHistory, setSearchHistory] = useState([]);

    //MAke For Ternary Operation 
    const [history, setHistory] = useState(false)

    useEffect(() => {
        // Load search history from local storage when the component mounts
        const storedSearchHistory = localStorage.getItem('searchHistory');
        if (storedSearchHistory) {
            setSearchHistory(JSON.parse(storedSearchHistory));
        }
    }, []);

    const saveToLocalStorage = (history) => {
        // Save the search history to local storage
        localStorage.setItem('searchHistory', JSON.stringify(history));
    };


    //API Fetching 
    const searchPressed = () => {
        fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                setWeather(result);

                const newSearchHistory = [
                    ...searchHistory,
                    {
                        city: result.name,
                        temperature: result.main.temp,
                        condition: result.weather[0].main,
                        description: result.weather[0].description,
                    },
                ];

                setSearchHistory(newSearchHistory);
                saveToLocalStorage(newSearchHistory);
            });
    };

    //Return 
    return (
        <div className="App">
            {/* Display Search Card */}
            <header className="weather " style={{ boxShadow: '0px 0px 10px 0px rgb(167, 161, 161' }}>
                {history ? (
                    <div>
                        <h1>Weather App</h1>
                        <div className='search mt-3'>
                            <input
                                type="text"
                                placeholder="Enter city/town..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button onClick={searchPressed}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                        <div className='winfo'>
                            <img src='https://cdn-icons-png.flaticon.com/512/7477/7477790.png' />
                        </div>
                        {typeof weather.main !== "undefined" ? (
                            <div className='mt-3 detail'>
                                <p>{weather.name}</p>
                                <p>{weather.main.temp}°C</p>
                                <p>{weather.weather[0].main}</p>
                                <p>({weather.weather[0].description})</p>
                            </div>
                        ) : (
                            ""
                        )}
                        <button className='btn btn-primary mt-3' onClick={() => setHistory(!history)}>Check History</button>

                    </div>
                ) : (
                    <div>
                        {/* Display search history */}
                        <div>
                            <h2>Search History</h2>
                            <ul>
                                {searchHistory.map((item, index) => (
                                    <li key={index}>
                                        <strong>{item.city}:</strong> {item.temperature}°C, {item.condition} ({item.description})
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className='btn btn-primary mt-3' onClick={() => setHistory(!history)}>Serach Weather</button>

                    </div>

                )}
            </header>

        </div>

    );

}

export default Weather;
