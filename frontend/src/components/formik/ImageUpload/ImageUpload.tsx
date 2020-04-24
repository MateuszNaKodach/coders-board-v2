import React, { PureComponent } from 'react';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Upload } from 'antd';
import { FieldProps, FormikProps, FormikErrors } from 'formik';
import styled, { css } from 'styled-components';
import Compressor from 'compressorjs';
import { FormItemProps } from 'antd/es/form';
import { UploadProps } from 'antd/es/upload';
import ImageCropModal, { CropData } from './ImageCropModal';

interface Dimensions {
  width: number;
  height: number;
}

interface BoxSize {
  boxWidth?: string | number;
  boxHeight?: string | number;
}

export interface ImageUploadProps extends Omit<UploadProps, 'name'>, FormItemProps, FieldProps, Dimensions, BoxSize {
  cropTitle?: string;
  cropOk?: string;
  cropCancel?: string;
  uploadText?: string;
}

interface State {
  loading: boolean;
  imageUrl?: string;
  cropData: CropData | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStatus = (
  form: FormikProps<any>,
  errorMessage?: string | string[] | FormikErrors<any> | FormikErrors<any>[],
) => {
  if (errorMessage) {
    return 'error';
  }
  if (form.isSubmitting || form.isValidating) {
    return 'validating';
  }
  return undefined;
};

const compressFile = (file: File, { width, height }: Dimensions) =>
  new Promise<File>((resolve, reject) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      quality: 0.8,
      width,
      height,
      success: async (blob: Blob) => {
        const fileFromBlob = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });

        resolve(fileFromBlob);
      },
      error: (err: Error) => reject(err.message),
    });
  });

const getImageRatio = (file: File) =>
  new Promise<number>((resolve) => {
    const fr = new FileReader();

    fr.onload = () => {
      const img = new Image();

      img.onload = () => {
        resolve(img.width / img.height);
      };

      img.src = fr.result as string;
    };

    fr.readAsDataURL(file);
  });

const StyledFormItem = styled(Form.Item)`
  .has-error {
    .ant-upload-select-picture-card {
      border-color: ${({ theme }) => theme.colors.error};
    }
  }

  .ant-form-item-children {
    display: block;

    .ant-form-item-children-icon {
      position: absolute;
      top: 16px;
      right: 0;
    }
  }
`;

const ImageUploadBase = styled(Upload)<BoxSize>`
  display: block;
  user-select: none;
  max-width: 100%;

  ${({ boxHeight, boxWidth }) => {
    const width = typeof boxWidth === 'number' ? `${boxWidth}px` : boxWidth;
    const height = typeof boxHeight === 'number' ? `${boxHeight}px` : boxHeight;

    return css`
      width: ${width};
      height: ${height};
    `;
  }};

  .ant-upload.ant-upload-select-picture-card {
    &.ant-upload-disabled {
      filter: grayscale(100%);
      background-color: ${({ theme }) => theme.colors.background};
      border-color: ${({ theme }) => theme.colors.border};

      div,
      i {
        color: ${({ theme }) => theme.colors.text.disabled};
      }

      img {
        opacity: 0.72;
      }
    }

    > .ant-upload {
      display: flex;
    }
  }

  .ant-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin: 0;
    max-width: 100%;
    max-height: 100%;
    min-width: 100%;
    min-height: 100%;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;

export class ImageUpload extends PureComponent<ImageUploadProps, State> {
  static defaultProps = {
    width: 200,
    height: 200,
    boxWidth: 128,
    boxHeight: 128,
  };

  state: State = {
    loading: false,
    cropData: null,
    imageUrl: this.props.field.value,
  };

  componentDidUpdate(prevProps: ImageUploadProps) {
    const currentValue = this.props.field.value;
    if (prevProps.field.value !== currentValue && typeof currentValue === 'string') {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ imageUrl: currentValue });
    }
  }

  beforeUpload = () => {
    this.setState({ loading: true });
    return true;
  };

  cropImage = async (file: File): Promise<File> =>
    new Promise((resolve, reject) =>
      this.setState({
        cropData: {
          file,
          resolve: (croppedImage: File) => resolve(croppedImage),
          reject,
        },
      }),
    );

  handleChange = async (file: File) => {
    const { width, height } = this.props;
    let resultFile = file;

    try {
      const ratio = await getImageRatio(resultFile);

      if (ratio !== width / height) {
        resultFile = await this.cropImage(resultFile);
      }

      resultFile = await compressFile(resultFile, { width, height });
      this.props.form.setFieldValue(this.props.field.name, resultFile);
      const imageUrl = URL.createObjectURL(resultFile);
      this.setState({ imageUrl, loading: false });

      return imageUrl;
    } catch (ex) {
      console.error(ex);
      return '';
    } finally {
      this.setState({ cropData: null, loading: false });
    }
  };

  uploadButton = (uploadText: string) => (
    <div>
      <LegacyIcon type={this.state.loading ? 'loading' : 'plus'} />
      <div>{uploadText}</div>
    </div>
  );

  render() {
    const {
      form,
      field: { name },
      colon,
      cropTitle,
      cropOk,
      cropCancel,
      extra,
      hasFeedback,
      height,
      help,
      htmlFor,
      label,
      labelCol,
      required,
      uploadText = 'Wgraj zdjęcie',
      validateStatus,
      width,
      wrapperCol,
      ...rest
    } = this.props;
    const { imageUrl, cropData } = this.state;

    const errorMessage = form.touched[name] ? form.errors[name] : undefined;
    const status = validateStatus || getStatus(form, errorMessage);
    const disabled = rest.disabled || status === 'validating';

    const itemProps = {
      colon,
      extra,
      hasFeedback: hasFeedback || Boolean(status),
      help: errorMessage || help || undefined,
      htmlFor: htmlFor || name,
      label,
      labelCol,
      required,
      validateStatus: status,
      wrapperCol,
    };

    const uploadProps = { ...rest, name, disabled, id: rest.id || name };

    const cropModalProps = {
      width,
      height,
      cropData,
      cropTitle,
      cropOk,
      cropCancel,
    };

    return (
      <>
        <StyledFormItem {...itemProps}>
          <ImageUploadBase
            {...uploadProps}
            listType="picture-card"
            showUploadList={false}
            action={(file: File) => this.handleChange(file)}
            beforeUpload={this.beforeUpload}
            customRequest={() => {
              'TODO';
            }}
          >
            {imageUrl ? <img src={imageUrl} alt={name} /> : this.uploadButton(uploadText)}
          </ImageUploadBase>
        </StyledFormItem>
        {cropData && <ImageCropModal {...cropModalProps} />}
      </>
    );
  }
}
