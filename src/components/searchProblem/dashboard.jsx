/* eslint-disable react/prop-types */
import "./Information.css";

export default function Information({ data, show }) {
  if (!data) return null;

  return (
    <div className="recipe-container" onClick={() => show(false)}>
      <img className="recipe-image" src={data.image} alt={data.name} />

      <div className="recipe-content">
        <h1 className="recipe-title">{data.name}</h1>
        <p className="recipe-meta">
          <span className="recipe-cuisine">{data.cuisine}</span> |
          <span className="recipe-difficulty"> {data.difficulty}</span> |
          <span className="recipe-rating">
            ⭐ {data.rating} ({data.reviewCount} reviews)
          </span>
        </p>

        <div className="recipe-section">
          <h2>Ingredients</h2>
          <ul>
            {data.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-section">
          <h2>Instructions</h2>
          <ol>
            {data.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="recipe-info">
          <p>
            <strong>Prep Time:</strong> {data.prepTimeMinutes} mins
          </p>
          <p>
            <strong>Cook Time:</strong> {data.cookTimeMinutes} mins
          </p>
          <p>
            <strong>Servings:</strong> {data.servings}
          </p>
          <p>
            <strong>Calories per Serving:</strong> {data.caloriesPerServing}
          </p>
        </div>
      </div>
    </div>
  );
}
