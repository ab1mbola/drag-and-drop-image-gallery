import { useContext, useState, useEffect } from "react";
import styles from "./ImageGallery.module.css";
import Images from "../image/Image";
import { ImageContext } from "../../App";
import Skeleton from "../skeleton/Skeleton";

const ImageGallery = () => {
  const { response, isLoading, searchImage } = useContext(ImageContext);
  const [data, setData] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [touchStartIndex, setTouchStartIndex] = useState(null);
  const [draggingStyle, setDraggingStyle] = useState(null); // Track the style of the dragged image

  // Synchronize `data` with `response`
  useEffect(() => {
    setData(response || []); // Default to an empty array if response is undefined
  }, [response]);

  const handleDragStart = (index) => {
    setDraggedIndex(index); // Store the index of the dragged item
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow dropping by preventing the default behavior
  };

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const updatedData = [...data];
    const [movedImage] = updatedData.splice(draggedIndex, 1); // Remove the dragged image
    updatedData.splice(index, 0, movedImage); // Insert it at the new position
    setData(updatedData); // Update the state with the new order
    setDraggedIndex(null); // Reset the dragged index
  };

  const handleTouchStart = (index, e) => {
    setTouchStartIndex(index); // Store the index of the touched item
    const touch = e.touches[0];
    setDraggingStyle({
      position: "absolute",
      top: `${touch.clientY}px`,
      left: `${touch.clientX}px`,
      pointerEvents: "none",
      zIndex: 1000,
    });
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent scrolling while dragging
    const touch = e.touches[0];
    setDraggingStyle((prevStyle) => ({
      ...prevStyle,
      top: `${touch.clientY}px`,
      left: `${touch.clientX}px`,
    }));
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropIndex = parseInt(element?.dataset?.index, 10); // Get the drop target's index

    if (
      !isNaN(dropIndex) &&
      touchStartIndex !== null &&
      touchStartIndex !== dropIndex
    ) {
      const updatedData = [...data];
      const [movedImage] = updatedData.splice(touchStartIndex, 1); // Remove the touched image
      updatedData.splice(dropIndex, 0, movedImage); // Insert it at the new position
      setData(updatedData); // Update the state with the new order
    }
    setTouchStartIndex(null); // Reset the touch start index
    setDraggingStyle(null); // Reset the dragging style
  };

  return (
    <div>
      <div>
        <h1>
          {isLoading ? (
            "Loading..."
          ) : data.length === 0 ? (
            <>
              No results found for:{" "}
              <span style={{ color: "red" }}>{searchImage || "Art"}</span>
            </>
          ) : (
            <>
              Results for:{" "}
              <span style={{ color: "red" }}>{searchImage || "Art"}</span>
            </>
          )}
        </h1>
      </div>
      <div className={styles.grid}>
        {isLoading ? (
          <Skeleton item={10} />
        ) : (
          data.map((item, index) => (
            <div
              key={item.id}
              className={styles.imageWrapper}
              draggable
              onDragStart={() => handleDragStart(index)} // Desktop drag start
              onDragOver={handleDragOver} // Desktop drag over
              onDrop={() => handleDrop(index)} // Desktop drop
              onTouchStart={(e) => handleTouchStart(index, e)} // Mobile touch start
              onTouchMove={handleTouchMove} // Mobile touch move
              onTouchEnd={handleTouchEnd} // Mobile touch end
              data-index={index} // Used to identify the drop target on mobile
            >
              <Images data={item} />
            </div>
          ))
        )}
      </div>
      {draggingStyle && (
        <div style={draggingStyle} className={styles.draggingImage}>
          <Images data={data[touchStartIndex]} />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
