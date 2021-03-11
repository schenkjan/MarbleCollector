import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
const hubTestUrl = `${apiBaseUrl}/hubs/parent`;

interface Message {
  author: string;
  message: string;
}

export function HomeScreen() {
  const userIsAuthenticated = useRecoilValue(AppState.userIsAuthenticated);
  const [hubConnection, setHubConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log("HomeScreen - Mounting component...");

    const createHubConnection = async () => {
      if (hubConnection == null) {
        console.log("SignalR >>> Connecting", hubTestUrl);
        const hubConnect = new HubConnectionBuilder()
          .withUrl(hubTestUrl)
          .withAutomaticReconnect()
          .build();
        try {
          await hubConnect.start();
          console.log("SignalR >>> Connection successful");
        } catch (err) {
          alert(err);
        }

        hubConnect.on("ReceiveMessage", (...args: any[]) => {
          const message: Message = {
            author: args[0],
            message: args[1],
          };
          console.log("SignalR >>> Receiving message", message);
          setMessages((messages) => [...messages, message]);
        });

        setHubConnection(hubConnect);
      } else {
        console.log("SignalR >>> Connection exists...", hubConnection);
      }
    };

    createHubConnection();
  }, []);

  useEffect(
    () => () => {
      console.log("HomeScreen - Unmounting component...");
      hubConnection?.stop();
    },
    []
  );

  function sendButtonClick() {
    hubConnection?.send("SendMessage", "client", "Yes i can answer back!");
  }

  return (
    <>
      {userIsAuthenticated && <Redirect to="/app" />}
      <section>
        <h1>Welcome to MarbleCollector</h1>
        <Link to="/auth">Auth</Link>
        <h3>Environment</h3>
        <p>NODE_ENV={process.env.NODE_ENV}</p>
        <p>PUBLIC_URL={process.env.PUBLIC_URL}</p>
        <p>REACT_APP_APIBASEURL={apiBaseUrl}</p>
      </section>
      <section>
        <h3>Hub communication</h3>
        <p>Signal R Hub Test Url={hubTestUrl}</p>
        <ul>
          {messages.map((msg, index) => {
            return <li key={index}>{JSON.stringify(msg)}</li>;
          })}
        </ul>
        <button onClick={sendButtonClick}>Answer back to server</button>
      </section>
    </>
  );
}
