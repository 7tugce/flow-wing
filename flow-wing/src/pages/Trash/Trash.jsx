import React, { useEffect, useState } from "react"
import { getUserReceivedDeletedEmails, getUserSentDeletedEmails } from "../../services/emailService"
import { Link } from "react-router-dom"
import { Avatar, Divider } from "antd"
import { excerpt, getText } from "../../helpers"
import { Icon } from "@iconify/react"
import Spinner from "../../components/Spinner"

const Trash = () => {
  const [deletedSentMails,setDeletedSentMails]=useState([])
  const [deletedReceivedMails,setDeletedReceivedMails]=useState([])

  const mails = [...deletedSentMails, ...deletedReceivedMails];

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


useEffect(()=>{
  getUserReceivedDeletedEmails().then((response)=>{
    setDeletedReceivedMails(response.data.userEmails)
  }).catch(error=>{console.log(error)})


  getUserSentDeletedEmails().then((response)=>{
    setDeletedSentMails(response.data.userEmails)
  }).catch(error=>{console.log(error)})
},[])
// SPINNER
if (!mails) {
  return <Spinner />
}
  return (
    <div className="sent-mail-page-content">
      <h2>Çöp Kutusu</h2>
      <div className="inbox">
        {mails.map((item, index) => {
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
              <Link to={`/inbox/${item.emailLog.id}`} key={index}>
                <div className="sent-mail-content">
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
                        {item.emailLog.senderEmail}{" "}
                      </div>
                    </div>
                    <div className="inbox-mail-title">
                      {item.emailLog.emailSubject}
                    </div>
                    <div className="inbox-mail-body">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: getText(
                            excerpt(item.emailLog.sentEmailBody, 120)
                          )
                        }}
                      />
                    </div>
                  </div>{" "}
                  <div className="repeat-delete-sent-time-section">
                    <div>
                      <div className="is-repeating-icon">
                        {item.emailLog.isScheduled === true && (
                          <Icon icon="bi:repeat" />
                        )}
                      </div>
                    </div>

                    <div className="inbox-sent-time">{timeToShow}</div>
                  </div>
                </div>
                <Divider />
              </Link>
            </>
          )
        })}
      </div>

    </div>
  )
}

export default Trash
