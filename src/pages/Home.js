import React from "react";

// import Row from "../components/Row";
import RowSlider from "../components/RowSlider";
import LargeRowSlider from "../components/LargeRowSlider";
import Banner from "../components/Banner";
import requests from "../requests";

const Home = (props) => {
  return (
    <div className="app">
      <Banner onShow={props.onShow} onHide={props.onHide} />
      <LargeRowSlider
        title="NETFLEX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <RowSlider title="Trending Now" fetchUrl={requests.fetchTrending} />
      <RowSlider title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <RowSlider title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <RowSlider title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <RowSlider title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <RowSlider
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <RowSlider
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaryMovies}
        isLast
      />
    </div>
  );
};

export default Home;
