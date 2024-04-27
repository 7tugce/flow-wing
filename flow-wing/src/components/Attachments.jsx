import React from "react"
import "./attachments.css"
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Upload } from "antd"
import { Icon } from "@iconify/react"

const props = {
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList)
    }
  },
  defaultFileList: [],
  showUploadList: {
    showRemoveIcon: true,
    removeIcon: (
      <Icon
        icon="fluent:delete-20-regular"
        onClick={(e) => console.log(e, "custom removeIcon event")}
      />
    )
  }
}
const Attachments = () => {
  return (
    <div className="attachments-content">
      {" "}
      <Upload {...props}>
        <Button icon={<Icon icon="clarity:attachment-line" />}></Button>
      </Upload>
    </div>
  )
}

export default Attachments
