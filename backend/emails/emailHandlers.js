import dotenv from "dotenv"; dotenv.config();
import { transporter } from "../lib/transporter.js";
import {
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createWelcomeEmailTemplate,
} from "./emailTemplates.js";

// Define the sender email address
const sender = process.env.EMAIL_USER;

export const sendWelcomeEmail = async (email, name, profileUrl) => {

  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Welcome to UnLinked",
      html: createWelcomeEmailTemplate(name, profileUrl),
      category: "welcome",
    });

    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    throw error;
  }
};

export const sendCommentNotificationEmail = async (
  email,
  recipientName,
  commenterName,
  postUrl,
  commentContent
) => {
  

  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "New Comment on Your Post",
      html: createCommentNotificationEmailTemplate(recipientName, commenterName, postUrl, commentContent),
      category: "comment_notification",
    });
    console.log("Comment Notification Email sent successfully", response);
  } catch (error) {
    throw error;
  }
};

export const sendConnectionAcceptedEmail = async (email, senderName, recipientName, profileUrl) => {

  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: `${recipientName} accepted your connection request`,
      html: createConnectionAcceptedEmailTemplate(senderName, recipientName, profileUrl),
      category: "connection_accepted",
    });
    console.log("Connection Accepted Email sent successfully", response);
  } catch (error) {
    throw error;
  }
};