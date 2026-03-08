import { useEffect, useState } from "react";

export default function useCharacterModalLifecycle({ character, onClose }) {
  const [stage, setStage] = useState("closed");

  useEffect(() => {
    if (!character) return;

    setStage("enter");
    let raf1;
    let raf2;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setStage("open"));
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [character]);

  useEffect(() => {
    if (!character) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        setStage("exit");
        setTimeout(() => {
          onClose();
        }, 320);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [character, onClose]);

  const handleClose = () => {
    setStage("exit");
    setTimeout(() => {
      onClose();
    }, 320);
  };

  return { stage, handleClose };
}