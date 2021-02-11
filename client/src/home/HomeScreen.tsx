import axios from "axios";
import { useEffect, useState } from "react";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
const apiRestTestUrl = `${apiBaseUrl}/api/weatherforecast`;

interface WeatherForecast {
  date: string;
  summary: string;
  temperatureC: number;
  temperatureF: number;
}

export function HomeScreen() {
  const [data, setData] = useState<WeatherForecast[]>([]);

  useEffect(() => {
    const getDataFromRestApi = async () => {
      const result = await axios.get<WeatherForecast[]>(apiRestTestUrl);
      console.log("REST API Result", result);
      setData(result.data);
    };

    getDataFromRestApi();
  }, []);

  return (
    <>
      <section>
        <h3>Environment</h3>
        <p>NODE_ENV={process.env.NODE_ENV}</p>
        <p>PUBLIC_URL={process.env.PUBLIC_URL}</p>
        <p>REACT_APP_APIBASEURL={apiBaseUrl}</p>
      </section>
      <section>
        <h3>REST communication</h3>
        <p>Rest API Test Url={apiRestTestUrl}</p>
        <ul>
          {data.map((wf, index) => {
            return <li key={index}>{JSON.stringify(wf)}</li>;
          })}
        </ul>
      </section>
      <section>
        <h3>Hub communication</h3>
        <p>TODO</p>
      </section>
    </>
  );
}
