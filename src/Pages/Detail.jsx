import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Footer from "../component/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getPostDetails } from "../Redux/Actions/postActions";


function Detail(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const {postDetails} = useSelector((state) => state.post)
    
    useEffect(() => {
    dispatch(getPostDetails(id))
    }, [dispatch, id]);
    
return(
  <>
    <div className="wrapper">
         <img src={`https://image.tmdb.org/t/p/original/${postDetails?.backdrop_path}`} alt="" className='image-detail'/>
        <div className="card-detail m-5">
  <div className="row g-0">
    <div className="col-md-2">
      <img src={`https://image.tmdb.org/t/p/w200${postDetails?.poster_path}`}  className="img-fluid rounded-start border border-danger-subtle" alt="..." />
    </div>
    <div className="col-md">
      <div className="card-body">
        <h1 className="card-title">{postDetails?.original_title}</h1>
        <p className="card-text">{postDetails?.overview}</p>
        <p className="card-text">Score : {postDetails?.vote_average.toFixed(1)}</p>
        <p className="card-text">Tagline : {postDetails?.tagline}</p>
        <p className="card-text">Site : <a href={postDetails?.homepage}>{postDetails?.homepage}</a></p>
        <p className="card-text">Popularity : {postDetails?.popularity}</p>
        <p className="card-text">Budget : ${postDetails?.budget}</p>
        <p className="card-text">Revenue : ${postDetails?.revenue}</p>
        <p className="card-text"><small className="">Release Date : {postDetails?.release_date}</small></p>
      </div>
    </div>
  </div>
  <Link to={`/`}><button type="button" className="btn btn-success">Back to Home</button></Link>
</div>
    </div>
    <Footer></Footer>
    </>
)
}

export default Detail