"use client";
import HorizontalPage from "@/components/horizontal-page";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import soil from "./soil.jpg";
import grass from "./grass.jpg";
import clouds from "./clouds.jpg";
import city from "./city.png";
import Character from "@/components/character";
import Scene from "./scene";

const Home = () => {
  const newScenes = [
    {
      title: "Use the arrow keys to move",
      desc: "or scroll left, right, up or down",
    },
    {
      title: "A cool story",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit neque nec maximus accumsan. Nullam nisl felis, ultrices ac lacus eu, auctor pretium nibh.",
    },
    {
      title: "A cool story",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit neque nec maximus accumsan. Nullam nisl felis, ultrices ac lacus eu, auctor pretium nibh.",
    },
    {
      title: "A cool story",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit neque nec maximus accumsan. Nullam nisl felis, ultrices ac lacus eu, auctor pretium nibh.",
      showCurtain: true,
      showPodium: true
    },
    {
      title: "A cool story",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit neque nec maximus accumsan. Nullam nisl felis, ultrices ac lacus eu, auctor pretium nibh.",
    },
    {
      title: "A cool story",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit neque nec maximus accumsan. Nullam nisl felis, ultrices ac lacus eu, auctor pretium nibh.",
    },
  ];

  const [backgroundOffset, setBackgroundOffset] = useState(0);
  const [shouldFaceUp, setShouldFaceUp] = useState(false);
  const [podiumOffset, setPodiumOffset] = useState(0);

  const calculateVisibility = (sceneIndex) => {
    if (typeof window !== "undefined") {
      const sceneWidth = window.innerWidth;
      const scrollOffset = backgroundOffset;
      const sceneStart = sceneIndex * sceneWidth;
      const sceneEnd = (sceneIndex + 1) * sceneWidth;

      const visibleStart = Math.max(sceneStart, scrollOffset);
      const visibleEnd = Math.min(sceneEnd, scrollOffset + sceneWidth);
      const visibleWidth = visibleEnd - visibleStart;
      const visibility = (visibleWidth / sceneWidth) * 100;

      return visibility;
    }
  };

  useEffect(() => {
    const aboveNinety = newScenes.some((scene, index) => {
      const visibility = calculateVisibility(index);
      return visibility > 90;
    });

    setShouldFaceUp(aboveNinety);

    const podiumScene = newScenes.findIndex(scene => scene?.showPodium);
    const podiumVis = calculateVisibility(podiumScene);
    if (window.innerWidth > 600) {
      if (podiumVis > 92) setPodiumOffset(3);
      else if (podiumVis > 85) setPodiumOffset(1.2);
      else setPodiumOffset(0);
    } else {
      if (podiumVis > 85) setPodiumOffset(2);
      else if (podiumVis > 60) setPodiumOffset(0.8);
      else setPodiumOffset(0);
    }

  }, [backgroundOffset]);

  return (
    <div className={styles.background}>
      <HorizontalPage onChange={setBackgroundOffset}>
        <div
          className={styles["scrollable-content"]}
          style={{
            backgroundImage: `url(${clouds.src})`,
            backgroundPositionX: `${backgroundOffset / 3}px`,
          }}
        >
          {newScenes.map((scene, index) => (
            <Scene
              key={`scene-${index}`}
              scene={scene}
              visibility={calculateVisibility(index)}
            />
          ))}

          <div
            className={styles.city}
            style={{
              backgroundImage: `url(${city.src})`,
              backgroundPositionX: `-${backgroundOffset / 15}px`,
            }}
          />

          <div className={styles.ground}>
            <div
              className={styles.grass}
              style={{ backgroundImage: `url(${grass.src})` }}
            ></div>
            <div
              className={styles.soil}
              style={{ backgroundImage: `url(${soil.src})` }}
            ></div>
          </div>
        </div>
      </HorizontalPage>
      <div className={styles.character} style={{ bottom: `${podiumOffset}rem`}}>
        <Character shouldFaceUp={shouldFaceUp} />
      </div>
    </div>
  );
};

export default Home;
