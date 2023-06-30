import React, { useEffect, useState, useRef } from "react";
import ReactSpriter from "react-spriter";
import sprite from "./character.png";

function Character() {
  const FACE_DOWN = 0;
  const FACE_UP = 1;
  const FACE_LEFT = 2;
  const FACE_RIGHT = 3;

  const [layer, setLayer] = useState(FACE_RIGHT);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isWindowSmaller, setIsWindowSmaller] = useState(false);
  const touchStartXRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setIsWindowSmaller(window.innerWidth < 500);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      touchStartXRef.current = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
      const touchCurrentX = event.touches[0].clientX;
      const deltaX = touchCurrentX - touchStartXRef.current;

      if (deltaX < 0) {
        setLayer(FACE_RIGHT);
      } else {
        setLayer(FACE_LEFT);
      }
      setShouldAnimate(true);
    };

    const handleTouchEnd = () => {
      setShouldAnimate(false);
    };

    let scrollEndTimeout;

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("wheel", handleWheel, { passive: true });
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
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
      elementWidth={isWindowSmaller ? 120 : 180}
      isInfinite
      shouldAnimate={shouldAnimate}
      layer={shouldAnimate ? layer : FACE_DOWN}
    />
  );
}

export default Character;
