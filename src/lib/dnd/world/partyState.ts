import type { PartyState } from "./types";

export const partyState: PartyState = {
  mode: "party",

  party: {
    label: "The Party",
    xPercent: 53.6,
    yPercent: 52.7,
    imageSrc: "/dnd/party/party_gang_four.png",
  },
  characters: []

  // characters: [
  //   {
  //     id: "zarathustra",
  //     name: "Zarathustra",
  //     xPercent: 43.1,
  //     yPercent: 50.2,
  //     imageSrc: "/dnd/portraits/Zarathustra_Xanthus_Headshot.png",
  //   },
  //   {
  //     id: "zyvan",
  //     name: "Zyvan",
  //     xPercent: 44.0,
  //     yPercent: 50.9,
  //     imageSrc: "/dnd/portraits/Zyvan_Headshot.png",
  //   },
  // ],
};