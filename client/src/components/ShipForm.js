import React, { Component } from "react";

class ShipForm extends Component {
  render() {
    return (
      <form className="ui large form">
        <h2>Checkout Order</h2>
        <div className="ui divider"></div>
        <div className="field">
          <label>Name</label>
          <div className="two fields">
            <div className="field">
              <input
                type="text"
                name="shipping[first-name]"
                placeholder="First Name"
              />
            </div>
            <div className="field">
              <input
                type="text"
                name="shipping[last-name]"
                placeholder="Last Name"
              />
            </div>
          </div>
        </div>
        <div className="field">
          <label>Billing Address</label>
          <div className="fields">
            <div className="twelve wide field">
              <input
                type="text"
                name="shipping[address]"
                placeholder="Street Address"
              />
            </div>
            <div className="four wide field">
              <input
                type="text"
                name="shipping[address-2]"
                placeholder="Apt #"
              />
            </div>
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>State</label>
            <select className="ui fluid dropdown">
              <option value="">State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
          <div className="disabled field">
            <label>Country</label>
            <input
              placeholder="United States"
              type="text"
              disabled=""
              tabindex="-1"
            />
          </div>
        </div>
        {/* <h4 class="ui dividing header">Billing Information</h4>
        <div class="field">
          <label>Card Type</label>
          <div class="ui selection dropdown">
            <input type="hidden" name="card[type]" />
            <div class="default text">Type</div>
            <i class="dropdown icon"></i>
            <div class="menu">
              <div class="item" data-value="visa">
                <i class="visa icon"></i>
                Visa
              </div>
              <div class="item" data-value="amex">
                <i class="amex icon"></i>
                American Express
              </div>
              <div class="item" data-value="discover">
                <i class="discover icon"></i>
                Discover
              </div>
            </div>
          </div>
        </div>
        <div class="fields">
          <div class="seven wide field">
            <label>Card Number</label>
            <input
              type="text"
              name="card[number]"
              maxlength="16"
              placeholder="Card #"
            />
          </div>
          <div class="three wide field">
            <label>CVC</label>
            <input
              type="text"
              name="card[cvc]"
              maxlength="3"
              placeholder="CVC"
            />
          </div>
          <div class="six wide field">
            <label>Expiration</label>
            <div class="two fields">
              <div class="field">
                <select
                  class="ui fluid search dropdown"
                  name="card[expire-month]"
                >
                  <option value="">Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div class="field">
                <input
                  type="text"
                  name="card[expire-year]"
                  maxlength="4"
                  placeholder="Year"
                />
              </div>
            </div>
          </div>
        </div>
        <h4 class="ui dividing header">Receipt</h4>
        <div class="field">
          <label>Send Receipt To:</label>
          <div class="ui fluid multiple search selection dropdown">
            <input type="hidden" name="receipt" />
            <i class="dropdown icon"></i>
            <div class="default text">Saved Contacts</div>
            <div class="menu">
              <div class="item" data-value="jenny" data-text="Jenny">
                <img
                  class="ui mini avatar image"
                  src="/images/avatar/small/jenny.jpg"
                />
                Jenny Hess
              </div>
              <div class="item" data-value="elliot" data-text="Elliot">
                <img
                  class="ui mini avatar image"
                  src="/images/avatar/small/elliot.jpg"
                />
                Elliot Fu
              </div>
              <div class="item" data-value="stevie" data-text="Stevie">
                <img
                  class="ui mini avatar image"
                  src="/images/avatar/small/stevie.jpg"
                />
                Stevie Feliciano
              </div>
              <div class="item" data-value="christian" data-text="Christian">
                <img
                  class="ui mini avatar image"
                  src="/images/avatar/small/christian.jpg"
                />
                Christian
              </div>
              <div class="item" data-value="matt" data-text="Matt">
                <img
                  class="ui mini avatar image"
                  src="/images/avatar/small/matt.jpg"
                />
                Matt
              </div>
              <div class="item" data-value="justen" data-text="Justen">
                <img
                  class="ui mini avatar image"
                  src="/images/avatar/small/justen.jpg"
                />
                Justen Kitsune
              </div>
            </div>
          </div>
        </div>
        <div class="ui segment">
          <div class="field">
            <div class="ui toggle checkbox">
              <input type="checkbox" name="gift" tabindex="0" class="hidden" />
              <label>Do not include a receipt in the package</label>
            </div>
          </div>
        </div>
        <div class="ui button" tabindex="0">
          Submit Order
        </div> */}
      </form>
    );
  }
}

export default ShipForm;
