import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function CardMovie({ filteredMovies }) {
  return (
    <>
      <h2 className="text-center">Popular Movies</h2>
      <div className="movie-container d-flex flex-wrap m-5">
        {filteredMovies &&
          filteredMovies.map((post, index) => (
            <Card
              key={index}
              variant="secondary"
              className="bg-danger mx-4 mb-2"
              style={{ width: "18rem" }}
            >
              <Card.Img />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <img
                  src={`https://image.tmdb.org/t/p/w200${post.poster_path}`}
                  alt=""
                />
                <Link to={`/detail/${post.id}`}>
                  {" "}
                  <Button variant="primary">Detail</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
      </div>
    </>
  );
}
