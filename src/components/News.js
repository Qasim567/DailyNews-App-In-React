import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{

  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResult, settotalResult] = useState(0)
  // document.title = `${capitalizeFirstLetter(props.category)} - DailyNews`;

  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    let jsonData = await data.json();
    setarticles(jsonData.articles)
    settotalResult(jsonData.totalResult)
    setloading(false)
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - DailyNews`;
    fetchNews()
  }, [])

  // handleNextClick = async () => {
  //   setpage(page+1)
  //   fetchNews();
  // };

  // handlePrevClick = async () => {
  //   setpage(page-1)
  //  fetchNews();
  // };

  const fetchMoreData=async()=>{
    setpage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b52ae9ac26fd460fb97cd2b3931b21d9&page=${page}&pageSize=${props.pageSize}`;
    // setloading(true)
    let data = await fetch(url);
    let jsonData = await data.json();
    setarticles(articles.concat(jsonData.articles))
    settotalResult(jsonData.totalResult)
  }
    return (
      <div className="container my-3">
        <h2 className="text-center">DailyNews - Top {capitalizeFirstLetter(props.category)} Headings</h2>
        <InfiniteScroll
    dataLength={articles.length}
    next={fetchMoreData}
    hasMore={articles.length !== totalResult}
    loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
  >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 75)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-3">
          <button
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
            disabled={page <= 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
            disabled={articles.length < 1}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  
}

News.defaultProps = {
  country: "in",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};


export default News;
