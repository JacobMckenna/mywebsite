import type { WorldMapData } from "./types";

export const worldMapData: WorldMapData = {
  id: "elandria-world",
  name: "Elandria",
  imageSrc: "/dnd/maps/world/Elandria.jpg",
  alt: "World map of Elandria",
  markers: [
    {
      id: "mudra",
      name: "Mudra",
      type: "capital",
      xPercent: 42.8,
      yPercent: 51.2,
      route: "/maps/regions/mudra",
      description:
        "The capital city of Mudra, known for political intrigue and old fortifications.",
      iconType: "city",
      relatedContentIds: ["campaign_main", "moment_mudra_fall"],
    },
    {
      id: "dwarven-district",
      name: "Dwarven District",
      type: "district",
      xPercent: 61.4,
      yPercent: 47.1,
      route: "/maps/regions/dwarven-district",
      description:
        "A fortified dwarven region of smoke, industry, and stone.",
      iconType: "fort",
      relatedContentIds: ["moment_vampire_dwarves"],
    },
    {
      id: "elder-tree",
      name: "Elder Tree",
      type: "landmark",
      xPercent: 28.3,
      yPercent: 33.7,
      route: "/maps/regions/elder-tree",
      description:
        "A sacred landmark tied to ancient magic and forgotten history.",
      iconType: "landmark",
      relatedContentIds: ["campaign_main"],
    },
  ],
};