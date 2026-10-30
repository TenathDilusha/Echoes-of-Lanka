import type { CharacterId } from "./characters";

export type Fact = {
  id: string;
  characterIds: CharacterId[];
  claim: string;
  tags: string[];
  sources: { title: string; detail: string }[];
  confidence: "chronicle" | "archaeology" | "scholarship";
};

/**
 * Curated, citable claims. The LLM never invents these —
 * retrieval + this file are the only FACT sources.
 */
export const facts: Fact[] = [
  // —— Kashyapa / Sigiriya ——
  {
    id: "kash-01",
    characterIds: ["kashyapa", "fresco-painter"],
    claim:
      "Kashyapa I (Kassapa) ruled from about 477 to 495 CE after seizing power from his father Dhatusena, according to the Culavamsa chronicle tradition.",
    tags: ["kashyapa", "throne", "usurp", "dhatusena", "culavamsa", "reign"],
    sources: [
      {
        title: "Cūlavaṃsa (chronicle tradition)",
        detail: "Later continuation of the Mahavamsa; primary literary source for Kashyapa's reign.",
      },
      {
        title: "UNESCO World Heritage listing — Ancient City of Sigiriya",
        detail: "Summarizes the site's association with Kashyapa's 5th-century fortress-palace.",
      },
    ],
    confidence: "chronicle",
  },
  {
    id: "kash-02",
    characterIds: ["kashyapa", "fresco-painter"],
    claim:
      "Sigiriya (Sīhagiri, 'Lion Rock') was developed as a rock fortress and palace complex under Kashyapa, with gardens, terraces, and a gateway approached through a monumental lion figure.",
    tags: ["sigiriya", "lion", "palace", "fortress", "gardens", "rock"],
    sources: [
      {
        title: "UNESCO — Ancient City of Sigiriya",
        detail: "Describes the rock citadel, gardens, and lion gateway.",
      },
      {
        title: "Department of Archaeology, Sri Lanka — Sigiriya site literature",
        detail: "Site interpretation of palace, terraces, and defensive works.",
      },
    ],
    confidence: "archaeology",
  },
  {
    id: "kash-03",
    characterIds: ["kashyapa"],
    claim:
      "Chronicle tradition holds that Kashyapa was later defeated by his half-brother Moggallana and that the capital returned toward Anuradhapura; Kashyapa is said to have died in the conflict.",
    tags: ["moggallana", "defeat", "death", "anuradhapura", "battle"],
    sources: [
      {
        title: "Cūlavaṃsa (chronicle tradition)",
        detail: "Narrative of Moggallana's return and Kashyapa's fall.",
      },
    ],
    confidence: "chronicle",
  },
  {
    id: "kash-04",
    characterIds: ["kashyapa", "fresco-painter"],
    claim:
      "The Mirror Wall (Katapath Pauwa) below the fresco pocket bears early graffiti poems and visitor inscriptions, showing Sigiriya was visited and commented on for centuries after Kashyapa.",
    tags: ["mirror wall", "graffiti", "inscription", "visitors", "poetry"],
    sources: [
      {
        title: "Paranavitana, S. — Sigiri Graffiti",
        detail: "Edition and study of Mirror Wall graffiti.",
      },
      {
        title: "UNESCO — Ancient City of Sigiriya",
        detail: "Notes the Mirror Wall and historical visitor inscriptions.",
      },
    ],
    confidence: "archaeology",
  },
  // —— Frescoes ——
  {
    id: "fres-01",
    characterIds: ["fresco-painter", "kashyapa"],
    claim:
      "The surviving Sigiriya frescoes show female figures (often called 'apsaras' or court ladies in later interpretation) painted in a pocket high on the western rock face; many more paintings once existed and were lost.",
    tags: ["fresco", "women", "apsara", "paint", "western", "pocket"],
    sources: [
      {
        title: "UNESCO — Ancient City of Sigiriya",
        detail: "Describes the fresco gallery and the larger original painted surface.",
      },
      {
        title: "Bandaranayake, S. — Sigiriya scholarship summaries",
        detail: "Discusses dating, style, and interpretation of the figures.",
      },
    ],
    confidence: "archaeology",
  },
  {
    id: "fres-02",
    characterIds: ["fresco-painter"],
    claim:
      "The frescoes use mineral pigments bound in a plaster/tempera tradition suited to rock surfaces; exact workshop recipes are reconstructed by conservators rather than fully preserved in texts.",
    tags: ["pigment", "ochre", "plaster", "color", "technique", "tempera"],
    sources: [
      {
        title: "Conservation literature on Sigiriya paintings",
        detail: "Technical studies of plaster layers and mineral pigments.",
      },
    ],
    confidence: "scholarship",
  },
  {
    id: "fres-03",
    characterIds: ["fresco-painter", "kashyapa"],
    claim:
      "Identity of the painted women is debated: court ladies, celestial beings, or ritual figures. Scholarship treats these readings as interpretations, not settled fact.",
    tags: ["identity", "ladies", "debate", "interpretation", "who"],
    sources: [
      {
        title: "Art-historical surveys of Sigiriya frescoes",
        detail: "Summarizes competing iconographic readings.",
      },
    ],
    confidence: "scholarship",
  },
  // —— Stupa mason / Anuradhapura ——
  {
    id: "stupa-01",
    characterIds: ["stupa-mason", "sanghamitta"],
    claim:
      "Anuradhapura was the political and religious capital of early Sinhalese kingdoms for many centuries, with monumental Buddhist stupas (dagabas) such as Ruwanwelisaya, Jetavanaramaya, and Abhayagiri.",
    tags: ["anuradhapura", "stupa", "dagaba", "ruwanweli", "jetavana", "capital"],
    sources: [
      {
        title: "UNESCO — Sacred City of Anuradhapura",
        detail: "Overview of the sacred city and major monastic monuments.",
      },
    ],
    confidence: "archaeology",
  },
  {
    id: "stupa-02",
    characterIds: ["stupa-mason"],
    claim:
      "Great brick stupas enclosed relic chambers and were raised in staged courses with massive labor organization; Jetavanaramaya was among the largest brick structures of the ancient world.",
    tags: ["brick", "relic", "labor", "jetavana", "build", "courses"],
    sources: [
      {
        title: "Archaeological Survey literature on Jetavanaramaya",
        detail: "Scale, brick construction, and monastic complex.",
      },
      {
        title: "UNESCO — Sacred City of Anuradhapura",
        detail: "Notes monumental dagabas and monastic landscape.",
      },
    ],
    confidence: "archaeology",
  },
  {
    id: "stupa-03",
    characterIds: ["stupa-mason"],
    claim:
      "Monsoon seasons shaped construction calendars in the dry zone: clay for bricks, water for work camps, and pauses when rains made high scaffolding hazardous.",
    tags: ["monsoon", "rain", "season", "work", "clay", "brick"],
    sources: [
      {
        title: "Environmental and historical studies of the Rajarata dry zone",
        detail: "Seasonality of agriculture and large-scale building.",
      },
    ],
    confidence: "scholarship",
  },
  // —— Sanghamitta ——
  {
    id: "sang-01",
    characterIds: ["sanghamitta", "stupa-mason"],
    claim:
      "According to the Mahavamsa tradition, Sanghamittā Therī, daughter of Emperor Ashoka, brought a sapling of the Bodhi tree to Anuradhapura in the 3rd century BCE and established the bhikkhunī (nuns') order in Lanka.",
    tags: ["sanghamitta", "bodhi", "ashoka", "nun", "bhikkhuni", "tree", "voyage"],
    sources: [
      {
        title: "Mahāvaṃsa (chronicle tradition)",
        detail: "Narrative of the Bodhi sapling mission and Sanghamitta.",
      },
      {
        title: "Sri Maha Bodhi, Anuradhapura — living tradition",
        detail: "Site venerated as descended from the Ashokan sapling.",
      },
    ],
    confidence: "chronicle",
  },
  {
    id: "sang-02",
    characterIds: ["sanghamitta"],
    claim:
      "The Sri Maha Bodhi in Anuradhapura is widely regarded in Buddhist tradition as grown from that sapling and is among the oldest historically attested trees continuously tended by a religious community.",
    tags: ["sri maha bodhi", "tree", "anuradhapura", "oldest", "venerate"],
    sources: [
      {
        title: "Mahāvaṃsa tradition + continuous temple stewardship",
        detail: "Living cult around the Bodhi tree precinct.",
      },
      {
        title: "UNESCO — Sacred City of Anuradhapura",
        detail: "Recognizes the sacred city's Buddhist landscape including the Bodhi.",
      },
    ],
    confidence: "chronicle",
  },
  {
    id: "sang-03",
    characterIds: ["sanghamitta"],
    claim:
      "Independent archaeological corroboration of every voyage detail in the chronicle is limited; historians treat the Mahavamsa as a powerful but literary source that mixes memory, politics, and devotion.",
    tags: ["chronicle", "evidence", "limits", "history", "verify"],
    sources: [
      {
        title: "Modern historiography of early Sri Lanka",
        detail: "Critical use of Pali chronicles alongside archaeology.",
      },
    ],
    confidence: "scholarship",
  },
  // —— Parakramabahu ——
  {
    id: "para-01",
    characterIds: ["parakramabahu"],
    claim:
      "Parākramabāhu I (r. c. 1153–1186) unified much of the island under Polonnaruwa and sponsored large irrigation works, including reservoirs associated with the phrase that no drop of rain should reach the sea unused.",
    tags: ["parakramabahu", "unify", "polonnaruwa", "irrigation", "tank", "water", "canal"],
    sources: [
      {
        title: "Cūlavaṃsa (chronicle tradition)",
        detail: "Accounts of unification and hydraulic works.",
      },
      {
        title: "UNESCO — Ancient City of Polonnaruwa",
        detail: "Contextualizes the medieval capital and monuments.",
      },
    ],
    confidence: "chronicle",
  },
  {
    id: "para-02",
    characterIds: ["parakramabahu"],
    claim:
      "The Parakrama Samudra ('Sea of Parakrama') complex near Polonnaruwa is a major tank system linked in tradition and scholarship to his irrigation program, though exact attribution of every bund stage is complex.",
    tags: ["parakrama samudra", "tank", "reservoir", "bund", "irrigation"],
    sources: [
      {
        title: "Irrigation archaeology of the Polonnaruwa plain",
        detail: "Studies of tank cascades and royal patronage.",
      },
      {
        title: "UNESCO — Ancient City of Polonnaruwa",
        detail: "Notes the historic hydraulic landscape.",
      },
    ],
    confidence: "archaeology",
  },
  {
    id: "para-03",
    characterIds: ["parakramabahu"],
    claim:
      "Parākramabāhu also intervened in Buddhist monastic reform and overseas campaigns according to chronicle sources; scale and motives of foreign expeditions remain debated among historians.",
    tags: ["monastery", "reform", "campaign", "abroad", "buddhist"],
    sources: [
      {
        title: "Cūlavaṃsa + modern political histories of Polonnaruwa",
        detail: "Monastic reorganization and foreign ventures.",
      },
    ],
    confidence: "scholarship",
  },
  // —— Cinnamon trader ——
  {
    id: "cin-01",
    characterIds: ["cinnamon-trader"],
    claim:
      "True cinnamon (Cinnamomum verum / C. zeylanicum) is native to Sri Lanka and was a major Indian Ocean trade good long before European colonial monopolies.",
    tags: ["cinnamon", "spice", "trade", "zeylanicum", "bark", "native"],
    sources: [
      {
        title: "Botanical and trade histories of Cinnamomum verum",
        detail: "Native range and historic export role.",
      },
      {
        title: "Indian Ocean trade scholarship",
        detail: "Places Lanka spices in monsoon commerce networks.",
      },
    ],
    confidence: "scholarship",
  },
  {
    id: "cin-02",
    characterIds: ["cinnamon-trader"],
    claim:
      "Harvest involves peeling inner bark from shoots in carefully timed seasons; skilled peelers (historically including caste-specialized labor in later periods) determined quality grades for export.",
    tags: ["peel", "harvest", "peeler", "bark", "quality", "labor"],
    sources: [
      {
        title: "Ethnographic and colonial-era cinnamon industry records",
        detail: "Describes peeling technique and labor organization (use critically for earlier centuries).",
      },
    ],
    confidence: "scholarship",
  },
  {
    id: "cin-03",
    characterIds: ["cinnamon-trader"],
    claim:
      "Monsoon winds structured sailing calendars across the Arabian Sea and Bay of Bengal, timing when foreign merchants could safely enter and leave Lankan harbors.",
    tags: ["monsoon", "ship", "harbor", "wind", "sail", "arabian"],
    sources: [
      {
        title: "Indian Ocean monsoon trade studies",
        detail: "Seasonal sailing patterns linking Africa, Arabia, India, and Lanka.",
      },
    ],
    confidence: "scholarship",
  },
  {
    id: "cin-04",
    characterIds: ["cinnamon-trader", "parakramabahu"],
    claim:
      "Medieval travelers and geographers knew the island under names such as Serendib / Taprobane / Ceylon variants; cinnamon and gems repeatedly appear in external descriptions of its wealth.",
    tags: ["serendib", "taprobane", "ceylon", "name", "foreign", "gems"],
    sources: [
      {
        title: "Classical and medieval geographies of Taprobane/Serendib",
        detail: "External naming and commodity lists.",
      },
    ],
    confidence: "scholarship",
  },
];
