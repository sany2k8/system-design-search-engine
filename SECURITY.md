This `SECURITY.md` file outlines how users can report vulnerabilities while maintaining a professional and secure atmosphere for your open-source project.

***

# Security Policy

The **System Design Search Engine** is a client-side web application focused on educational content and system design prompts. While it does not handle sensitive user authentication or private backend data, security is still a top priority to ensure a safe experience for all contributors and users.

## Reporting a Vulnerability

If you believe you have found a security vulnerability in this project, please report it via GitHub's private vulnerability reporting feature:

1. Navigate to the main page of the repository.
2. Click on the **Security** tab.
3. Select **Vulnerability reports** in the left sidebar.
4. Click **New report**.

**Please do not open a public issue** for security vulnerabilities, as this could expose the flaw to malicious actors before a fix can be deployed.

### What to Include in Your Report
To help us investigate effectively, please provide as much of the following as possible:
* **Description:** A summary of the vulnerability and its potential impact.
* **Steps to Reproduce:** A clear, step-by-step guide to trigger the vulnerability.
* **Environment:** Details about the browser or environment where the vulnerability was observed.
* **Suggested Fix (Optional):** If you have ideas on how to mitigate the issue, please include them.

## Security Model

* **Client-Side Security:** Since this is a React-based application, please be mindful of vulnerabilities common to frontend frameworks, such as Cross-Site Scripting (XSS).
* **Dependency Management:** We periodically audit dependencies using `npm audit`. We encourage contributors to keep dependencies updated and report any high-risk vulnerabilities found in third-party packages.
* **Data Privacy:** This repository contains public educational data. Please ensure no PII (Personally Identifiable Information) or API keys are accidentally committed in your contributions.

## Our Commitment

We appreciate the community's help in keeping this project secure. We will review all vulnerability reports promptly and provide an update on our progress within a reasonable timeframe.

---

*Thank you for helping keep the System Design Search Engine safe for everyone.*
