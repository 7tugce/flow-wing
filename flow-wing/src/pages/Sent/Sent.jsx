import React, { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import Divider from "@mui/material/Divider"
import "./sent.css"
import { excerpt, getText } from "../../helpers"
import { getSentMails } from "../../services/emailService"
import EmptyPage from "../../components/EmptyPage"
import { Avatar } from "antd"

const Sent = () => {
  const [sentMails, setSentMails] = useState([])
  const [mailCount, setMailCount] = useState(0)

  // get sent emails
  useEffect(() => {
    getSentMails().then((response) => {
      // Sort the sentMails array by sentDateTime in descending order
      const sortedMails = response.data.userEmails.sort(
        (a, b) =>
          new Date(b.emailLog.sentDateTime) - new Date(a.emailLog.sentDateTime)
      )
      setMailCount(response.data.userEmails.length)
      setSentMails(sortedMails)
    })
  }, [])
  // SPINNER
  if (sentMails.length === 0) {
    return <EmptyPage />
  }
  // COLOR ARRAY FOR HR ELEMENT

  const colors = [
    "#d10ce8 ",
    "#ff4560",
    "#008ffb",
    "#191970",
    "#775dd0",
    "#01e396 ",
    "#ffa07a ",
    "#feb019 ",
    "#546e7a ",
    "#add8e6 ",
    "#34c38f ",
    "#d98b49 ",
    "#bf1ad2 ",
    "#21b15a "
  ]

  return (
    <div className="sent-mail-page-content">
      <h2>{mailCount} mesaj</h2>
      <div className="sent">
        {sentMails.map((item, index) => {
          // to format date
          const dateFromAPI = new Date(item.emailLog.sentDateTime)
          const nowsDate = new Date()

          let timeToShow

          if (
            dateFromAPI.getFullYear() === nowsDate.getFullYear() &&
            dateFromAPI.getMonth() === nowsDate.getMonth() &&
            dateFromAPI.getDate() === nowsDate.getDate()
          ) {
            const hourPart = dateFromAPI.toLocaleTimeString("tr-TR", {
              hour: "numeric",
              minute: "numeric"
            })
            timeToShow = hourPart
          } else {
            const datePart = dateFromAPI.toLocaleDateString("tr-TR")
            timeToShow = datePart
          }

          return (
            <>
              <Link to={`/sentbox/${item.emailLog.id}`}>
                <div className="sent-mail-content" key={index}>
                  <hr
                    style={{
                      border: `1px solid ${colors[index % colors.length]}`
                    }}
                  />
                  <div key={index} className="inbox-mail-unopened">
                    <div className="user-section-home">
                      <div className="user-icon-home">
                        <Avatar
                          size={44}
                          style={{
                            backgroundColor: "#191970 ",
                            color: "#add8e6 "
                          }}
                        >
                          <span>{item.emailLog.senderEmail.charAt(0)}</span>
                        </Avatar>
                      </div>

                      <div className="user-name">
                        {item.emailLog.recipientsEmail}{" "}
                      </div>
                    </div>
                    <div className="inbox-mail-title">
                      {excerpt(item.emailLog.emailSubject,40)}
                    </div>
                    <div className="inbox-mail-body">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: getText(
                            excerpt(item.emailLog.sentEmailBody, 100)
                          )
                        }}
                      />
                    </div>
                  </div>{" "}
                  <div className="repeat-delete-sent-time-section">
                    <div className="is-repeating-icon">
                      {item.emailLog.isScheduled === true && (
                        <Icon icon="bi:repeat" />
                      )}
                    </div>
                    <div className="inbox-sent-time">{timeToShow}</div>
                  </div>
                </div>{" "}
                <Divider />{" "}
              </Link>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Sent
