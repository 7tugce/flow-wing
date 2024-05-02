import { useFormik } from "formik"
import React from "react"
import { useSelector } from "react-redux"
import { Divider } from "@mui/material"
import { Select } from "antd"
import { sendMail } from "../../services/emailService"

const Scheduled = () => {
  // GET USER
  const user = useSelector((state) => state.user.user)

  // MAIL SEND FUNCTION
  const handleSubmit = (values) => {
    sendMail(values)
  }
  // FORMIK

  const formik = useFormik({
    initialValues: {
      recipientsEmail: "",
      emailSubject: "",
      emailBody: ""
    },
    onSubmit: (values) => {
      handleSubmit(values)
    }
  })

  const handleChange = (value) => {
    //console.log(`selected ${value}`)
  }
  return (
    <div className="compose-page-content">
      <h2>Planlanmış Mailler</h2>
      <div className="schedule-time">
        <Select
          style={{
            width: 120
          }}
          onChange={handleChange}
          options={[
            {
              value: "2 günde bir",
              label: "2 günde bir"
            },
            {
              value: "Haftada bir",
              label: "Haftada bir"
            }
          ]}
        />
      </div>
      <div className="compose send-to">
        <span>Kime</span>{" "}
        <input
          type="text"
          name="recipientsEmail"
          onChange={formik.handleChange}
          value={formik.values.recipientsEmail}
        ></input>
        <Divider />
      </div>
      <div className="compose mail-title">
        <span>Konu</span>{" "}
        <input
          type="text"
          name="emailSubject"
          onChange={formik.handleChange}
          value={formik.values.emailSubject}
        ></input>
        <Divider />
      </div>
      <div className="compose mail-body">
        <textarea
          name="emailBody"
          value={formik.values.emailBody}
          onChange={formik.handleChange}
          type="text"
        />
      </div>
      <div className="compose-attachments">
        <Divider type="vertical" />
      </div>
      <div className="compose-btns">
        <button
          className="send-btn"
          type="submit"
          onClick={formik.handleSubmit}
        >
          Gönder
        </button>
        <button className="delete-btn">Sil</button>
      </div>
    </div>
  )
}

export default Scheduled
