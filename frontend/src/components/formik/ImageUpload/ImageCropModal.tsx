import React, { Component } from 'react';
import { Modal } from 'antd';
import ReactCrop, { Crop } from 'react-image-crop';
import styled from 'styled-components';
import { isEqual } from 'lodash';

import 'react-image-crop/dist/ReactCrop.css';

export interface CropData {
  file: File;
  resolve: (croppedImage: File) => void;
  reject: () => void;
}

interface ImageCropModalProps {
  width: number;
  height: number;
  cropData: CropData | null;
  cropTitle?: string;
  cropOk?: string;
  cropCancel?: string;
}

interface ImageCropModalState {
  crop: Crop;
  visible: boolean;
}

const StyledModal = styled(Modal)`
  .ReactCrop {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

class ImageCropModal extends Component<ImageCropModalProps, ImageCropModalState> {
  static defaultProps = {
    title: 'Przytnij zdjęcie',
    cropOk: 'Przytnij',
    cropCancel: 'Anuluj',
  };

  image?: HTMLImageElement;

  state = {
    crop: {
      x: 0,
      y: 0,
      width: this.props.width,
      height: this.props.height,
      aspect: this.props.width / this.props.height,
    },
    visible: true,
  };

  shouldComponentUpdate(nextProps: ImageCropModalProps, nextState: ImageCropModalState) {
    return !isEqual(nextState, this.state);
  }

  getCroppedImg = async () => {
    const { crop } = this.state;
    const { file } = this.props.cropData!;
    const image = this.image!;

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext('2d');

    ctx!.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );

    canvas.toBlob((blob) => {
      const newFile = new File([blob!], file.name, {
        type: file.type,
        lastModified: Date.now(),
      });

      this.setState({ visible: false }, () => {
        setTimeout(() => this.props.cropData!.resolve(newFile), 300);
      });
    }, file.type);
  };

  onImageLoaded = (image?: HTMLImageElement) => {
    if (!this.image) {
      this.image = image;
    }
  };

  onChange = (crop: Crop) => this.setState({ crop });

  render() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onCancel = this.props.cropData ? this.props.cropData.reject : () => {};

    return (
      <StyledModal
        title={this.props.cropTitle}
        visible={this.state.visible}
        onOk={this.getCroppedImg}
        onCancel={onCancel}
        okText={this.props.cropOk}
        cancelText={this.props.cropCancel}
      >
        {this.props.cropData && (
          <ReactCrop
            src={URL.createObjectURL(this.props.cropData.file)}
            crop={this.state.crop}
            onChange={this.onChange}
            onImageLoaded={this.onImageLoaded}
          />
        )}
      </StyledModal>
    );
  }
}

export default ImageCropModal;
