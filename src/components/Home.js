import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://apitest.reachstar.io/blog/list")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); 

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12">
            {data.map((item, index) => (
              <div className="card mb-5" key={index}>
                <div className="card-header">
                  <h3 className="card-title">LITTLE PRINCE</h3>
                </div>
                <div className="card-body">
                  <p> The Little Prince (French: Le Petit Prince, pronounced [lə p(ə)ti pʁɛ̃s]) is a novella written and illustrated by French writer and military pilot Antoine de Saint-Exupéry. It was first published in English and French in the United States by Reynal & Hitchcock in April 1943 and was published posthumously in France following liberation; Saint-Exupéry's works had been banned by the Vichy Regime. The story follows a young prince who visits various planets, including Earth, and addresses themes of loneliness, friendship, love, and loss. Despite its style as a children's book, The Little Prince makes observations about life, adults, and human nature.[9]

The Little Prince became Saint-Exupéry's most successful work, selling an estimated 140 million copies worldwide, which makes it one of the best-selling in history.[10][11][12][Note 2][14] The book has been translated into over 505 different languages and dialects worldwide, being the second most translated work ever published, trailing only the Bible.[15][16][17] The Little Prince has been adapted to numerous art forms and media, including audio recordings, radio plays, live stage, film, television, ballet, and opera.[16][18]</p>
                </div>
                <div className="card-footer">
                  <Link to={`/detail/${item.id}`} className="btn btn-success">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
