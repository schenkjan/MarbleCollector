import { Grant } from "./Grant";

export interface RewardWithGrants {
  id: number;
  name: string;
  description: string;
  value: number;
  grants: Grant[];
}
