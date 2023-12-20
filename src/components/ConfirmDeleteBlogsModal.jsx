import { Modal, Typography } from "antd";
import PropTypes from "prop-types";
import { QuestionCircleOutlined } from "@ant-design/icons";
const { Paragraph } = Typography;

const ConfirmDeleteBlogsModal = ({
  isModalOpen,
  setIsModalOpen,
  deleteSelectedRows,
  loading,
  setLoading,
}) => {
  const handleOk = () => {
    setLoading(true);
    deleteSelectedRows();
    setLoading(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => setIsModalOpen(false);

  return (
    <Modal
      title={
        <div style={{ display: "flex", gap: "10px", paddingBottom: "10px" }}>
          <QuestionCircleOutlined
            style={{ fontSize: "1.2rem", color: "red" }}
          />
          Delete Blogs
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      confirmLoading={loading}
      okText={"Delete"}
      okType="danger"
      onCancel={handleCancel}
      centered
    >
      <Paragraph>You about to delete the selected blog posts.</Paragraph>
      <Paragraph>Are you sure you want to delete?</Paragraph>
    </Modal>
  );
};

ConfirmDeleteBlogsModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  deleteSelectedRows: PropTypes.func,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default ConfirmDeleteBlogsModal;
