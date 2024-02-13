import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PageNavigation from "../../components/PageNavigation";
import { Container } from "../../styles/Container";


const API_ENDPOINT = "https://localhost:7254";

const SingleActivity = () => {
  const { id } = useParams();
  const [singleActivity, setSingleActivity] = useState(null);
  const [isSingleLoading, setIsSingleLoading] = useState(true);

  useEffect(() => {
    const fetchSingleActivity = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/Activity/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSingleActivity(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsSingleLoading(false);
      }
    };

    fetchSingleActivity();
  }, [id]);

  if (isSingleLoading) {
    return <div className="page_loading">Loading.....</div>;
  }

  return (
    <Wrapper>
      <PageNavigation title={singleActivity.activity_Name} />
      <Container className="container">
        <div className="grid grid-two-column">
          {/* activity Images  */}
          <div className="activity_images">
            {/* ... (existing code) */}
          </div>

          {/* activity data  */}
          <div className="activity-data">
            <h2>{singleActivity.activity_Name}</h2>

            <p className="activity-data-price">
              MRP:
              <del>{singleActivity.price + 250000}</del>
            </p>
            <p className="activity-data-price activity-data-real-price">
              Deal of the Day: {singleActivity.price}
            </p>
            <p>{singleActivity.activity_Desc}</p>

            <div className="activity-data-info">
              <p>
                Available:
                <span> {singleActivity.stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              <p>
                ID : <span> {singleActivity.id} </span>
              </p>
              <p>
                Brand :<span> {singleActivity.company} </span>
              </p>
            </div>
            <hr />
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }

  .activity_images {
    display: flex;
    align-items: center;
  }

  .activity-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .activity-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .activity-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .activity-data-price {
      font-weight: bold;
    }
    .activity-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .activity-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .activity-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleActivity;