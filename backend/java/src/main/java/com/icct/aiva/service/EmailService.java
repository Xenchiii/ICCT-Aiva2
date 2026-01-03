package com.icct.aiva.service;

import java.net.PasswordAuthentication;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

public class EmailService {

    private final String username = "jameleague15@gmail.com"; // Your email
    private final String password = "YOUR_APP_PASSWORD"; // Google App Password

    public void sendEmail(String recipient, String subject, String body) {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));
            message.setSubject(subject);
            message.setText(body);

            Transport.send(message);
            System.out.println("[EMAIL] Sent successfully to " + recipient);

        } catch (MessagingException e) {
            System.err.println("[EMAIL ERROR] " + e.getMessage());
        }
    }
}