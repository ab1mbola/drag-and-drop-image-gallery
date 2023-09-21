import styles from "./Skeleton.module.css";

const Skeleton = ({ item }) => {
  return [...Array(item).keys()].map(() => (
    <div className={styles.pulse}>
      <div></div>
    </div>
  ));
};

export default Skeleton;
