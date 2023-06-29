import React, { useEffect, useState } from "react";
import ReactSpriter from "react-spriter";
import sprite from "./character.png";

function Character() {
  const FACE_DOWN = 0;
  const FACE_UP = 1;
  const FACE_LEFT = 2;
  const FACE_RIGHT = 3;

  const [layer, setLayer] = useState(FACE_RIGHT);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      let animate = false;
      if (event.key === "ArrowRight") {
        setLayer(FACE_RIGHT);
        animate = true;
      } else if (event.key === "ArrowLeft") {
        setLayer(FACE_LEFT);
        animate = true;
      }
      setShouldAnimate(animate);
    };

    const handleKeyUp = () => setShouldAnimate(false);

    const handleWheel = (event) => {
      const isScrollingRight = event.deltaX > 0;
      const isScrollingDown = event.deltaY > 0;
      setShouldAnimate(true);
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        setLayer(isScrollingRight ? FACE_RIGHT : FACE_LEFT);
      } else {
        setLayer(isScrollingDown ? FACE_RIGHT : FACE_LEFT);
      }
      clearTimeout(scrollEndTimeout);
      scrollEndTimeout = setTimeout(() => {
        setShouldAnimate(false);
      }, 200);
    };

    const handleTouchStart = (event) => {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      setShouldAnimate(true);
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        setLayer(deltaX > 0 ? FACE_RIGHT : FACE_LEFT);
      } else {
        setLayer(deltaY > 0 ? FACE_LEFT : FACE_RIGHT);
      }

      clearTimeout(scrollEndTimeout);
      scrollEndTimeout = setTimeout(() => {
        setShouldAnimate(false);
      }, 200);
    };

    let touchStartX, touchStartY;
    let scrollEndTimeout;

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("wheel", handleWheel, { passive: true });
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(scrollEndTimeout);
    };
  }, []);

  return (
    <ReactSpriter
      sprite={sprite.src}
      spriteWidth={735}
      frameWidth={183.75}
      frameHeight={275.25}
      duration={500}
      isInfinite
      shouldAnimate={shouldAnimate}
      layer={shouldAnimate ? layer : 0}
    />
  );
}

export default Character;
