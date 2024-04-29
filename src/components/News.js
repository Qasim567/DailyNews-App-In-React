import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 15,
      totalResult: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - DailyNews`;
  }

  fetchNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let jsonData = await data.json();
    this.setState({
      articles: jsonData.articles,
      totalResult: jsonData.totalResult,
      loading: false,
    });
  };

  async componentDidMount() {
    await this.fetchNews();
  }

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.fetchNews();
  // };

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.fetchNews();
  // };

  fetchMoreData=async()=>{
    this.setState({page: this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b52ae9ac26fd460fb97cd2b3931b21d9&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let jsonData = await data.json();
    this.setState({
      articles: this.state.articles.concat(jsonData.articles),
      totalResult: jsonData.totalResult,
      loading: false,
    });
  }

  render() {
    const { articles, page } = this.state;

    return (
      <div className="container my-3">
        <h2 className="text-center">DailyNews - TopHeadings</h2>
        <InfiniteScroll
    dataLength={this.state.articles.length}
    next={this.fetchMoreData}
    hasMore={this.state.articles.length !== this.state.totalResult}
    loader={this.state.articles.length<this.state.totalResult?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:
    <h4 style={{ textAlign: 'center' }}>Yay! You have seen it all</h4>}
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
            onClick={this.handlePrevClick}
            disabled={page <= 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={articles.length < 1}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
