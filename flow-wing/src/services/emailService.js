import axios from "axios";

export default class EmailService {
  getMails() {
    const userData = localStorage.getItem("user");
    const userObject = JSON.parse(userData);
    const userToken = userObject.token;

    return axios.get("http://localhost:2255/api/EmailLogs", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      mode: "cors",
    });
  }

  sendMail(values) {
    const userData = localStorage.getItem("user");
    const userObject = JSON.parse(userData);
    const userToken = userObject.token;
    const { recipientsEmail, emailSubject, emailBody } = values;

    // Convert values to strings if necessary
    const mailContent = {
      recipientsEmail: String(recipientsEmail),
      emailSubject: String(emailSubject),
      emailBody: String(emailBody),
    };

    return axios.post("http://localhost:2255/api/EmailLogs", mailContent, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      mode: "cors",
    });
  }

  sendScheduledMail() {

    const userData = localStorage.getItem("user");
    const userObject = JSON.parse(userData);
    const userToken = userObject.token;

    return axios.post("http://localhost:2255/api/ScheduledEmails", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      mode: "cors",
    });
  }
}