import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FacebookShareButton, TwitterShareButton, FacebookMessengerShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";
import { TbBrandFacebook, TbBrandLinkedin, TbBrandMessenger, TbBrandTwitter, TbBrandWhatsapp } from 'react-icons/tb';
import { CustomTooltip } from '.';

const buttonStyles = { padding: 8, borderRadius: "50%", border: "1px #000 solid" };

function CampaignShare({ shareUrl, title }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='share-btn' style={{ padding: 0, border: "none" }} onClick={handleShow}>
        Share
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Campaigns that are constantly shared trough social media networks collect the funds much times faster.</p>
          <div style={{ display: "flex", justifyContent: 'space-around' }}>
            <CustomTooltip message={"Facebook"}>
              <FacebookShareButton url={shareUrl} quote={title}>
                <div style={buttonStyles}><TbBrandFacebook fontSize={35} /></div>
              </FacebookShareButton>
            </CustomTooltip>
            <CustomTooltip message={"Twitter"}>
              <TwitterShareButton url={shareUrl} title={title}>
                <div style={buttonStyles}><TbBrandTwitter fontSize={35} /></div>
              </TwitterShareButton>
            </CustomTooltip>
            <CustomTooltip message={"Facebook Messenger"}>
              <FacebookMessengerShareButton url={shareUrl} appId="521270401588372">
                <div style={buttonStyles}><TbBrandMessenger size={35} /></div>
              </FacebookMessengerShareButton>
            </CustomTooltip>
            <CustomTooltip message={"LinkedIn"}>
              <LinkedinShareButton url={shareUrl} >
                <div style={buttonStyles}><TbBrandLinkedin size={35} /></div>
              </LinkedinShareButton >
            </CustomTooltip>
            <CustomTooltip message={"WhatsApp"}>
              <WhatsappShareButton url={shareUrl} >
                <div style={buttonStyles}><TbBrandWhatsapp size={35} /></div>
              </WhatsappShareButton >
            </CustomTooltip>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CampaignShare;