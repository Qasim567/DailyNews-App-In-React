import React from "react";

const NewsItem=(props)=>{
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="card my-3" style={{ width: "18rem" }}>
        <img
          src={
            !imageUrl
              ? "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1997940714.jpg?c=16x9&q=w_800,c_fill"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
            {source}
          </span>
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsUrl} className="btn btn-dark btn-sm">
            Read More
          </a>
        </div>
      </div>
    );
}

export default NewsItem;
