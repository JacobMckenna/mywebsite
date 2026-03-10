import sessions from "../../config/dnd/sessions.json";

export type SessionData = {
  campaignId: string;
  sessionNumber: number;
  title: string;
  description?: string;
};

export type Session = SessionData & {
  id: string;
};

function generateSessionId(campaignId: string, sessionNumber: number): string {
  return `${campaignId}-${sessionNumber}`;
}

export function getSessions(): Session[] {
  return (sessions as SessionData[])
    .map((session) => ({
      ...session,
      id: generateSessionId(session.campaignId, session.sessionNumber),
    }))
    .sort((a, b) => {
      if (a.campaignId !== b.campaignId) {
        return a.campaignId.localeCompare(b.campaignId);
      }
      return a.sessionNumber - b.sessionNumber;
    });
}

export function getSessionsByCampaign(campaignId: string): Session[] {
  return getSessions().filter(
    (session) => session.campaignId === campaignId
  );
}

export function getSessionById(id: string): Session | null {
  return getSessions().find((session) => session.id === id) ?? null;
}