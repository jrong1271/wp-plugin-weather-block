const { registerBlockType } = wp.blocks;
const { useEffect, useState } = wp.element;
const { Spinner, Button, TextControl } = wp.components;

registerBlockType('custom/weather-block', {
    title: 'Weather Block',
    icon: 'cloud',
    category: 'widgets',
    attributes: {
        temperature: { type: 'string' },
        description: { type: 'string' },
        humidity: { type: 'string' },
        location: { 
            type: 'string',
            default: 'New York, US', // Default location
         },
    },
    edit: (props) => {
        const { attributes, setAttributes } = props;
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        // Fetch weather data when user clicks the button
        const fetchWeather = () => {
            setLoading(true);
            const apiKey = weatherBlockData.apiKey; // Use the localized API key
            const city = attributes.location; // Get the location from attributes
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Update attributes with weather data
                    setAttributes({
                        temperature: `${data.main.temp} °C`,
                        description: data.weather[0].description,
                        humidity: `${data.main.humidity}%`,
                        location: data.name,
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        };

        // Render the block
        return (
            <div>
                <TextControl
                    label="Location"
                    value={attributes.location}
                    onChange={(location) => setAttributes({ location })} // Update location attribute
                    placeholder="Enter a city name..."
                />
                <Button onClick={fetchWeather} isPrimary>
                    Fetch Weather
                </Button>
                {loading && <Spinner />}
                {error && <p>Error fetching weather: {error}</p>}
                {attributes.temperature && (
                    <div>
                        <h2>Today's Weather in {attributes.location}</h2>
                        <p>Temperature: {attributes.temperature}</p>
                        <p>Weather: {attributes.description}</p>
                        <p>Humidity: {attributes.humidity}</p>
                    </div>
                )}
            </div>
        );
    },

    save: (props) => {
        const attributes = props.attributes;

        return (
            <div>
                <h2>Today's Weather in {attributes.location}</h2>
                <p>Temperature: {attributes.temperature}</p>
                <p>Weather: {attributes.description}</p>
                <p>Humidity: {attributes.humidity}</p>
            </div>
            
        );
    },
});