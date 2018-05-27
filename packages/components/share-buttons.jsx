/* eslint-disable object-curly-newline */
const React = require('react');
const {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  VKShareButton,
  GooglePlusShareButton,

  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  VKIcon,
  GooglePlusIcon,
} = require('react-share');
const PropTypes = require('prop-types');

const propTypes = {
  url: PropTypes.string.isRequired,
};

const ShareButtons = (props) => {
  const { url } = props;
  return (
    <div className="share-button-wrapper">
      <FacebookShareButton url={url} className="share-button">
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} className="share-button">
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <TelegramShareButton url={url} className="share-button">
        <TelegramIcon size={32} round />
      </TelegramShareButton>

      <VKShareButton url={url} className="share-button">
        <VKIcon size={32} round />
      </VKShareButton>

      <GooglePlusShareButton url={url} className="share-button">
        <GooglePlusIcon size={32} round />
      </GooglePlusShareButton>
    </div>
  );
};

ShareButtons.propTypes = propTypes;

module.exports = ShareButtons;
