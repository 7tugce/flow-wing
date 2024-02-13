import apiAxios from "../lib/apiAxios"

const getMails = () => {
  return apiAxios.get("EmailLogs/GetUserSentEmails")
}

const sendMail = (values,formData) => {
  const { recipientsEmail, emailSubject, emailBody } = values

  // Convert values to strings if necessary
  const mailContent = {
    recipientsEmail: String(recipientsEmail),
    emailSubject: String(emailSubject),
    emailBody: String(emailBody),
    attachments: formData
  }

  return apiAxios.post("EmailLogs", mailContent,formData)
}

const sendScheduledMail = (values) => {
  const { sentDateTime, recipientsEmail, emailSubject, emailBody } = values

  const mailContent = {
    sentDateTime: sentDateTime,
    recipientsEmail: recipientsEmail,
    emailSubject: emailSubject,
    emailBody: emailBody,
    attachments: []
  }
  return apiAxios.post("ScheduledEmails/CreateScheduledEmail", mailContent)
}

const getSentMails = () => {
  return apiAxios.get("EmailLogs/GetUserReceivedEmails")
}

const getAllUsers = () => {
  return apiAxios.get("Users")
}

const deleteSentEmail = (id) => {
  return apiAxios.delete("EmailLogs/" + id)
}

const getEmailById = (id) => {
  return apiAxios.get("EmailLogs/" + id)
}

const sendScheduledRepeatingMail = (values) => {
  const {
    recipientsEmail,
    emailSubject,
    emailBody,
    nextSendingDate,
    repeatInterval,
    repeatEndDate
  } = values
  const mailContent = {
    recipientsEmail: recipientsEmail,
    emailSubject: emailSubject,
    emailBody: emailBody,
    nextSendingDate: nextSendingDate,
    repeatInterval: repeatInterval,
    repeatEndDate: repeatEndDate
  }
  return apiAxios.post(
    "ScheduledEmails/CreateScheduledRepeatingEmail",
    mailContent
  )
}

export {
  getAllUsers,
  getEmailById,
  getMails,
  getSentMails,
  sendMail,
  sendScheduledMail,
  sendScheduledRepeatingMail,
  deleteSentEmail
}
