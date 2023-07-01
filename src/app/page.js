"use client";
import HorizontalPage from "@/components/horizontal-page";
import React, { useState } from "react";
import styles from "./page.module.css";
import soil from "./soil.jpg";
import grass from "./grass.jpg";
import clouds from "./clouds.jpg";
import city from "./city.png";
import Character from "@/components/character";

const Home = () => {
  const scenes = new Array(10).fill(0);
  const [backgroundOffset, setBackgroundOffset] = useState(0);

  return (
    <div className={styles.background}>
      <HorizontalPage onChange={setBackgroundOffset}>
        <div
          className={styles["scrollable-content"]}
          style={{ backgroundImage: `url(${clouds.src})`, backgroundPositionX: `${backgroundOffset / 3}px` }}
        >
          <div key={"slide-initial"} className={styles.scene}>
            <div className={styles.card}>
              <h2>Use the arrow keys to move</h2>
              <p>or scroll left, right, up or down</p>
            </div>
          </div>
          {scenes.map((_, index) => {
            return (
              <div key={`slide-${index}`} className={styles.scene}>
                <div className={styles.card}>
                  <h2>A cool story</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    hendrerit neque nec maximus accumsan. Nullam nisl felis,
                    ultrices ac lacus eu, auctor pretium nibh.
                  </p>
                </div>
              </div>
            );
          })}
          <div className={styles.city} style={{ backgroundImage: `url(${city.src})`, backgroundPositionX: `-${backgroundOffset / 5}px` }}
          
          ></div>
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
      <div className={styles.character}>
        <Character />
      </div>
    </div>
  );
};

export default Home;
