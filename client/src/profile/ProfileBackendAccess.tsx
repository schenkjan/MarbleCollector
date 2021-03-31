import { QueryProps } from "../api/models/QueryProps";
import { useGet } from "../api/Queries";
import { UserProfile } from "./models/UserProfile";

// Settings for Profiles on Parent-Dashboard
const profileProps: QueryProps = {
  getKey: "profileGet", // Choose a unique keyname
  getUrl: "/api/Users/", // GET-Url from Swagger UI
  getErrorMessage: "Fehler beim Laden des Profils.", // GET-Message to Snack
  postSuccessMessage: "Profil wurde erstellt.", // POST-Message to Snack
  postErrorMessage: "Profil konnte nicht erstellt werden.", // POST-Message to Snack
  putSuccessMessage: "Profil wurde aktualisiert.", // PUT-Message to Snack
  putErrorMessage: "Profil konnte nicht aktualisiert werden.", // PUT-Message to Snack
  deleteSuccessMessage: "Profil wurde gelöscht.", // DELETE-Message to Snack
  deleteErrorMessage: "Profil konnte nicht gelöscht werden.", // DELETE-Message to Snack
  mutateUrl: "/api/Users/", // POST/PUT/DELETE-Url from Swagger UI
};

// GET - load all Profiles on Parent-Dashboard
export const useProfileGet = (additiveUrl?: number | string) =>
  useGet<UserProfile>(
    profileProps.getKey,
    profileProps.getUrl,
    profileProps.getErrorMessage,
    additiveUrl // absolute userId or familyName witch includes at the end of url for get single data
  );
