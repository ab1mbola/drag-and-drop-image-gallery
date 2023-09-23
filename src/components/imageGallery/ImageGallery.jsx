import { useContext, useState } from "react";
import styles from "./ImageGallery.module.css";
import Images from "../image/Image";
import { ImageContext } from "../../App";
import Skeleton from "../skeleton/Skeleton";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ImageGallery = () => {
  const { response, isLoading, searchImage } = useContext(ImageContext);
  const [data, setData] = useState(response);

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const draggableImages = [...data];

    const [reorderedImages] = draggableImages.splice(result.source.index, 1);

    draggableImages.splice(result.destination.index, 0, reorderedImages);

    setData(draggableImages);
  };

  return (
    <div>
      <div>
        <h1>
          Results for:{" "}
          <span style={{ color: "red" }}>{searchImage || "Art"}</span>
        </h1>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="grid">
          {(provided) => (
            <div
              className={styles.grid}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {isLoading ? (
                <Skeleton item={10} />
              ) : (
                response.map((data, key) => (
                  <Draggable
                    key={data.id}
                    draggableId={data.id.toString()}
                    index={key}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Images key={key} data={data} />
                        {/* <img
                          key={key}
                          className={styles.img}
                          src={data.urls.small}
                          alt={data.alt_description}
                        /> */}
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageGallery;
