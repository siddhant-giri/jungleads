import "./style.scss";

import React, { Component } from "react";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import RInput from "../../../reusable-component/input";
import {
  createAds,
  uploadImg,
  uploadVideo,
  createAdCreatives
} from "../../../actions/campaigns/ad-action";
import {getFBPages} from '../../../actions/campaigns/adsets-action';
import Select from "react-select";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RButton from "../../../reusable-component/button";
import RDropdown from "../../../reusable-component/dropdown";
import RCheckbox from "../../../reusable-component/checkbox";
import RLabel from "../../../reusable-component/labels";
import RRadiobutton from "../../../reusable-component/radiobutton";
import * as _ from "underscore";
import { ADS } from "../../../lib/constant";
import RTimeline from "../../../reusable-component/timeline";
import {getBase64} from '../../../lib/method';
import RenderModal from './modal/modal';

let callToActionArr = [{label: 'Link More', value: 'LINK_MORE'}];
// adAccount, adset_id and creative_id are constants dont change adAccountId and creative id
let userData = {
  adAccountId: "act_2711494898882012",
  userId: null,
  pageId: null,
  data: {
    name: null,
    "adset_id": "23844904452170372",
    "creative": {
      "creative_id": "23843729927230372"
    }
  },
  adCreativeData: {
    headline: null,
    description: null,
    webUrl: null,
    primaryText: null,
    seeMoreUrl: null,
    callToAction: null,
    imageBase64: null,
    carousel: null,
  }
};

class AdsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audienceState: null,
      adsType: 'carousel',
      fbPageArr: null,
      instaAcc: [928180577554819],//insta account is hardcoded need to build api for this
      callToAction: null,
      fbPixel: false,
      fbPage: null,
      imgSrc: null,
      show: false,
      fbPixelArr: [1,2,3],
      adsList: [{headline: '', description: '', webUrl: '', imageBase64: ''}],
      adCreativeInputFields: [
        {value: '', name:'headline', error: '', label: 'Headline', placeholder: 'Write a short headline', infoIcon: true, toolTip: 'The headline will appear in most placements, but its position will vary by placement. Headlines over 40 characters may be cut off.'},
        {value: '', name:'description', error: '', label: 'Description', placeholder: 'Include addtional details', infoIcon: true, toolTip: 'The description is additional text that appears in some placements. Its position on the ad varies by placement.'},
        {value: '', name:'webUrl', error: '', label: 'Website URL', placeholder: 'https://www.example.com/page', infoIcon: false, toolTip: ''},
      ],
      seeMore: null,
      headline: null,
      description: null,
      webUrl: null,
      selectedAd: 0,
      radioState: 'image',
      errors: {
        adsName: null,
        fbPage: null,
        instaAcc: null ,
        callToAction: null,
        adsList: null,
        seeMore: null,
        headline: null,
        description: null,
        webUrl: null,
      },
      series: [10],
    };
    userData.userId = this.props.signIn.data.userId;
    this.inputFileRef = React.createRef();
  }

  componentDidMount() {
    getFBPages({
      adAccountId: "act_2711494898882012",
      userId: userData.userId
    }).then(res => {
      this.setState({
        fbPageArr: res.data
      });
    });
    userData.adCreativeData.carousel = this.state.adsList;
  }

  handleAdsName = (e) => {
      userData.data.name = e.target.value;
  }

  handleFbPageSelect = pageData => {
    this.setState({
      fbPage: pageData.id
    });
    userData.pageId = pageData.id;
  };

  handleInstaAccSelect = (id) => {
    this.setState({
      instaAcc: id
    });
  }

  handleAdsType = value => {
    this.setState({
      adsType: value
    });
  };

  handleSelectImg = () => {
    if(this.state.adsType === 'carousel'){
      if(this.state.radioState === 'image'){
        userData.adCreativeData.carousel[this.state.selectedAd]['image_hash'] = '6971b2c299b5cc1c5e84508957f1aa5b';
      }else if(this.state.radioState === 'video') {
        userData.adCreativeData.carousel[this.state.selectedAd]['video'] = '6971b2c299b5cc1c5e84508957f1aa5b';
      }
    }else {
      userData.adCreativeData['imageBase64'] = '6971b2c299b5cc1c5e84508957f1aa5b';
    }
  }

  hanldeOnlineFbMediaUpload = (data) => {
    if(this.state.radioState === 'image'){
      if(this.state.adsType === 'carousel'){
        userData.adCreativeData.carousel[this.state.selectedAd]['image_hash'] = data.hash;
      }else {
        userData.adCreativeData['imageBase64'] = data.hash;
      }
    }else{
      if(this.state.adsType === 'carousel'){
        userData.adCreativeData.carousel[this.state.selectedAd]['video_id'] = data.id;
      }else {
        userData.adCreativeData['imageBase64'] = data.id;
      }
    }
  }

  handleUpload = e => {
    let obj = {
      userId: userData.userId,
      adAccountId: userData.adAccountId,
      name: e.target.files[0].name
    }
    let type = e.target.files[0].type;
    console.log(obj);
    if(this.state.radioState === 'image' && type.includes('image')){
      getBase64(e).then(res => {
        obj.imgBase64 = res;
        uploadImg(obj).then(res => {
          if(this.state.adsType === 'carousel'){
            userData.adCreativeData.carousel[this.state.selectedAd]['image_hash'] = res.imgHash.hash;
          }else {
            userData.adCreativeData['imageBase64'] = res.imgHash.hash;
          }
          this.setState({
            imgSrc: res.imgHash.url
          })
        });
      });
    }else if(this.state.radioState === 'video' && type.includes('video')){
      
      uploadVideo({
        userId: userData.userId,
        adAccountId: userData.adAccountId,
        name: e.target.files[0].name,
        source: e
      }).then(res => console.log(res));
    }
  }

  handleRadioBtn = e => {
    console.log(e.target.value);
    this.setState({
      radioState: e.target.value
    })
  }

  handleInputs = (e) => {
    if(this.state.adsType === 'carousel'){
      const {adsList, selectedAd} = this.state;
      let temp = adsList;
      temp[selectedAd][e.target.name] = e.target.value;
    }else {
      userData.adCreativeData[e.target.name] = e.target.value;
    }
  }

  handlePrimaryTxt = e => {
    userData.adCreativeData.primaryText = e.target.value;
  }

  handleSeeMoreLink = e => {
    userData.adCreativeData.seeMoreUrl = e.target.value;
  }

  handleChecks = (data) => {
    console.log(data);
    let fbPixel = data.value === 'Facebook Pixel' ? data.checked : false;
    this.setState({
      fbPixel
    })
  }

  handleCallToActionChange = (option) => {
    this.setState({callToAction: option})
    userData.adCreativeData.callToAction = option.value;
  }

  handlefbPixelMenu = (data) => {
    console.log(data);
  }

  handleAdd = () => {
    let arr = this.state.adsList;
    let arrLength = arr.length;
    if(arrLength === 10){
      let err = this.state.errors;
      err.adsList = 'You have reached your max limit';
      this.setState({errors: err})
    }else {
      arr.push({headline: '', description: '', webUrl: '', imageBase64: ''});
      this.setState({
        adsList: arr
      });
    }
  }

  handleSelectedAd(e, fieldData, id) {
    this.setState({selectedAd: id})
    let adCreativeFields = this.state.adCreativeInputFields;
    let temp = ['headline', 'description', 'webUrl'];
    _.each(adCreativeFields, (data, idx) => {
      // data.value = this.state.errors[temp[idx]];
      data.value = fieldData[temp[idx]];
      // console.log(data);
    });
    this.setState({
      adCreativeInputFields: adCreativeFields
    })
  }

  handleClose = () => {
    this.setState({
      show: !this.state.show
    })
  }

  checkFields = (value) => {
    if(Array.isArray(value)){
      return value.length > 0 ? null : 'Field required';
    }else {
      return value !== null ? null : 'Field required';
    }
  }

  errorCheck() {
    let errObj = this.state.errors;
    errObj.adsName = this.checkFields(userData.data.name);
    errObj.fbPage = this.checkFields(userData.pageId);
    errObj.instaAcc = this.checkFields(this.state.instaAcc);
    errObj.callToAction = this.checkFields(this.state.callToAction);
    errObj.headline = this.checkFields(userData.adCreativeData.headline);
    errObj.description = this.checkFields(userData.adCreativeData.description);
    errObj.webUrl = this.checkFields(userData.adCreativeData.webUrl);
    errObj.imageBase64 = this.checkFields(userData.adCreativeData.imageBase64);
    errObj.seeMore = this.checkFields(userData.adCreativeData.seeMoreUrl);
    errObj.adsList = this.checkFields(userData.adCreativeData.carousel);
    return errObj;
  }

  submit = () => {
    let err = this.errorCheck();
    let adCreativeObj = {
      userId: userData.userId,
      adAccountId: userData.adAccountId
    };
    adCreativeObj.data = userData.adCreativeData;
    adCreativeObj.data['page_id'] = userData.pageId;
    this.setState({
      errors: err
    });

    //Checking and displaying error for headline description and weburl fields
    // let adCreativeFields = this.state.adCreativeInputFields;
    // let temperr = ['headline', 'description', 'webUrl'];
    // _.each(adCreativeFields, (data, idx) => {
    //   if(this.state.adsType === 'carousel'){
    //     data.error = this.state.errors.adsList;
    //   }else {
    //     data.error = this.state.errors[temperr[idx]];
    //   }
    // });

    userData.adCreativeData.carousel = this.state.adsList;

    let temp = [];
      _.each(userData.adCreativeData.carousel, (data, id) => {
        data.name = data.headline;
        data.link = data.webUrl;
        if(this.state.radioState === 'video'){
          data.video_id = '518496128807133';
        }
        
        temp.push(_.omit(data, "headline", 'imageBase64', 'webUrl'));
      });
      userData.adCreativeData.carousel = temp;

    // console.log(userData.adCreativeData);
    // this.props.createAdCreatives(adCreativeObj);
    let result = _.every(_.values(err), function(v) {return !v;});
    console.log(userData);
    this.props.createAds(userData);
    if(result){
    }
  }

  render() {
    const {
      errors,
      callToAction,
      fbPixel,
      fbPixelArr,
      adsList,
      adsType,
      adCreativeInputFields,
      radioState,
    } = this.state;
    if (this.props.adsets && this.props.adsets.success) {
      this.props.handleClick();
    }
    return (
      <div className="ads">
        <div className="row adset-block">
          <RTimeline timelines={ADS.timeline} />
          <div className="col-9 content-block">
            <h2 className="header">Create Ad</h2>
            <p className="sub-title">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when a scrambled it to make specimen book.
            </p>
            <hr className="divider" />
            <RInput
              label="Ad name"
              placeholder="Enter ad name"
              infoIcon={true}
              infoMsg="Enter your ad name"
              handleChange={this.handleAdsName}
              error={errors.adsName}
            />
            <p />
            <div className="identity-block">
              <p>
                Identitys
                <br />
                <span>
                  Choose how you want your business to be represented in your
                  ad.
                </span>
              </p>
              <RDropdown
                label="Facebook page"
                infoIcon={true}
                toolTip="Facebook page mandatory"
                dataArr={this.state.fbPageArr}
                action={this.handleFbPageSelect}
                error={errors.fbPage}
              />
              <br />
              <span>
                Your Facebook Page or Instagram account represents your business
                in ads. You can also <a href="#abc">Create a Facebook Page</a>
              </span>
              <p />
              <RDropdown
                label="Instagram Account"
                infoIcon={true}
                toolTip="Instagram account mandatory"
                dataArr={this.state.instaAcc}
                action={this.handleInstaAccSelect}
                error={errors.instaAcc}
              />
              <br />
              <span>
                Select an Instagram account to represent your business in your
                Instagram ad. Instagram ad will use the Facebook Page name and
                profile picture, as well as details like the description and
                number of followers. To manage available Instagram accounts,
                contact your Business Manager admin.
              </span>
              <p />
            </div>
            <p />
            <Tabs
              defaultActiveKey="createAd"
              transition={false}
              id="noanim-tab-example"
            >
              <Tab className="sub-tab" eventKey="createAd" title="Create Ad">
                <div className="ads-type">
                  <div id="audience" />
                  <p />
                  <p>
                    Format
                    <br />
                    <span>
                      Choose how you'd like to structure your ad.{" "}
                      <a href="#abc"> Learn More</a>
                    </span>
                  </p>
                  <Row>
                    {_.map(ADS.FORMAT, (data, idx) => (
                      <Col lg={4} key={idx}>
                        <div
                          className={
                            this.state.adsType === data.type
                              ? "type ads-active text-center"
                              : "type text-center"
                          }
                          onClick={() => this.handleAdsType(data.type)}
                        >
                          <i className={data.img} />
                          <br />
                          <span>{data.title}</span>
                          <br />
                          <p>{data.subTitle}</p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
                <p />
                <div className="ad-creative">
                  <p>
                    Ad Creative
                    <br />
                    <span>
                      Choose the media, enter the text and select the
                      destinations for each card in your carousel ad.{" "}
                      <a href="#abc"> Learn More</a>
                    </span>
                  </p>
                  <p />
                  <Row style={{ paddingLeft: "15px" }}>
                    {_.map(adsList, (data, idx) => (
                      <div key={idx} className="num-block" onClick={(e) => this.handleSelectedAd(e, data, idx)}>{idx + 1}</div>
                    ))}
                    <div className="add-new-ad-creative" onClick={this.handleAdd}>+</div>
                    <span className='error'>{errors.adsList}</span>
                  </Row>
                  <Row>
                    <Col className="blocks">
                      <Row>
                        <RRadiobutton
                          formData={[
                            {
                              type: "radio",
                              name: "radio",
                              value: "image",
                              selected: true,
                              class: "input",
                              id: "ad-creative-radio",
                              labelName: "Image",
                              align: "col-4",
                              handleChange: this.handleRadioBtn
                            },
                            {
                              type: "radio",
                              name: "radio",
                              value: "video",
                              class: "input",
                              id: "ad-creative-radio",
                              labelName: "Video/Slideshow",
                              handleChange: this.handleRadioBtn,
                              align: "col-6"
                            }
                          ]}
                        />
                        <div className="col-2 remove">
                          <i className="biz-icon biz-icon-remove"></i>
                        </div>
                        <Col lg={12}>
                          <RButton
                            text={`Select ${radioState}`}
                            class="button select-img"
                            click={this.handleClose}
                            // click={() => this.inputFileRef.current.click()}
                          />
                          <RenderModal
                            show={this.state.show} 
                            option={radioState}
                            openExplorer={() => this.inputFileRef.current.click()} 
                            handleClose={this.handleClose} 
                            userData={{userId: userData.userId, adAccountId: userData.adAccountId}}
                          />
                          <input onChange={this.handleUpload} ref={this.inputFileRef} type="file" style={{display:"none"}}/>
                        </Col>
                        <Col lg={12}>
                          <p>IMAGE SPECIFICATIONS</p>
                          <p>
                          - Recommended image size: 1080 × 1080 pixels.<br/>
                          - Recommended image ratio: 1:1<br/>
                          - To maximize ad delivery, use an image that contains little or no
                          overlaid text. Learn More
                          </p>
                        </Col>
                        <Col lg={12}>
                          For questions and more information, see the <a href='#abc'>Facebook Ad Guidelines.</a>
                        </Col>
                        {_.map(adCreativeInputFields, (data, idx) => 
                          <Col key={idx} lg={12}>
                            <RInput
                              id={data.name}
                              label={data.label}
                              name={data.name}
                              placeholder={data.placeholder}
                              infoIcon={data.infoIcon}
                              infoMsg={data.toolTip}
                              values={data.value}
                              handleChange={this.handleInputs}
                              error={data.error}
                            />
                          </Col>
                        )}
                        <Col lg={12}>
                          <div className='d-flex justify-content-between'>
                            <div><a href='#abc'>Build a URL Parameter</a></div>
                            <div><a href='#abc'>Select cards from previous ads</a></div>
                          </div>
                        </Col>
                        {_.map(ADS.checkboxes , (data, idx) => 
                          <Col key={idx} lg={12}>
                            <RCheckbox 
                              handleCheck={this.handleChecks}
                              label={data.label}
                            />
                          </Col>
                        )}
                        <Col lg={12}>
                          <RLabel 
                            label={ADS.primaryText.label}
                            infoIcon={true}
                            toolTip={ADS.primaryText.toolTip}
                          />
                          <textarea name='primaryText' rows='5' placeholder={ADS.primaryText.placeholder} onChange={this.handlePrimaryTxt}></textarea><br/>
                          <a href='#abc'>+Add another option</a>
                        </Col>
                        <Col lg={12}>
                          <RInput
                            name='seeMoreUrl'
                            label='See more display link'
                            placeholder='http://www.example.com/page'
                            infoIcon={true}
                            infoMsg="Enter the URL you want people to visit when they click or tap your last carousel card. The last card is optional and it won't appear in all placements."
                            handleChange={this.handleSeeMoreLink}
                            error={errors.seeMore}
                          />
                        </Col>
                        <Col lg={12}>
                        <RLabel
                          label="Call to action"
                          infoIcon={true}
                          toolTip="Select on the option"
                          error={errors.callToAction}
                        />
                        <Select
                          value={callToAction}
                          onChange={this.handleCallToActionChange}
                          options={callToActionArr}
                          className="select-dropdown"
                        />
                        </Col>
                      </Row>
                    </Col>
                    <Col className="blocks">
                      {adsType === 'single' ? 'Single Block' : 'Carousel block'}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <p>Tracking</p>
                      <RLabel
                        label='Conversion Tracking'
                        infoIcon={true}
                        infoMsg='Conversion tracking'
                      />
                      <RCheckbox
                        handleCheck={this.handleChecks}
                        label='Facebook Pixel'
                      />
                      {fbPixel ? <RDropdown
                        dataArr={fbPixelArr}
                        action={this.handlefbPixelMenu}
                      /> : null}
                    </Col>
                    
                  </Row>
                </div>
              </Tab>
              <Tab
                className="sub-tab"
                eventKey="useExistingKey"
                title="Use Existing key"
              >
                Tab two
              </Tab>
              <Tab className="sub-tab" eventKey="useMockup" title="Use Mockup">
                Tab three
              </Tab>
            </Tabs>

            <Row>
              <Col lg={6}>
                <RButton text="BACK" class="button back" />
              </Col>
              <Col lg={6}>
                <RButton
                  text="CONTINUE"
                  class="button continue"
                  click={this.submit}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  let data = {
    signIn: state.signIn,
    error: state.error,
    adCreatives: state.campaigns
  };
  if (state.campaigns && state.campaigns.adCreativesData) {
    data.adCreatives = state.campaigns.adCreativesData;
  }
  return data;
};

const mapDispatchToProps = dispatch => {
  const actions = { createAdCreatives, createAds };
  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdsComponent));
