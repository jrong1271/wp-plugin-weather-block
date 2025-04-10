import './style.scss';

const { registerBlockType } = wp.blocks;
const { useState, Fragment } = wp.element;
const { Spinner, Button, TextControl, PanelBody, Notice } = wp.components;

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

        const fetchWeather = async () => {
            setLoading(true);
            setError(null);

            const apiKey = weatherBlockData?.apiKey || '';
            const city = attributes.location.trim();

            if (!apiKey) {
                setError('API key is missing. Please check plugin settings.');
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
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
                    <div className="flex-container">
                        <TextControl
                            label="Location"
                            value={attributes.location}
                            onChange={(location) => setAttributes({ location })}
                            placeholder="Enter a city name..."
                        />
                        <Button
                            onClick={fetchWeather}
                            isPrimary
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? 'Loading…' : 'Fetch Weather'}
                        </Button>
                    </div>

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