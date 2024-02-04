import React from "react";

function VerifPage() {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        backgroundColor: "rgba(0, 152, 163, 0.89)",
      }}
    >
      <h2 style={{ color: "rgb(2, 235, 126)", marginBottom: "10px" }}>
        Email Verification Successful
      </h2>
      <p style={{ color: "white" }}>
        Your email address has been successfully verified!
      </p>
      <p style={{ color: "white" }}>
        You can now proceed to log in to your account using the button below:
      </p>
      <a
        href="http://localhost:3001/signin"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "rgb(2, 235, 126)",
          color: "white",
          textDecoration: "none",
          borderRadius: 5,
          margin: "10px",
        }}
      >
        Log In
      </a>
      <p style={{ marginTop: 20, color: "white" }}>
        If you didn't sign up for our platform, please contact our support team.
      </p>
      <p style={{ color: "white" }}>
        Thank you,
        <br />
        Our EDUSpecial Team
      </p>
    </div>
  );
}

export default VerifPage;
