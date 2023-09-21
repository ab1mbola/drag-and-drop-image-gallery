import styles from "./Image.module.css"

const Image = ({ data }) => {
  return (
    <div>
      <img className={styles.image} src={data.urls.small} alt={data.alt_description} />
    </div>
  );
};

export default Image;
