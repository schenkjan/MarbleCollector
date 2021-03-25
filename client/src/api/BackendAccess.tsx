import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { ChoreWithAssignments } from "../model/ChoreWithAssignments";
import { RewardWithGrants } from "../parent/models/RewardWithGrants";
import { UserProfile } from "../parent/models/UserProfile";
import { QueryObject } from "./models/QueryObject";
import { QueryProps } from "./models/QueryProps";
import { useGet, usePost, usePut, useDelete } from "./Queries";

// Settings for Chores on Parent-Dashboard
const choreProps: QueryProps = {
  getKey: "parentChoreGet", // Choose a unique keyname
  getUrl: "/api/Chores/Assignments/", // GET-Url from Swagger UI
  getErrorMessage: "losed Data!", // GET-Message to Snack
  postSuccessMessage: "chore created", // POST-Message to Snack
  postErrorMessage: "chore not created", // POST-Message to Snack
  putSuccessMessage: "chore updated", // PUT-Message to Snack
  putErrorMessage: "chore not updated", // PUT-Message to Snack
  deleteSuccessMessage: "chore deleted", // DELETE-Mesage to Snack
  deleteErrorMessage: "chore not deleted", // DELETE-Mesage to Snack
  mutateUrl: "/api/Chores/", // POST/PUT/DELETE-Url from Swagger UI
};

// GET - load all Chores on Parent-Dashboard
export const useParentChoreGet = (additiveUrl?: number | string) =>
  useGet<ChoreWithAssignments[]>(
    choreProps.getKey,
    choreProps.getUrl,
    choreProps.getErrorMessage,
    additiveUrl // absolute userId or familyName witch includes at the end of url
  );

// POST - create one Chore on Parent-Dashboard
export const useParentChorePost = () =>
  usePost<ChoreWithAssignments>(
    choreProps.getKey,
    choreProps.postSuccessMessage,
    choreProps.postErrorMessage
  );

// PUT - change one Chore on Parent-Dashboard
export const useParentChorePut = () =>
  usePut<ChoreWithAssignments>(
    choreProps.getKey,
    choreProps.putSuccessMessage,
    choreProps.putErrorMessage
  );

// DELETE - delete one Chore on Parent-Dashboard
export const useParentChoreDelete = () =>
  useDelete<ChoreWithAssignments>(
    choreProps.getKey,
    choreProps.deleteSuccessMessage,
    choreProps.deleteErrorMessage
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
  getErrorMessage: "losed Data!", // GET-Message to Snack
  postSuccessMessage: "reward created", // POST-Message to Snack
  postErrorMessage: "reward not created", // POST-Message to Snack
  putSuccessMessage: "reward updated", // PUT-Message to Snack
  putErrorMessage: "reward not updated", // PUT-Message to Snack
  deleteSuccessMessage: "reward deleted", // DELETE-Mesage to Snack
  deleteErrorMessage: "reward not deleted", // DELETE-Mesage to Snack
  mutateUrl: "/api/Rewards/", // POST/PUT/DELETE-Url from Swagger UI
};

// GET - load all Rewards on Parent-Dashboard
export const useParentRewardGet = (additiveUrl?: number | string) =>
  useGet<RewardWithGrants[]>(
    rewardProps.getKey,
    rewardProps.getUrl,
    rewardProps.getErrorMessage,
    additiveUrl // absolute userId or familyName witch includes at the end of url
  );

// POST - create one Reward on Parent-Dashboard
export const useParentRewardPost = () =>
  usePost<RewardWithGrants>(
    rewardProps.getKey,
    rewardProps.postSuccessMessage,
    rewardProps.postErrorMessage
  );

// PUT - change one Reward on Parent-Dashboard
export const useParentRewardPut = () =>
  usePut<RewardWithGrants>(
    rewardProps.getKey,
    rewardProps.putSuccessMessage,
    rewardProps.putErrorMessage
  );

// DELETE - delete one Reward on Parent-Dashboard
export const useParentRewardDelete = () =>
  useDelete<RewardWithGrants>(
    rewardProps.getKey,
    rewardProps.deleteSuccessMessage,
    rewardProps.deleteErrorMessage
  );

// MUTATE - mutate the POST/PUT/DELETE object on Parent-Dashboard
export const mutateReward = (object: any) =>
  ({
    url: rewardProps.mutateUrl,
    object: object,
  } as QueryObject);

// Settings for Profiles on Parent-Dashboard
const profileProps: QueryProps = {
  getKey: "parentProfileGet", // Choose a unique keyname
  getUrl: "/api/Users/", // GET-Url from Swagger UI
  getErrorMessage: "losed Data!", // GET-Message to Snack
  postSuccessMessage: "user created", // POST-Message to Snack
  postErrorMessage: "user not created", // POST-Message to Snack
  putSuccessMessage: "user updated", // PUT-Message to Snack
  putErrorMessage: "user not updated", // PUT-Message to Snack
  deleteSuccessMessage: "user deleted", // DELETE-Mesage to Snack
  deleteErrorMessage: "user not deleted", // DELETE-Mesage to Snack
  mutateUrl: "/api/Users/", // POST/PUT/DELETE-Url from Swagger UI
};

// GET - load all Profiles on Parent-Dashboard
export const useParentProfileGet = (additiveUrl?: number | string) =>
  useGet<UserProfile>(
    profileProps.getKey,
    profileProps.getUrl,
    profileProps.getErrorMessage,
    additiveUrl // absolute userId or familyName witch includes at the end of url
  );
