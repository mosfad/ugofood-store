import React, { Component } from "react";
import { Rating } from "semantic-ui-react";
import "./productStyles.css";
class ProductDetail extends Component {
  // trialInfo = [{

  //     id: 1000,
  //     name: "Jollof Rice",
  //     url: "https://picsum.photos/200/200?grayscale",
  //     price: "$12.00",
  //     description:
  //       "Yummy Jollof rice made with chicken and fried plantains is so nutritious and delicious.",
  //   },
  //   {
  //     id: 1001,
  //     name: "Esiewu",
  //     url: "https://picsum.photos/200/200?grayscale",
  //     price: "$10.00",
  //     description: "Tasty goat meat cooked in a spicy and tasty sauce",
  //   },
  // ];
  handleSampeRequest = () => {
    //
  };

  handleFeedbackRequest = () => {
    //
  };
  render() {
    return (
      <div className="ui internally celled grid product-detail">
        <div className="centered row">
          <div className="five wide column">
            <img
              className="productdetail-img"
              src="https://picsum.photos/500/500?grayscale"
            />
            <h3>Jollof Rice</h3>
            <div className="content">
              <div className="description">pppppppppppppppppp</div>
              {/* <div className="extra">Reviews</div> */}

              <div className="extra product-btn">
                <button className="ui button teal">Get Sample</button>
                <button className="ui button">Feedback</button>
              </div>

              <div className="extra">
                Ratings: &nbsp;
                <Rating rating={4} maxRating={5} />
              </div>
            </div>
            <div class="ui star rating" data-rating="3"></div>
          </div>
          <div className="five wide column">
            <img src="https://picsum.photos/200/200?grayscale" />
          </div>
          <div className="five wide column">
            <img src="https://picsum.photos/200/200?grayscale" />
          </div>
        </div>
        <div className="centered row">
          <div className="five wide column">
            <img src="https://picsum.photos/200/200?grayscale" />
          </div>
          <div className="five wide column">
            <img src="https://picsum.photos/200/200?grayscale" />
          </div>
          <div className="five wide column">
            <img src="https://picsum.photos/200/200?grayscale" />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
