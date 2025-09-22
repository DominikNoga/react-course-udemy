import { API_URL } from "../const/const";

export default function ImagePicker({ images, selectedImage, onSelect }) {
  return (
    <div id="image-picker">
      <p>Select an image</p>
      { images.length === 0 && <p>No images found.</p> }
      { images.length > 0 &&
        <ul>
          {images.map((image) => (
            <li
              key={image.path}
              onClick={() => onSelect(image.path)}
              className={selectedImage === image.path ? 'selected' : undefined}
            >
              <img
                src={`${API_URL}/${image.path}`}
                alt={image.caption}
              />
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
