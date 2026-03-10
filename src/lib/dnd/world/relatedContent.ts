import type { RelatedContentMap } from "./types";

export const relatedContent: RelatedContentMap = {
  campaign_main: {
    id: "campaign_main",
    type: "campaign",
    title: "The Adventure",
    summary:
      "New heroes rise after the assassination of King Matthias of Mudra, setting off chaos across Elandria.",
    route: "/dnd/campaigns/the-adventure",
  },

  moment_mudra_fall: {
    id: "moment_mudra_fall",
    type: "epic-moment",
    title: "The Fall of Mudra",
    summary:
      "The fortress walls broke under pressure as old loyalties shattered inside the capital.",
    route: "/dnd/epic-moments/the-fall-of-mudra",
  },

  moment_vampire_dwarves: {
    id: "moment_vampire_dwarves",
    type: "epic-moment",
    title: "The Vampire Dwarf Uprising",
    summary:
      "An opaque storm swallowed the dwarven district, and the dwarves returned changed and blood-hungry.",
    route: "/dnd/epic-moments/vampire-dwarf-uprising",
  },
};