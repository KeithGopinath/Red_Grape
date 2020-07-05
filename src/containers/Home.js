/* eslint-disable object-curly-newline */
/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { jsx, css } from '@emotion/core';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import { HeaderText, CaseOptions, OptionButtons, Step, Alert, Footer, Side, Case } from '../components/emotion';
import { Buttons } from '../utils/utils';
import { getOffers, getZipcode } from '../actionCreators/Redgrape';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reds: false,
      whites: true,
      mixed: true,
      zipcodeError: true,
      product: '',
    };
  }

  componentDidMount() {
    this.props.getOffers();
  }

  caseOption = (obj) => {
    const { button } = obj;
    if (button === 'Reds') {
      this.setState({ reds: false, whites: true, mixed: true });
    } else if (button === 'Whites') {
      this.setState({ reds: true, whites: false, mixed: true });
    } else {
      this.setState({ reds: true, whites: true, mixed: false });
    }
  }

  zipCode = (zip) => {
    const zipCode = zip.target.value;
    if (zipCode.length === 5) {
      this.setState({ zipcodeError: false });
      this.props.getZipcode(zipCode);
    } else {
      this.setState({ zipcodeError: true });
    }
  }

  onChangeValue = (event) => {
    const id = event.target.value;
    this.setState({ product: id });
  }

  render() {
    const { reds, whites, mixed, zipcodeError } = this.state;
    const { mainItems } = this.props.offers;
    const { city, stateName } = this.props.zipcode;
    const details = !Object.keys(this.props.zipcode).length;
    const redsimage = classNames({ 'hide-image': reds });
    const whitesimage = classNames({ 'hide-image': whites });
    const mixedimage = classNames({ 'hide-image': mixed });
    const addressDetails = classNames({ 'hide-image': details });
    const address = !zipcodeError ? <i className={addressDetails} css={css`font-style: normal`}>{`${city},${stateName}`}</i> : <i css={css`color: red`}>Enter ZIP to populate City and State</i>;

    return (
      <div id="page-container" className="container" css={css`max-width: 900px`}>
        <div id="header-container" className="header" >
          <div>
            <div id="header-logo" className="col-xs-5" css={css`padding: 20px 10px`}>
              <a href="https://www.wsjwine.com/jsp/homepage.jsp">
                <img src="images/wsj_logo.png" alt="WSJwine from The Wall Street Journal" />
              </a>
            </div>
            <div id="header-text" className="col-xs-7" css={HeaderText}>
              <h3 css={css`font-weight: 700`}>Special Welcome Offer</h3>
            </div>
          </div>
          <div id="image-container" className="image">
            <img className={redsimage} src="images/reds.jpg" alt="reds" />
            <img className={whitesimage} src="images/whites.jpg" alt="whites" />
            <img className={mixedimage} src="images/mixed.jpg" alt="mixed" />
          </div>
          <div>
            <p css={CaseOptions}>Your Case Options</p>
            <div css={css`float: right`}>
              {Buttons.map((obj) => <Button id="buttons" value={obj.button} type="submit" className="btn-lg" css={OptionButtons} onClick={() => this.caseOption(obj)}>{obj.button}</Button>)}
            </div>
          </div>
        </div>
        <div id="content-container" className="content" css={css`margin-top: 7em`} >
          <div id="main-content" css={css`border-right: 1px solid #999`} className="col-md-7 col-sm-7 col-xs-12" >
            <div className="section1">
              <h4 css={css`color: #d7182a; font-weight: 700`}> These are the dozen wines you need to taste …</h4>
              <p>Many of our Top 12 wines have won major awards. Others have been recorded as a favorite by thousands of wine
              fans online. You&quot;ll uncork them all for ONLY $69.99 as your introduction to the WSJwine Discovery Club.
              </p>
              <p> <strong>It gets better</strong>… you&quot;ll also enjoy two bottles of double-gold, &quot;Best-of-Class&quot;
            Cabernet<i>(New Orleans International Wine Awards)</i> from iconic Napa estate Raymond Vineyards, plus a
            pair of fine, stemless glasses (worth $68.97).
              </p>
              <p><strong>The rewards continue</strong> … Discovery Club members earn credits for free bottles, upgrades
            to a 1.5-liter magnum and a luxury bottle (worth $40+), plus exclusive offers throughout the year.
              </p>
            </div>
            <div className="section2" css={css`margin-top: 3em`}>
              <h4 css={Step}><span css={css`color: grey; font-weight: 700;`}>STEP 1:</span> Which Case Would You Like?</h4>
              <p>Whatever you choose, we&quot;ll add in 2 BONUS, double-gold-medal Cabs and 2 stemless glasses. The complete
              package—worth over $275—is yours for ONLY $69.99 (plus $19.99 shipping & applicable tax).
              </p>
              {mainItems && mainItems.map((obj) => (obj.product.skus.map((skus) => <label onChange={this.onChangeValue} htmlFor="wines"><input type="radio" value={obj.product.id} checked={this.state.product === `${obj.product.id}`} /><p css={Case}>{obj.product.name}, Total {skus.numberOfBottles} Bottles @ JUST ${obj.listPrice}</p></label>)))}
            </div>
            <div className="section3">
              <h4 css={Step}><span css={css`color: grey; font-weight: 700;`}>STEP 2:</span> Shipping Details</h4>
              <label><input type="text" maxLength="5" onChange={this.zipCode} /> {address}</label>
              {(!city && !zipcodeError) && <label css={Alert}>Please enter a valid zip code and try again.</label>}
            </div>
          </div>
          <div id="side-content" className="col-md-5 col-sm-5">
            <h2 css={Side}>As Featured In</h2>
            <img css={css`margin: 2em 0 0 3em`} src="images/featured.gif" alt="featured" />
            <img css={css`margin: 4em 0 0 6em`} src="images/guarantee.gif" alt="guarantee" />
          </div>
        </div>
        <div id="footer-container" className="footer col-lg-12 col-md-12 col-sm-12 col-xs-12" css={Footer} >
          <p>WSJwine is operated independently of The Wall Street Journal&quot;s news department.</p>
          <div className="col-xs-7 col-sm-8 ">
            <p>© 2020 WSJwine All Rights Reserved.
              <span>|</span>
              <a href="/"><b> Terms & Conditions </b></a>
              <span>|</span>
              <a href="/"><b> Privacy Policy</b></a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { redgrapeState } = state;
  const { offers, zipcode } = redgrapeState;
  return {
    offers,
    zipcode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOffers: bindActionCreators(getOffers, dispatch),
    getZipcode: bindActionCreators(getZipcode, dispatch),
  };
}

Home.propTypes = {
  getOffers: PropTypes.func,
  getZipcode: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
