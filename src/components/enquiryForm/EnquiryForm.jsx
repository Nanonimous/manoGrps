import React, { useState } from 'react';
import styles from './EnquiryForm.module.css';
import axios from 'axios';

const EnquiryForm = ({
  title = "Enquire Us:",
  namePlaceholder = "Enter Name:",
  emailPlaceholder = "Enter Email Id:",
  phonePlaceholder = "Enter Phone Number:",
  messagePlaceholder = "Write a message:",
  submitButtonText = "Send Now →",
  storeOptions = [
    { value: "", label: "Select Store" },
    { value: "Lil tots", label: "Lil Tots" },
    { value: "wowla", label: "Wowla" },
    { value: "manostore", label: "Mano Store" }
  ],
  backgroundColor = "#ffffff",
  formBackgroundColor = "rgba(150, 60, 120, 1)",
  titleColor = "#333333",
  inputBorderColor = "#ddd",
  inputFocusColor = "#e91e63",
  buttonColor = "#ffffff",
  buttonBgColor = "#e91e63",
  buttonHoverColor = "#c2185b",
  onValidationError = (message) => {
    alert(message);
  },
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    store: '',
    message: ''
  });
  const [showStatus, setShowStatus] = useState("");

  const handleInputChange = (e) => {
    if (showStatus !== "") setShowStatus("");
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      onValidationError('Please fill in all required fields');
      return;
    }

    try {
      const res = await axios.post(`https://userenquire-b5sg.onrender.com/api/enquire/add`, {
        enquirerName: formData.name,
        enquirerEmail: formData.email,
        enquirerPhoneNo: formData.phone,
        enquirerMessage: formData.message,
        storeName: formData.store
      });

      console.log(res.data);

      setFormData({
        name: '',
        email: '',
        phone: '',
        store: '',
        message: ''
      });

      setShowStatus("submitted successfully ✅");
    } catch {
      setShowStatus("not submitted ❌");
    }
  };

  return (
    <div className={styles.enquiryContainer} style={{ backgroundColor }}>
      <div className={styles.enquiryHeader}>
        <h2 style={{ color: titleColor }}>{title}</h2>
      </div>

      <form
        className={styles.enquiryForm}
        onSubmit={handleSubmit}
        style={{ backgroundColor: formBackgroundColor }}
      >
        <div className={styles.formRow}>
          <input
            type="text"
            name="name"
            placeholder={namePlaceholder}
            value={formData.name}
            onChange={handleInputChange}
            className={styles.inputField}
            style={{ borderColor: inputBorderColor, '--focus-color': inputFocusColor }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={emailPlaceholder}
            value={formData.email}
            onChange={handleInputChange}
            className={styles.inputField}
            style={{ borderColor: inputBorderColor, '--focus-color': inputFocusColor }}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder={phonePlaceholder}
            value={formData.phone}
            onChange={handleInputChange}
            className={styles.inputField}
            style={{ borderColor: inputBorderColor, '--focus-color': inputFocusColor }}
            required
          />
          <select
            name="store"
            value={formData.store}
            onChange={handleInputChange}
            className={styles.selectField}
            style={{ borderColor: inputBorderColor, '--focus-color': inputFocusColor }}
          >
            {storeOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.messageRow}>
          <textarea
            name="message"
            placeholder={messagePlaceholder}
            value={formData.message}
            onChange={handleInputChange}
            className={styles.messageField}
            style={{ borderColor: inputBorderColor, '--focus-color': inputFocusColor }}
            rows="4"
          />
        </div>

        <div className={styles.submitRow}>
          <button
            type="submit"
            className={styles.submitBtn}
            style={{ color: buttonColor, backgroundColor: buttonBgColor, '--hover-color': buttonHoverColor }}
          >
            {submitButtonText}
          </button>

          {showStatus && (
            <p className={`${styles.statusMessage} ${showStatus.includes("success") ? styles.success : styles.error}`}>
              {showStatus}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
