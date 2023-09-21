import { signOut } from "firebase/auth";
import { database } from "../../firebase/config";
import ImageGallery from "../imageGallery/ImageGallery";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Home = () => {
  const history = useNavigate();

  const handleClick = () => {
    signOut(database).then((value) => {
      console.log(value);
      history("/");
    });
  };
  return (
    <>
      <div className={styles.home}>
        <div className={styles["home-header"]}>
          <div className={styles.header}>
            <h1 className={styles.heading}>Image Gallery</h1>
            <button className=" btn " onClick={handleClick}>
              Log out
            </button>
          </div>

          <div className={styles.search}>
            <SearchBar />
          </div>
        </div>
      </div>
      <ImageGallery />
    </>
  );
};

export default Home;
