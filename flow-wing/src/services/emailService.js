import apiAxios from "../lib/apiAxios"

const getMails = () => {
  return apiAxios.get("EmailLogs/GetUserSentEmails")
}

const sendMail = (values) => {
  const { recipientsEmail, emailSubject, emailBody, file } = values

  // Convert values to strings if necessary
  const mailContent = {
    recipientsEmail: String(recipientsEmail),
    emailSubject: String(emailSubject),
    emailBody: String(emailBody),
    attachmentIds: file
  }

  return apiAxios.post("EmailLogs", mailContent)
}

const replyMail = (values) => {
  const { recipientsEmail, emailSubject, emailBody, RepliedEmailId, file } =
    values

  // Convert values to strings if necessary
  const mailContent = {
    recipientsEmail: String(recipientsEmail),
    emailSubject: String(emailSubject),
    emailBody: String(emailBody),
    attachmentIds: file,
    RepliedEmailId: RepliedEmailId
  }

  return apiAxios.post("EmailLogs", mailContent)
}
const sendScheduledMail = (values) => {
  const { sentDateTime, recipientsEmail, emailSubject, emailBody, file } =
    values

  const mailContent = {
    sentDateTime: sentDateTime,
    recipientsEmail: recipientsEmail,
    emailSubject: emailSubject,
    emailBody: emailBody,
    attachments: file
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
const deleteScheduledEmail = (id) => {
  return apiAxios.delete("ScheduledEmails/ScheduledEmail/" + id)
}
const deleteRepeatingEmail = (id) => {
  return apiAxios.delete("ScheduledEmails/ScheduledRepeatingEmail/" + id)
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

const getMailAnswersById = (id) => {
  return apiAxios.get("EmailLogs/GetEmailAndAnswersByEmailLogId/" + id)
}

const getForwardedMailById = (id) => {
  return apiAxios.get("EmailLogs/GetEmailAndAnswersByEmailLogId/" + id)
}
const forwardEmail = (values) => {
  return apiAxios.post("EmailLogs/CreateForwardedEmailLog", values)
}

const getEmailAndAnswersByEmailLogId = (id) => {
  return apiAxios.get("EmailLogs/GetEmailAndAnswersByEmailLogId/" + id)
}


const getUserSentDeletedEmails=()=>{
  return apiAxios.get("EmailLogs/GetUserSenDeletedtEmails")
}
const getUserReceivedDeletedEmails=()=>{
  return apiAxios.get("EmailLogs/GetUserReceivedDeletedEmails")
}

export {
  getAllUsers,
  getEmailById,
  getMails,
  getSentMails,
  sendMail,
  sendScheduledMail,
  sendScheduledRepeatingMail,
  deleteSentEmail,
  getMailAnswersById,
  replyMail,
  forwardEmail,
  getForwardedMailById,
  getEmailAndAnswersByEmailLogId,
  deleteScheduledEmail,
  deleteRepeatingEmail,
  getUserSentDeletedEmails,
  getUserReceivedDeletedEmails
}
