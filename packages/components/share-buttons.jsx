import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    VKShareButton,
    GooglePlusShareButton,

    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    VKIcon,
    GooglePlusIcon
} from 'react-share';

const ShareButtons = (props) => {
    return(
        <div className="share-button-wrapper">
            <FacebookShareButton url={props.url} className="share-button">
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton url={props.url} className="share-button">
            <TwitterIcon size={32} round />
            </TwitterShareButton>

            <TelegramShareButton url={props.url} className="share-button">
                <TelegramIcon size={32} round />
            </TelegramShareButton>

            <VKShareButton url={props.url} className="share-button">
                <VKIcon size={32} round />
            </VKShareButton>

            <GooglePlusShareButton url={props.url} className="share-button">
                <GooglePlusIcon size={32} round />
            </GooglePlusShareButton>
        </div>
    );
};

export default ShareButtons;