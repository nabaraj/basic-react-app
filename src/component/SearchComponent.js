import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SearchComponent() {
  const [filter, setFilter] = useState({}); //filter
  const [data, setData] = useState([]);
  const [apiStatus, setApiStatus] = useState("loading");
  const [text, setText] = useState([]);

  /**
   * initial api call
   */
  useEffect(() => {
    getApiData(); //api call
  }, []);

  /**
   * check text change and call filter debounce
   */
  useEffect(() => {
    processChange();
  }, [text]);

  /**
   * handling api call
   */
  const getApiData = () => {
    setApiStatus("loading");
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        // console.log(res.data);
        setApiStatus("loaded");
        setData(res.data);
      })
      .catch((error) => {
        setApiStatus("error");
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };
  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const processChange = debounce(() => filterData(), 1000);
  const filterData = () => {
    console.log("filter data");
    let filterState = { ...filter };
    if (text.length < 3) {
      setFilter({});
    } else {
      if (!filterState[text]) {
        let filteredData = data.filter((item) => {
          console.log("inside filter");
          return item.title.toLowerCase().includes(text.toLowerCase());
        });
        filterState[text] = filteredData;
        setFilter(filterState);
      }
    }
  };

  return (
    <div>
      {apiStatus === "loading" && <div>Loading..</div>}
      {apiStatus === "error" && <div>Error in api fetch</div>}
      {apiStatus === "loaded" && (
        <>
          <input
            type='text'
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder='Enter text to filter result'
          />
          {filter[text] && filter[text].length > 0 ? (
            <ul className='results'>
              {filter[text].map((item) => {
                return <li key={item.id}>{item.title}</li>;
              })}
            </ul>
          ) : (
            <p>No Results Found</p>
          )}
        </>
      )}
    </div>
  );
}
