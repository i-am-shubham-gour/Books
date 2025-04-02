import { CircularProgress, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Back from "../../assets/icons/Back.svg";
import Search from "../../assets/icons/Search.svg";
import axiosInstance from "../../utils/axiosConfig";
import { Card } from "./card/card";
import "./dashboardDetail.scss";

export const DashboardDetail = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [isMore, setIsMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const location = useLocation();
  const { category } = location?.state || {};
  const [loading, setLoading] = useState(true);
  const loader = useRef(null);
  const navigate = useNavigate();

  const fetchBooks = async (url) => {
    try {
      const response = await axiosInstance.get(url);
      setBooks((prevBooks) => [...prevBooks, ...response.data.results]);
      setIsMore(response.data.next !== null);
    } catch (error) {
      console.error("Error while fetching book", error);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const callApi = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `books?category=${category}&page=1`,
          { signal }
        );
        setBooks((prevBooks) => [...prevBooks, ...response.data.results]);
        setIsMore(response.data.next !== null);
        setInitialLoad(false);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setLoading(false);
        console.error("Error fetching books:", error);
        setBooks([]);
        setInitialLoad(false);
      }
    };

    callApi();

    return () => {
      abortController.abort();
    };
  }, [category]);

  const handleSearch = useCallback(
    async (value) => {
      setLoading(true);
      try {
        const encodeValue = encodeURIComponent(value.trim());
        const response = await axiosInstance.get(
          `books?category=${category}&search=${encodeValue}&page=1`
        );
        setBooks(response.data.results);
        setIsMore(response.data.next !== null);
        setInitialLoad(false);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setLoading(false);
        console.error("Error fetching books:", error);
        setBooks([]);
        setInitialLoad(false);
      }
    },
    [category]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounce = useCallback(
    _.debounce((value) => handleSearch(value), 1000),
    [handleSearch]
  );

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && isMore && !initialLoad) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [isMore, initialLoad]
  );

  useEffect(() => {
    if (page > 1) {
      fetchBooks(`books?category=${category}&page=${page}`);
    }
  }, [category, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const handleNewTab = (book) => {
    const htmlUrl = book?.formats["text/html"];
    const plainTextUrl = book?.formats["text/plain"];
    const asciText = book?.formats["text/plain; charset=us-ascii"];
    if (htmlUrl) {
      window.open(htmlUrl, "_blank");
    } else if (plainTextUrl) {
      window.open(plainTextUrl, "_blank");
    } else if (asciText) {
      window.open(asciText, "_blank");
    } else {
      alert("No viewable version available.");
    }
  };

  return (
    <div className="details-container">
      <div className="details-header">
        <div className="btn-with-header">
          <img
            src={Back}
            alt="back-button"
            className="back-btn"
            onClick={() => {
              navigate("/dashboard", { replace: true });
            }}
          />
          <span className="title">Fiction</span>
        </div>
        <div className="search-box">
          <TextField
            className="search-field"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
              debounce(e.target.value);
            }}
            value={search}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={Search}
                      alt="search-icon"
                      className="search-icon"
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
      </div>
      {loading ? (
        <div className="loader">
          <CircularProgress size={30} />
        </div>
      ) : !loading && books.length > 0 ? (
        <div className="details-content">
          {books.map((book) => (
            <Card
              key={book.id}
              image={book?.formats["image/jpeg"]}
              author={book?.authors?.[0]?.name}
              title={book.title}
              onClick={() => {
                handleNewTab(book);
              }}
            />
          ))}
          {isMore && (
            <div ref={loader} className="loading-indicator">
              <CircularProgress size={30} />
            </div>
          )}
        </div>
      ) : (
        books.length === 0 && <div className="no-data">No Data Available</div>
      )}
    </div>
  );
};
