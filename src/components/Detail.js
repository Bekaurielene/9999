import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Detail() {
  const [data, setData] = useState({ title: '', description: '', comments: [] });
  const [newComment, setNewComment] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://apitest.reachstar.io/blog/get/${id}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`https://apitest.reachstar.io/blog/edit/${id}`, data)
        .then((response) => {
          alert('Blog updated successfully');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(`https://apitest.reachstar.io/blog/add`, data)
        .then((response) => {
          alert('Blog created successfully');
          navigate(`/detail/${response.data.id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDelete = () => {
    if (id) {
      axios
        .delete(`https://apitest.reachstar.io/blog/delete/${id}`)
        .then((response) => {
          alert('Blog deleted successfully');
          navigate('/home');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      axios
        .post(`https://apitest.reachstar.io/comment/add/${id}`, { comment: newComment })
        .then((response) => {
          setData((prevData) => ({
            ...prevData,
            comments: [...prevData.comments, response.data],
          }));
          setNewComment('');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCommentDelete = (commentId) => {
    axios
      .delete(`https://apitest.reachstar.io/comment/delete/${commentId}`)
      .then(() => {
        setData((prevData) => ({
          ...prevData,
          comments: prevData.comments.filter(comment => comment.id !== commentId),
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card mb-5">
            <div className="card-header">
              <h3 className="card-title">PLOT</h3>
            </div>
            <div className="card-body">
              <p>As a test to determine if grownups are as enlightened as a child, the narrator shows them a picture depicting a boa constrictor that has eaten an elephant. The adults always reply that the picture depicts a hat, and so he knows to only talk of "reasonable" things to them, rather than the fanciful.

The narrator becomes an aircraft pilot, and one day, his plane crashes in the Sahara desert, far from civilization. The narrator must fix his aeroplane before his supply of water runs out. Here, he is greeted by a young boy nicknamed "the little prince."

The prince asks the narrator to draw a sheep. The narrator first shows him the picture of the elephant inside the snake, which, to the narrator's surprise, the prince interprets correctly. After three failed attempts at drawing a sheep, the frustrated narrator draws a crate, claiming the sheep is inside. This turns out to be the exact drawing the prince wanted.

Over the course of days, while the narrator attempts to repair his plane, the prince recounts his life story. He used to live on a house-sized asteroid known as "B 612" on Earth. The asteroid has three minuscule volcanoes (two active, and one dormant or extinct) and various plants.</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">{id ? 'Edit Blog' : 'Create Blog'}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="5"
                    value={data.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  {id ? 'Update' : 'Create'}
                </button>
                {id && (
                  <button type="button" className="btn btn-danger mt-3 ml-3" onClick={handleDelete}>
                    Delete
                  </button>
                )}
              </form>
            </div>
            <div className="card-footer">
              <h4>Comments</h4>
              {data.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p>{comment.comment}</p>
                  <button onClick={() => handleCommentDelete(comment.id)} className="btn btn-danger btn-sm">Delete</button>
                </div>
              ))}
              <form onSubmit={handleCommentSubmit}>
                <div className="form-group mt-3">
                  <label htmlFor="newComment">Add Comment</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newComment"
                    value={newComment}
                    onChange={handleCommentChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Post Comment</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
