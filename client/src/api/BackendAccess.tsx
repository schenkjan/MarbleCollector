import { ChoreWithAssignments } from "../model/ChoreWithAssignments";
import { RewardWithGrants } from "../parent/models/RewardWithGrants";
import { QueryObject } from "./models/QueryObject";
import { QueryProps } from "./models/QueryProps";
import { useGet, usePost, usePut, useDelete } from "./Queries";

// Settings for Chores on Parent-Dashboard
const choreProps: QueryProps = {
  getKey: "parentChoreGet", // Choose a unique keyname
  getUrl: "/api/Chores/Assignments/", // GET-Url from Swagger UI
  getMessage: "losed Data!", // GET-Message to Snack
  postMessage: "chore created", // POST-Message to Snack
  putMessage: "chore updated", // PUT-Message to Snack
  deleteMessage: "chore deleted", // DELETE-Mesage to Snack
  mutateUrl: "/api/Chores/", // POST/PUT/DELETE-Url from Swagger UI
};

// GET - load all Chores on Parent-Dashboard
export const useParentChoreGet = () =>
  useGet<ChoreWithAssignments[]>(
    choreProps.getKey,
    choreProps.getUrl,
    choreProps.getMessage
  );

// POST - create one Chore on Parent-Dashboard
export const useParentChorePost = () =>
  usePost<ChoreWithAssignments>(choreProps.getKey, choreProps.postMessage);

// PUT - change one Chore on Parent-Dashboard
export const useParentChorePut = () =>
  usePut<ChoreWithAssignments>(choreProps.getKey, choreProps.putMessage);

// DELETE - delete one Chore on Parent-Dashboard
export const useParentChoreDelete = () =>
  useDelete<ChoreWithAssignments>(choreProps.getKey, choreProps.deleteMessage);

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
  getMessage: "losed Data!", // GET-Message to Snack
  postMessage: "reward created", // POST-Message to Snack
  putMessage: "reward updated", // PUT-Message to Snack
  deleteMessage: "reward deleted", // DELETE-Mesage to Snack
  mutateUrl: "/api/Rewards/", // POST/PUT/DELETE-Url from Swagger UI
};

// GET - load all Rewards on Parent-Dashboard
export const useParentRewardGet = () =>
  useGet<RewardWithGrants[]>(
    rewardProps.getKey,
    rewardProps.getUrl,
    rewardProps.getMessage
  );

// POST - create one Reward on Parent-Dashboard
export const useParentRewardPost = () =>
  usePost<RewardWithGrants>(rewardProps.getKey, rewardProps.postMessage);

// PUT - change one Reward on Parent-Dashboard
export const useParentRewardPut = () =>
  usePut<RewardWithGrants>(rewardProps.getKey, rewardProps.putMessage);

// DELETE - delete one Reward on Parent-Dashboard
export const useParentRewardDelete = () =>
  useDelete<RewardWithGrants>(rewardProps.getKey, rewardProps.deleteMessage);

// MUTATE - mutate the POST/PUT/DELETE object on Parent-Dashboard
export const mutateReward = (object: any) =>
  ({
    url: rewardProps.mutateUrl,
    object: object,
  } as QueryObject);

// for Users copy the part above this comment --> ....

export function getApiBaseUrl(): string {
  return process.env.REACT_APP_APIBASEURL as string;
}
