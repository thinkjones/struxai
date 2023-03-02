import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from "uuid";

const { Dragger } = Upload;

const MAX_FILE_SIZE = 2000000

const props: UploadProps = {
  name: 'file',
  multiple: false,
  maxCount: 1,
  customRequest: async (options) => {
    console.log("options before upload", options);
    const uploadKey = `${uuidv4()}/${options.file.name}`;
    const result = await Storage.put(uploadKey, options.file, {
      level: "private",
      contentType: options.file.type,
    });
    console.log("options.file after upload", uploadKey);
  },
  beforeUpload(info) {
    const { size } = info;
    if (size && size > MAX_FILE_SIZE) {
        message.error('File is too large')
        return false;
    }
  },
  onChange(info) {
    const { status, size } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const UploadPanel: React.FC = () => {

  
  return (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </Dragger>
)};

export default UploadPanel;