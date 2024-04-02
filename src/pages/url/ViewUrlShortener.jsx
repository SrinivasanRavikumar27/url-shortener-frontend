import React, { useEffect, useState } from 'react';
import urlService from '../../services/urlService';
import '../../styles/url/viewUrlShortener.css';

function ViewUrlShortener() {

  const [urlData,setUrlData] = useState([]);

  useEffect( () => {

urlService.getAllUrls().then( (data) => {
  setUrlData(data);
} ).catch( (err) => {
  console.log('error while gettng urls',err);
});

  },[]);

  const handleShortUrl = async (e, url) => {
    
    e.preventDefault();

   const response = await urlService.getShortUrl(url);

   if(response){
    window.open(response, '_blank');
   }

  //  refresh page
  window.location.reload();
    
  };


  return (
    <div>
        <h1>All Shortened URLs</h1>
        <br/>
      {
        urlData == null || urlData == undefined ? (
setUrlData([])
        ) : (
          
           urlData.length  > 0  ? (

            <div className="table-container" >

            <table className="url-table">

        <thead>

          <tr>
            <th style={{ width: '15%' }}>UrlID</th>
            <th style={{ width: '40%' }}>Url</th>
            <th style={{ width: '30%' }}>ShortUrl</th>
            <th style={{ width: '10%' }}>Clicks</th>
          </tr>

        </thead>

        <tbody>

          {urlData.map(data => (

            <tr key={data.urlid}>

              <td  >{data.urlid}</td>

              <td  >
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.url}
                </a>
              </td>

              <td  >
              <a
              className='active cursor-pointer'
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => handleShortUrl(e, data.shortUrl)}
                >
                  {data.shortUrl}
                </a>
              </td>

              <td  >{data.clicks}</td>

            </tr>

          ))}

        </tbody>

      </table>
      
</div>

) : (
<p>No URLS yet</p>
)
          
        )
      }
    </div>
  )
}

export default ViewUrlShortener;