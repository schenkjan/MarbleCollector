import { Assignment } from "../model/Assignment";
import { ChoreWithAssignments } from "../model/ChoreWithAssignments";
import { Grant } from "../model/Grant";
import { AssignmentForCreate } from "../parent/models/AssignmentForCreate";
import { GrantForCreate } from "../parent/models/GrantForCreate";
import { RewardWithGrants } from "../parent/models/RewardWithGrants";
import { QueryObject } from "./models/QueryObject";
import { QueryProps } from "./models/QueryProps";
import { useGet, usePost, usePut, useDelete } from "./Queries";

// Settings for Chores on Parent-Dashboard
const choreProps: QueryProps = {
  getKey: "parentChoreGet", // Choose a unique keyname
  getUrl: "/api/Chores/Assignments/", // GET-Url from Swagger UI
  getErrorMessage: "Fehler beim Laden der Ämtli.", // GET-Message to Snack
  postSuccessMessage: "Ämtli wurde erstellt.", // POST-Message to Snack
  putSuccessMessage: "Ämtli wurde aktualisiert.", // PUT-Message to Snack
  deleteSuccessMessage: "Ämtli wurde gelöscht.", // DELETE-Mesage to Snack
  mutateUrl: "/api/Chores/", // POST/PUT/DELETE-Url from Swagger UI
};

// GET - load all Chores on Parent-Dashboard
export const useParentChoreGet = () =>
  useGet<ChoreWithAssignments[]>(
    choreProps.getKey,
    choreProps.getUrl,
    choreProps.getErrorMessage
  );

// POST - create one Chore on Parent-Dashboard
export const useParentChorePost = () =>
  usePost<ChoreWithAssignments>(
    choreProps.getKey,
    choreProps.postSuccessMessage
  );

// PUT - change one Chore on Parent-Dashboard
export const useParentChorePut = () =>
  usePut<ChoreWithAssignments>(choreProps.getKey, choreProps.putSuccessMessage);

// DELETE - delete one Chore on Parent-Dashboard
export const useParentChoreDelete = () =>
  useDelete<ChoreWithAssignments>(
    choreProps.getKey,
    choreProps.deleteSuccessMessage
  );

// MUTATE - mutate the POST/PUT/DELETE object on Parent-Dashboard
export const mutateChore = (object: any) =>
  ({
    url: choreProps.mutateUrl,
    object: object,
  } as QueryObject);

// Settings for Rewards on Parent-Dashboard
const rewardProps: QueryProps = {
  getKey: "parentRewardGet", // Choose a unique keyname
  getUrl: "/api/Rewards/Grants/", // GET-Url from Swagger UI
  getErrorMessage: "Fehler beim Laden der Belohnungen.", // GET-Message to Snack
  postSuccessMessage: "Belohnung wurde erstellt.", // POST-Message to Snack
  putSuccessMessage: "Belohnung wurde aktualisiert.", // PUT-Message to Snack
  deleteSuccessMessage: "Belohnung wurde gelöscht.", // DELETE-Mesage to Snack
  mutateUrl: "/api/Rewards/", // POST/PUT/DELETE-Url from Swagger UI
};

// GET - load all Rewards on Parent-Dashboard
export const useParentRewardGet = () =>
  useGet<RewardWithGrants[]>(
    rewardProps.getKey,
    rewardProps.getUrl,
    rewardProps.getErrorMessage
  );

// POST - create one Reward on Parent-Dashboard
export const useParentRewardPost = () =>
  usePost<RewardWithGrants>(rewardProps.getKey, rewardProps.postSuccessMessage);

// PUT - change one Reward on Parent-Dashboard
export const useParentRewardPut = () =>
  usePut<RewardWithGrants>(rewardProps.getKey, rewardProps.putSuccessMessage);

// DELETE - delete one Reward on Parent-Dashboard
export const useParentRewardDelete = () =>
  useDelete<RewardWithGrants>(
    rewardProps.getKey,
    rewardProps.deleteSuccessMessage
  );

// MUTATE - mutate the POST/PUT/DELETE object on Parent-Dashboard
export const mutateReward = (object: any) =>
  ({
    url: rewardProps.mutateUrl,
    object: object,
  } as QueryObject);

// Settings for Assignments on Parent-Dashboard
const assignmentProps: QueryProps = {
  getKey: "parentAssignmentGet", // Choose a unique keyname
  getUrl: "/api/Assignments/", // GET-Url from Swagger UI
  getErrorMessage: "Fehler beim Laden der Zuweisungen.", // GET-Message to Snack
  postSuccessMessage: "Zuweisung wurde erstellt.", // POST-Message to Snack
  putSuccessMessage: "Zuweisung wurde aktualisiert.", // PUT-Message to Snack
  deleteSuccessMessage: "Kind wurde vom Ämtli entfernt.", // DELETE-Mesage to Snack
  mutateUrl: "/api/Assignments/", // POST/PUT/DELETE-Url from Swagger UI
};

// PUT - change one Assignment on Parent-Dashboard
export const useParentAssignmentPut = () =>
  usePut<Assignment>(choreProps.getKey, assignmentProps.putSuccessMessage);

// DELETE - delete one Assignment on Parent-Dashboard
export const useParentAssignmentDelete = () =>
  useDelete<Assignment>(
    choreProps.getKey,
    assignmentProps.deleteSuccessMessage
  );

// MUTATE - mutate the POST/PUT/DELETE object on Parent-Dashboard
export const mutateAssignment = (object: any) =>
  ({
    url: assignmentProps.mutateUrl,
    object: object,
  } as QueryObject);

// Settings for Grants on Parent-Dashboard
const grantProps: QueryProps = {
  getKey: "parentGrantGet", // Choose a unique keyname
  getUrl: "/api/Grants/", // GET-Url from Swagger UI
  getErrorMessage: "Fehler beim Laden der Berechtigungen", // GET-Message to Snack
  postSuccessMessage: "Berechtigung wurde erstellt.", // POST-Message to Snack
  putSuccessMessage: "Berechtigung wurde aktualisiert.", // PUT-Message to Snack
  deleteSuccessMessage: "Kind wurde von der Belohnung entfernt.", // DELETE-Mesage to Snack
  mutateUrl: "/api/Grants/", // POST/PUT/DELETE-Url from Swagger UI
};

// PUT - change one Grant on Parent-Dashboard
export const useParentGrantPut = () =>
  usePut<Grant>(rewardProps.getKey, grantProps.putSuccessMessage);

// DELETE - delete one Grant on Parent-Dashboard
export const useParentGrantDelete = () =>
  useDelete<Grant>(rewardProps.getKey, grantProps.deleteSuccessMessage);

// MUTATE - mutate the POST/PUT/DELETE object on Parent-Dashboard
export const mutateGrant = (object: any) =>
  ({
    url: grantProps.mutateUrl,
    object: object,
  } as QueryObject);

// Settings for adding Assignments on Parent-Dashboard
const assignmentForCreateProps: QueryProps = {
  getKey: "parentAssignmentGet", // Choose a unique keyname
  getUrl: "/api/Assignments/", // GET-Url from Swagger UI
  getErrorMessage: "Fehler beim Laden der Zuweisungen.", // GET-Message to Snack
  postSuccessMessage: "Kind wurde dem Ämtli zugewiesen.", // POST-Message to Snack
  putSuccessMessage: "Zuweisung wurde aktualisiert.", // PUT-Message to Snack
  deleteSuccessMessage: "Zuweisung wurde gelöscht.", // DELETE-Mesage to Snack
  mutateUrl: "/api/Assignments/", // POST/PUT/DELETE-Url from Swagger UI
};

// POST - create one Assignment on Parent-Dashboard
export const useParentAssignmentPost = () =>
  usePost<AssignmentForCreate>(
    choreProps.getKey,
    assignmentForCreateProps.postSuccessMessage
  );

// MUTATE - mutate the POST/PUT/DELETE object on Parent-Dashboard
export const mutateAssignmentToCreate = (object: any) =>
  ({
    url: assignmentForCreateProps.mutateUrl,
    object: object,
  } as QueryObject);

// Settings for adding Grants on Parent-Dashboard
const grantForCreateProps: QueryProps = {
  getKey: "parentGrantGet", // Choose a unique keyname
  getUrl: "/api/Grants/", // GET-Url from Swagger UI
  getErrorMessage: "Fehler beim Laden der Berechtigungen.", // GET-Message to Snack
  postSuccessMessage: "Kind wurde der Belohnung zugewiesen.", // POST-Message to Snack
  putSuccessMessage: "Berechtigung wurde aktualisiert.", // PUT-Message to Snack
  deleteSuccessMessage: "Berechtigung wurde gelöscht.", // DELETE-Mesage to Snack
  mutateUrl: "/api/Grants/", // POST/PUT/DELETE-Url from Swagger UI
};

// POST - create one Grant on Parent-Dashboard
export const useParentGrantPost = () =>
  usePost<GrantForCreate>(
    rewardProps.getKey,
    grantForCreateProps.postSuccessMessage
  );

// MUTATE - mutate the POST/PUT/DELETE object on Parent-Dashboard
export const mutateGrantToCreate = (object: any) =>
  ({
    url: grantForCreateProps.mutateUrl,
    object: object,
  } as QueryObject);

// for Users copy the part above this comment --> ....
