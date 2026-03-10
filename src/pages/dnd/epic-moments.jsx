import React, { useMemo } from "react";
import { getEpicMoments, groupEpicMomentsByCampaign } from "../../lib/dnd/epicMoments";
import CampaignEpicMomentsSection from "../../components/dnd/epic-moments/CampaignEpicMomentsSection";

import Header from "../../components/dnd/layout/Header";
import Footer from "../../components/layout/Footer";

import Background from "../../components/dnd/layout/background";

export default function EpicMomentsPage() {
  const campaigns = useMemo(() => {
    return groupEpicMomentsByCampaign(getEpicMoments());
  }, []);

  return (
    <div>
      <Background>
    <Header
          activePage="home"
        />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at top center, rgba(255,170,60,0.14), transparent 28%), radial-gradient(circle at 20% 18%, rgba(255,120,50,0.08), transparent 22%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "2rem 1.25rem 4rem",
        }}
      >
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "28px",
            border: "1px solid rgba(215, 181, 109, 0.18)",
            background:
              "linear-gradient(180deg, rgba(33,21,14,0.72) 0%, rgba(18,11,8,0.88) 100%)",
            boxShadow: "0 24px 55px rgba(0,0,0,0.42)",
            marginBottom: "1.7rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.26) 0%, rgba(0,0,0,0.42) 100%), url(/dnd/landing_background.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.55) saturate(0.9)",
              opacity: 0.45,
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at top center, rgba(255,187,82,0.17), transparent 24%), linear-gradient(180deg, rgba(255,170,60,0.04), transparent 40%)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "clamp(2.5rem, 6vw, 5rem) clamp(1.2rem, 3vw, 3rem)",
              textAlign: "center",
            }}
          >
            {/* <div
              style={{
                color: "#d7b56d",
                textTransform: "uppercase",
                letterSpacing: "0.24em",
                fontSize: "0.8rem",
                marginBottom: "1rem",
                fontWeight: 700,
              }}
            >
              Campaign Chronicle
            </div> */}

            <h1
              style={{
                margin: 0,
                color: "#f7e6b7",
                fontFamily: "Cinzel, Georgia, serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1,
                textShadow:
                  "0 3px 18px rgba(0,0,0,0.48), 0 0 26px rgba(255,180,60,0.08)",
              }}
            >
              Epic Moments
            </h1>

            {/* <p
              style={{
                maxWidth: "820px",
                margin: "1.15rem auto 0",
                color: "#efe2c3",
                lineHeight: 1.85,
                fontSize: "clamp(0.98rem, 1.6vw, 1.08rem)",
              }}
            >
              "The battles, vows, betrayals, desperate last stands, and impossible
              victories that carved your campaign into legend."
            </p> */}

            <div
              style={{
                marginTop: "1.35rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.8rem",
                color: "#cfa85d",
                fontSize: "0.82rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "54px",
                  height: "1px",
                  background: "rgba(215, 181, 109, 0.55)",
                }}
              />
              "God that whole thing was fucking epic" • Eric — 02/21/2021
              <span
                style={{
                  display: "block",
                  width: "54px",
                  height: "1px",
                  background: "rgba(215, 181, 109, 0.55)",
                }}
              />
            </div>
          </div>
        </section>

        {campaigns.map((campaign) => (
          <CampaignEpicMomentsSection
            key={campaign.id}
            campaign={campaign}
          />
        ))}
      </div>

      <style>{`
        .epic-moment-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 26px 50px rgba(0,0,0,0.46);
          border-color: rgba(215, 181, 109, 0.42);
        }

        .epic-moment-card:hover .epic-moment-image {
          transform: scale(1.05);
        }

        @media (max-width: 700px) {
          .epic-moment-card:hover {
            transform: none;
          }

          .epic-moment-card:hover .epic-moment-image {
            transform: scale(1.02);
          }
        }
      `}</style>
    <Footer />

    </Background>
  </div>
  );
}