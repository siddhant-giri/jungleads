import React, { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import * as _ from "underscore";
import { getImgs, getVideos } from "../../../../actions/campaigns/ad-action";
import "./modal.scss";

class RenderModal extends Component {
  constructor(props) {
    super(props);
    this.state = { imgArr: null, videoArr: null };
  }

  componentDidMount() {
    const { userData } = this.props;
    getImgs({
      userId: userData.userId,
      adAccountId: userData.adAccountId
    }).then(res => {
      console.log(res);
      this.setState({
        imgArr: res.data.data
      });
    });
    getVideos(userData).then(res => {
      console.log(res);
      this.setState({
        videoArr: res.data.data
      });
    });
  }

  handleUpload = (type, data) => {
    if(type==='local'){
      this.props.openExplorer();
    }else {
      this.props.handleOnlineFbMediaUpload();
    }
  }

  render() {
    const { show, handleClose, option } = this.props;
    const { imgArr, videoArr } = this.state;
    const mediaArray = option === 'image' ? imgArr : videoArr
    return (
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col><Button onClick={() => this.handleUpload('local')}>Upload</Button></Col>
          </Row>
          <Row>
            {_.map(mediaArray, (data, idx) => (
              <Col lg={2} key={idx}>
                <img src={data.url || data.thumbnails.data[0].uri} alt="" className="images" onClick={() => this.handleUpload('onlineFbMediaUpload', data)} />
                <p>{data.name || data.title}</p>
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RenderModal;
