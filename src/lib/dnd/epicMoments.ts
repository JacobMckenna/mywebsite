import epicMoments from "../../config/dnd/epicMoments.json";
import { getCharacters, type Character } from "./characters";
import { getCampaigns, type Campaign } from "./campaigns";

export type EpicMoment = {
  id: string;
  title: string;
  imageSrc: string;
  description: string;
  characterIds: string[];
};


export function getEpicMoments(): EpicMoment[] {
  return epicMoments as EpicMoment[];
}

export function getEpicMomentById(id: string): EpicMoment | null {
  return getEpicMoments().find((moment) => moment.id === id) || null;
}


// ----------------------------------------------------------------------------

export type HydratedEpicMoment = EpicMoment & {
  characters: Character[];
  campaign: Campaign | null;
};

export type HydratedCampaign = Campaign & {
  epicMoments: HydratedEpicMoment[];
};

export function createCharacterMap(): Map<string, Character> {
  const characters = getCharacters() as Character[];
  return new Map(characters.map((character) => [character.id, character]));
}

export function createCampaignMap(): Map<string, Campaign> {
  const campaigns = getCampaigns();
  return new Map(campaigns.map((campaign) => [campaign.id, campaign]));
}

export function hydrateEpicMoments(epicMoments: EpicMoment[]): HydratedEpicMoment[] {
  const characterMap = createCharacterMap();
  const campaignMap = createCampaignMap();

  return epicMoments.map((moment) => ({
    ...moment,
    campaign: campaignMap.get(moment.campaignId) || null,
    characters: (moment.characterIds || [])
      .map((id) => characterMap.get(id))
      .filter((character): character is Character => Boolean(character)),
  }));
}

export function groupEpicMomentsByCampaign(
  epicMoments: EpicMoment[]
): HydratedCampaign[] {
  const campaigns = getCampaigns();
  const hydratedMoments = hydrateEpicMoments(epicMoments);

  return campaigns
    .map((campaign) => ({
      ...campaign,
      epicMoments: hydratedMoments.filter(
        (moment) => moment.campaignId === campaign.id
      ),
    }))
    .filter((campaign) => campaign.epicMoments.length > 0);
}