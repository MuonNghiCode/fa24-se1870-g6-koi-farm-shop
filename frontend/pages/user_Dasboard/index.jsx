import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Modal, message, Avatar, Upload } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../utils/upload";

const UserForm = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [user, setUser] = useState({}); // Lưu trữ thông tin người dùng
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [form] = Form.useForm();
  const [editingField, setEditingField] = useState(null); // Trạng thái theo dõi trường đang chỉnh sửa
  const [inputValue, setInputValue] = useState(""); // Giá trị input mới
  const [isModified, setIsModified] = useState(false); // Kiểm soát nút "Submit"
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(user.avatar_path); // Hiển thị preview ảnh// Kiểm soát nút "Submit"
  const [isModifiedImage, setIsModifiedImage] = useState(false); // Kiểm soát nút "Submit"
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileImage, setFileImage] = useState("");
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://66ffa8eb4da5bd2375516c72.mockapi.io/User_Information?userID=${id}`
        );
        const data = await response.json();
        if (data.length > 0) {
          const userInfo = data[0];
          setUser(userInfo);
          form.setFieldsValue(userInfo); // Set giá trị ban đầu
          setPreviewImage(userInfo.avatar_path);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, form]);

  const handleEditClick = (field) => {
    setEditingField(field); // Cho phép chỉnh sửa trường
    setInputValue(user[field] || ""); // Thiết lập giá trị ban đầu cho input
  };

  const handleSaveClick = (field) => {
    if (inputValue.trim() === "") {
      message.error("Please enter a value before saving.");
      return;
    }
    // Cập nhật user và đặt lại trạng thái
    const updatedUser = { ...user, [field]: inputValue };
    setUser(updatedUser);
    setEditingField(null);
    setIsModified(true); // Cho phép submit
  };

  const handleCancelClick = () => {
    setEditingField(null); // Hủy chỉnh sửa
    setInputValue(""); // Đặt lại giá trị input
  };
  const handleSaveImage = (url) => {
    console.log("url", url);
    //setUser({ ...user, avatar_path: url });
    user.avatar_path = url;
    console.log("user", user);
  };
  const onFinish = async (values) => {
    console.log("Image", user.avatar_path);
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to save these changes?",
      onOk: async () => {
        try {
          if (isModifiedImage) {
            const url = await uploadFile(fileImage);
            handleSaveImage(url);
            console.log(user);
          }
          await axios.put(
            `https://66ffa8eb4da5bd2375516c72.mockapi.io/User_Information/${user.id}`,
            user
          );
          message.success("User information updated successfully!");
        } catch (error) {
          console.error("Error updating user:", error);
          message.error("Failed to update user information");
        }
      },
    });
  };
  const handleAvatarChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // Hiển thị ảnh mới ngay trên avatar trước khi submit
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      console.log(file);
      setFileImage(file);
      const preview = await getBase64(file);
      setPreviewImage(preview);
      // Cập nhật preview avatar
      setIsModifiedImage(true);
    } else {
      setPreviewImage(user.avatar_path); // Quay lại avatar ban đầu nếu không có ảnh
      // Không cập nhật preview avatar
      setIsModifiedImage(false);
    }
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  if (loading || !user) {
    return <p>Loading...</p>;
  }

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
        Change Avatar
      </div>
    </button>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Form
        name="userForm"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={user}
      >
        <Form.Item label="User ID" name="userID" hidden></Form.Item>
        <Form.Item label="ID" name="id" hidden></Form.Item>
        {/* Avatar */}
        <Form.Item label="Avatar">
          <Avatar src={previewImage} size={64} />
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-circle"
            fileList={fileList}
            onChange={handleAvatarChange}
            beforeUpload={() => false} // Ngăn việc upload ngay lập tức
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        {/* Full Name */}
        <Form.Item label="Full Name">
          {editingField === "fullName" ? (
            <>
              <Input
                placeholder="Enter your full name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button onClick={() => handleSaveClick("fullName")}>Save</Button>
              <Button onClick={handleCancelClick}>Cancel</Button>
            </>
          ) : (
            <>
              <span>{user.fullName}</span>
              <Button onClick={() => handleEditClick("fullName")}>Edit</Button>
            </>
          )}
        </Form.Item>

        {/* Address */}
        <Form.Item label="Address">
          {editingField === "address" ? (
            <>
              <Input
                placeholder="Enter your address"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button onClick={() => handleSaveClick("address")}>Save</Button>
              <Button onClick={handleCancelClick}>Cancel</Button>
            </>
          ) : (
            <>
              <span>{user.address}</span>
              <Button onClick={() => handleEditClick("address")}>Edit</Button>
            </>
          )}
        </Form.Item>

        {/* Email */}
        <Form.Item label="Email">
          {editingField === "email" ? (
            <>
              <Input
                placeholder="Enter your email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button onClick={() => handleSaveClick("email")}>Save</Button>
              <Button onClick={handleCancelClick}>Cancel</Button>
            </>
          ) : (
            <>
              <span>{user.email}</span>
              <Button onClick={() => handleEditClick("email")}>Edit</Button>
            </>
          )}
        </Form.Item>

        {/* Phone */}
        <Form.Item label="Phone">
          {editingField === "phone" ? (
            <>
              <Input
                placeholder="Enter your phone number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button onClick={() => handleSaveClick("phone")}>Save</Button>
              <Button onClick={handleCancelClick}>Cancel</Button>
            </>
          ) : (
            <>
              <span>{user.phone}</span>
              <Button onClick={() => handleEditClick("phone")}>Edit</Button>
            </>
          )}
        </Form.Item>

        {/* Total Points (Không chỉnh sửa) */}
        <Form.Item label="Total Points" name="totalPoints">
          <Input value={user.totalPoints} disabled />
        </Form.Item>

        {/* Points Available (Không chỉnh sửa) */}
        <Form.Item label="Points Available" name="pointAvailable">
          <Input value={user.pointAvailable} disabled />
        </Form.Item>

        {/* Points Used (Không chỉnh sửa) */}
        <Form.Item label="Points Used" name="pointUsed">
          <Input value={user.pointUsed} disabled />
        </Form.Item>

        {/* Nút Confirm */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!(isModified || isModifiedImage)}
          >
            Submit Changes
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserForm;
