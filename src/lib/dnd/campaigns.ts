import campaigns from "../../config/dnd/campaigns.json";

export type Campaign = {
  id: string;
  name: string;
  description?: string;
  coverImageSrc?: string;
};

export function getCampaigns(): Campaign[] {
  return campaigns as Campaign[];
}

export function getCampaignById(id: string): Campaign | null {
  return getCampaigns().find((campaign) => campaign.id === id) || null;
}