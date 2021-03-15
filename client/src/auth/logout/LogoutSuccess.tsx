import React from "react";

export type LogoutSuccessProps = {
  username: string;
  secondsTillRedirect: number;
};

export function LogoutSuccess(props: LogoutSuccessProps) {
  return (
    <>
      <p>
        Danke <b>{props.username}</b> fürs Nutzen von Marblecollector!
      </p>
      <p>
        Möchtest du mehr über Marblecollector erfahren? Hier gehts zur{" "}
        <a href="https://github.com/TashunkoWitko/MarbleCollector/tree/main/doc">
          Dokumentation
        </a>
        .
      </p>
      <p>Du wirst in {props.secondsTillRedirect} Sekunden umgeleitet...</p>
    </>
  );
}
