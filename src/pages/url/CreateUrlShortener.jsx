import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import urlService from "../../services/urlService.js";
import "../../styles/url/createIUrlShortener.css";

function CreateUrlShortener() {
  const [urlData, setUrlData] = useState({
    url: "",
    shortUrl: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShorteren = async (e) => {

    e.preventDefault();

    console.log(urlData);

    const response = urlService.createUrl(urlData);

    if (response) {
      setUrlData({
        url: "",
        shortUrl: "",
      });

      navigate("/viewUrl");

      window.location.reload();
    }
  };

  return (
    <div className="createUrl-container">
      <form onSubmit={handleShorteren}>
        <h1>Create Url</h1>

        <div className="url">
          <label htmlFor="url">URL : </label>
          <input
            className="urlInput"
            type="text"
            name="url"
            id="url"
            value={urlData.url}
            onChange={(e) => setUrlData({ ...urlData, url: e.target.value })}
            required
          />
        </div>

        <div className="shortUrl">
          <label htmlFor="shortUrl">Short Url : </label>
          <input
            className="shortUrlInput"
            type="text"
            name="shortUrl"
            id="shortUrl"
            value={urlData.shortUrl}
            onChange={(e) =>
              setUrlData({ ...urlData, shortUrl: e.target.value })
            }
            required
          />
        </div>

        <button
          className="btn btn-success btn-outline-dark mt-3 text-white text-uppercase font-weight-bold"
          type="submit"
        >
          Create Short URL
        </button>
      </form>
    </div>
  );
}

export default CreateUrlShortener;
