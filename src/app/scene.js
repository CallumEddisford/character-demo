import { useEffect, useState } from "react";
import styles from "./page.module.css";

const Scene = ({ scene, index, visibility }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const inverseVisibility = 100 - visibility;

  return (
    <div key={`slide-${index}`} className={styles.scene}>
      {(scene?.showCurtain && isClient) && (
        <div
          className={styles.curtain}
          style={{ transform: `translateY(-${inverseVisibility}%)` }}
        />
      )}
      <div className={styles.card}>
        <h2>{scene.title}</h2>
        <p>{scene.desc}</p>
        {isClient && <p>Visibility: {Math.round(visibility * 100) / 100}</p>}
      </div>

      {scene?.showPodium && (
        <>
          <div className={styles.podium} />
          <div className={styles.podiumCenter} />
        </>
      )}
    </div>
  );
};

export default Scene;
