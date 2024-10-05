import { Button, Form, Image, Input, Modal, Table, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import uploadFile from "../../utils/upload";
function KoiManagement() {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "Koi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "img_path",
      key: "img_path",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Breed",
      dataIndex: "breed",
      key: "breed",
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  function handleShowModal() {
    setIsOpen(true);
  }
  function handleHideModal() {
    setIsOpen(false);
  }
  async function handleSubmit(values) {
    console.log(values);
    console.log(values.img_path.file.originFileObj);
    const url = await uploadFile(values.img_path.file.originFileObj);
    console.log(url);
    values.img_path = url;
    const response = await axios.post(
      "https://66fe08fb699369308956d74e.mockapi.io/KoiProduct",
      values
    );
    console.log(response);
    setDataSource([...dataSource, values]);
    form.resetFields();
    handleHideModal();
  }
  function handleOk() {
    form.submit();
    setIsOpen(false);
  }
  async function fetchKoi() {
    const response = await axios.get(
      "https://66fe08fb699369308956d74e.mockapi.io/KoiProduct"
    );
    setDataSource(response.data);
  }
  useEffect(() => {
    // anonymous function, dung de tranh trường hợp bỏ trưcj tiếp vào useEffect function async
    fetchKoi();
  }, []);
  return (
    <div>
      <Button onClick={handleShowModal} type="primary">
        Add new Koi
      </Button>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        open={isOpen}
        title="Add new Koi"
        onCancel={handleHideModal}
        onOk={handleOk}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item label="Koi name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Input />
          </Form.Item>
          <Form.Item label="Size" name="size">
            <Input />
          </Form.Item>
          <Form.Item label="Image" name="img_path">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input />
          </Form.Item>
          <Form.Item label="Age" name="age">
            <Input />
          </Form.Item>
          <Form.Item label="Breed" name="breed">
            <Input />
          </Form.Item>
          <Form.Item label="Batch" name="batch">
            <Input />
          </Form.Item>
          <Form.Item label="Rating" name="rating">
            <Input />
          </Form.Item>
          <Form.Item label="Origin" name="origin">
            <Input />
          </Form.Item>
          <Form.Item label="Quantity" name="quantity">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}
export default KoiManagement;
