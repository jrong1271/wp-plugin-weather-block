import './style.scss';

const { registerBlockType } = wp.blocks;
const { useState, useEffect, Fragment } = wp.element;
const { Spinner, Button, ComboboxControl, Notice } = wp.components;

const WeatherInfo = ({ location, temperature, description, humidity }) => (
    <div className="weather-info panel">
        <h4>Today's Weather in {location}</h4>
        <ul>
            <li><strong>Temperature:</strong> {temperature}</li>
            <li><strong>Condition:</strong> {description}</li>
            <li><strong>Humidity:</strong> {humidity}</li>
        </ul>
    </div>
);

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
            default: 'New York, US',
        },
    },

    edit: ({ attributes, setAttributes }) => {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [filteredOptions, setFilteredOptions] = useState([]);
        const [inputValue, setInputValue] = useState(attributes.location);

        const allCities = [
            { value: 'New York, US', label: 'New York' },
            { value: 'Los Angeles, US', label: 'Los Angeles' },
            { value: 'Chicago, US', label: 'Chicago' },
            { value: 'Houston, US', label: 'Houston' },
            { value: 'Phoenix, US', label: 'Phoenix' },
          ];

        // Update filtered options whenever inputValue changes
        useEffect(() => {
            if (!inputValue) {
                setFilteredOptions(allCities);
                return;
            }
            const filtered = allCities.filter((city) =>
                city.value.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredOptions(filtered);
            fetchWeather();
        }, [inputValue]);


        const fetchWeather = async () => {
            setLoading(true);
            setError(null);

            const apiKey = weatherBlockData?.apiKey || '';
            const city = attributes.location;

            if (!apiKey) {
                setError('API key is missing. Please check plugin settings.');
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
                );

                if (!res.ok) {
                    throw new Error('City not found or invalid API key.');
                }

                const data = await res.json();

                setAttributes({
                    temperature: `${data.main.temp} °C`,
                    description: data.weather[0].description,
                    humidity: `${data.main.humidity}%`,
                    location: data.name,
                });

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        return (
            <Fragment>
                <div className="weather-block panel">
                    <div className="combobox-container"> {/* Relative container */}
                        <div className="combobox-wrapper">
                            <ComboboxControl
                                label="Select a city"
                                value={inputValue} // Bind to inputValue for control
                                options={filteredOptions}
                                onChange={(value) => {
                                    setInputValue(value); // Update input value
                                    setAttributes({ location: value }); // Update block attribute
                                }}
                                onFilterValueChange={(input) => {
                                    setInputValue(input); // Update input value as user types
                                }}
                                placeholder="Start typing a city name..."
                            />
                        </div>
                    </div>
                    <Button
                        className="refresh-button"
                        onClick={fetchWeather}
                        isPrimary
                        disabled={loading}
                        aria-busy={loading}
                    >
                        {loading ? 'Loading…' : 'Refresh'}
                    </Button>

                    {loading && <Spinner />}

                    {error && (
                        <Notice status="error" isDismissible={false}>
                            <p>Error: {error}</p>
                        </Notice>
                    )}

                    {attributes.temperature && (
                        <WeatherInfo
                            location={attributes.location}
                            temperature={attributes.temperature}
                            description={attributes.description}
                            humidity={attributes.humidity}
                        />
                    )}
                </div>
            </Fragment>
        );
    },

    save: ({ attributes }) => {
        return (
            <div className="weather-info panel">
                <h4>Today's Weather in {attributes.location}</h4>
                <ul>
                    <li><strong>Temperature:</strong> {attributes.temperature}</li>
                    <li><strong>Condition:</strong> {attributes.description}</li>
                    <li><strong>Humidity:</strong> {attributes.humidity}</li>
                </ul>
            </div>
        );
    },
});