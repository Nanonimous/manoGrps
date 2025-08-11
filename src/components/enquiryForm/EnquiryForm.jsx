import React, { useState } from 'react';
import styles from './EnquiryForm.module.css';

const EnquiryForm = ({
  title = "Enquire Us:",
  namePlaceholder = "Enter Name:",
  emailPlaceholder = "Enter Email Id:",
  phonePlaceholder = "Enter Phone Number:",
  messagePlaceholder = "Write a message:",
  submitButtonText = "Send Now →",
  storeOptions = [
    { value: "", label: "Select Store" },
    { value: "pondicherry", label: "Pondicherry Store" },
    { value: "chennai", label: "Chennai Store" },
    { value: "bangalore", label: "Bangalore Store" },
    { value: "online", label: "Online Store" }
  ],
  backgroundColor = "#ffffff",
  formBackgroundColor = "rgba(150, 60, 120, 1)",
  titleColor = "#333333",
  inputBorderColor = "#ddd",
  inputFocusColor = "#e91e63",
  buttonColor = "#ffffff",
  buttonBgColor = "#e91e63",
  buttonHoverColor = "#c2185b",
  onSubmit = (formData) => {
    console.log('Form submitted:', formData);
    alert('Thank you for your enquiry! We will get back to you soon.');
  },
  onValidationError = (message) => {
    alert(message);
  }
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    store: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      onValidationError('Please fill in all required fields');
      return;
    }

    // Call the onSubmit prop
    onSubmit(formData);

    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      store: '',
      message: ''
    });
  };

  return (
    <div className={styles.enquiryContainer} style={{ backgroundColor }}>
      <div className={styles.enquiryHeader}>
        <h2
          style={{
            color: titleColor,
            '--title-color': titleColor
          }}
        >
          {title}
        </h2>
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
            style={{
              borderColor: inputBorderColor,
              '--focus-color': inputFocusColor
            }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={emailPlaceholder}
            value={formData.email}
            onChange={handleInputChange}
            className={styles.inputField}
            style={{
              borderColor: inputBorderColor,
              '--focus-color': inputFocusColor
            }}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder={phonePlaceholder}
            value={formData.phone}
            onChange={handleInputChange}
            className={styles.inputField}
            style={{
              borderColor: inputBorderColor,
              '--focus-color': inputFocusColor
            }}
            required
          />
          <select
            name="store"
            value={formData.store}
            onChange={handleInputChange}
            className={styles.selectField}
            style={{
              borderColor: inputBorderColor,
              '--focus-color': inputFocusColor
            }}
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
            style={{
              borderColor: inputBorderColor,
              '--focus-color': inputFocusColor
            }}
            rows="4"
          />
        </div>

        <div className={styles.submitRow}>
          <button
            type="submit"
            className={styles.submitBtn}
            style={{
              color: buttonColor,
              backgroundColor: buttonBgColor,
              '--hover-color': buttonHoverColor
            }}
          >
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
