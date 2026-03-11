import React from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import {
  GiTiedScroll,
  GiTreasureMap,
  GiDiceTwentyFacesTwenty,
  GiReturnArrow,
  GiSpikedDragonHead
} from "react-icons/gi";

export default function Header({
  title = "The Echoes of Legends",
  activePage = ""
}) {

  const isMobile = useIsMobile();

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  const navItems = [
    { label: "Quest Log", href: "/dnd/quests", icon: GiTiedScroll },
    { label: "Epic Moments", href: "/dnd/epic", icon: GiDiceTwentyFacesTwenty },
    { label: "World Map", href: "/dnd/map", icon: GiTreasureMap },
    { label: "Session Log", href: "/dnd/sessions", icon: GiSpikedDragonHead }
  ];

  return (
    <header
      style={{
        width: "100%",
        background:
          "linear-gradient(180deg, rgba(34,20,12,.96) 0%, rgba(18,10,6,.96) 100%)",
        borderBottom: "2px solid rgba(201,166,92,.65)",
        boxShadow:
          "0 8px 24px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.04)"
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "12px 18px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 18
        }}
      >

        {/* LEFT SIDE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            flex: "1 1 auto",
            minWidth: 260
          }}
        >

          {/* RETURN BUTTON */}
          <button
            onClick={handleBack}
            style={{
              appearance: "none",
              border: "1px solid rgba(201,166,92,.75)",
              background:
                "linear-gradient(180deg, rgba(88,58,28,.95) 0%, rgba(53,33,15,.95) 100%)",
              color: "#f4e7c5",
              padding: "10px 14px",
              borderRadius: 12,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "Georgia, serif",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow:
                "0 4px 12px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.08)"
            }}
          >
            <GiReturnArrow size={18} />
            Return
          </button>

          {/* CAMPAIGN TITLE (CLICKABLE) */}
          <a
            href="/dnd/home"
            style={{
              textDecoration: "none",
              cursor: "pointer"
            }}
          >
            <div
              style={{
                color: "#c9a65c",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                fontWeight: 700
              }}
            >
              Campaign Menu
            </div>

            <div
              style={{
                color: "#f5e6c8",
                fontSize: "clamp(20px,4vw,26px)",
                fontWeight: 700,
                fontFamily: "Georgia, serif",
                textShadow: "0 2px 8px rgba(0,0,0,.35)"
              }}
            >
              {title}
            </div>
          </a>

        </div>


        {/* RIGHT NAV */}
        <nav
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "flex-end",
            flex: "1 1 500px"
          }}
        >

          {navItems.map((item) => {

            const Icon = item.icon;
            const isActive = activePage === item.label;

            return (
              <a
                key={item.label}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    border: isActive
                      ? "1px solid rgba(255,224,150,.95)"
                      : "1px solid rgba(201,166,92,.55)",

                    background: isActive
                      ? "linear-gradient(180deg, rgba(110,74,34,.98) 0%, rgba(70,42,18,.98) 100%)"
                      : "linear-gradient(180deg, rgba(36,24,14,.95) 0%, rgba(22,14,8,.95) 100%)",

                    color: isActive ? "#fff2c9" : "#f1dfb5",
                    padding: "10px 14px",
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "Georgia, serif",
                    whiteSpace: "nowrap",
                    boxShadow:
                      "0 3px 10px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.05)"
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                </span>
              </a>
            );

          })}
        </nav>

      </div>


      {/* GOLD DIVIDER */}
      <div
        style={{
          height: 4,
          width: "100%",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(201,166,92,.85) 20%, rgba(255,225,160,.95) 50%, rgba(201,166,92,.85) 80%, rgba(0,0,0,0) 100%)"
        }}
      />

    </header>
  );
}