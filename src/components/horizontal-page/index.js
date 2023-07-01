import React, { useRef, useEffect } from "react";
import styles from "./page.module.css";

const HorizontalPage = ({ children, onChange }) => {
  const containerRef = useRef(null);
  const scrollAmount = 40; // Adjust scroll amount as needed for touch events
  const wheelScrollFactor = 0.15; // Adjust the scroll factor for the wheel

  useEffect(() => {
    const handleScroll = (event) => {
      const { deltaX, deltaY } = event;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        event.preventDefault();

        if (containerRef.current) {
          containerRef.current.scrollLeft += deltaX * wheelScrollFactor;
          if (onChange) {
            onChange(containerRef.current.scrollLeft);
          }
        }
      } else {
        if (containerRef.current) {
          containerRef.current.scrollLeft += deltaY * wheelScrollFactor;
          if (onChange) {
            onChange(containerRef.current.scrollLeft);
          }
        }
      }
    };

    const handleTouchStart = (event) => {
      const touchStartX = event.touches[0].clientX;

      const handleTouchMove = (event) => {
        const touchCurrentX = event.touches[0].clientX;

        const deltaX = (touchCurrentX - touchStartX) / scrollAmount;

        if (Math.abs(deltaX)) {
          event.preventDefault();

          if (containerRef.current) {
            containerRef.current.scrollLeft -= deltaX;
            if (onChange) {
              onChange(containerRef.current.scrollLeft);
            }
          }
        } 
      };

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    };

    const handleKeyDown = (event) => {
      const { keyCode } = event;
      const arrowKeys = [37, 39]; // Left and Right arrow key codes

      if (arrowKeys.includes(keyCode)) {
        event.preventDefault();

        const scrollLeft = containerRef.current.scrollLeft;
        const scrollDirection = keyCode === 37 ? -1 : 1; // -1 for left, 1 for right

        smoothScroll(scrollLeft, scrollDirection * 20);
      }
    };

    const smoothScroll = (start, change) => {
      let currentTime = 0;
      const duration = 300; // Adjust duration as needed
      const increment = 40; // Adjust increment as needed

      const animateScroll = () => {
        currentTime += increment;
        const scrollValue = easeInOutQuad(currentTime, start, change, duration);
        containerRef.current.scrollLeft = scrollValue;
        if (onChange) {
          onChange(containerRef.current.scrollLeft);
        }

        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      animateScroll();
    };

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    document.addEventListener("wheel", handleScroll, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("wheel", handleScroll, { passive: false });
      document.removeEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles["full-screen-container"]} ref={containerRef}>
      {children}
    </div>
  );
};

export default HorizontalPage;
