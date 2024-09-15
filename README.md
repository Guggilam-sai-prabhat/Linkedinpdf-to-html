# LinkedIn PDF to HTML-RESUME
This project is an Express.js application designed to parse PDF resumes, specifically those downloaded from LinkedIn, and generate a structured HTML output. The application allows users to upload a PDF resume,  and view a styled HTML representation of the resume.

## Technologies Used

- **Node.js/Express**: For setting up the backend server and handling routing.
- **Multer**: To handle file uploads in Node.js.
- **pdf-parse**: For extracting text from PDF files.
- **EJS**: As a templating engine to render HTML views dynamically.

## Getting Started

These instructions will guide you through getting a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Node.js and npm installed on your machine. You can download and install them from [Node.js official website](https://nodejs.org/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone repo url
2. **Navigate to the project directory:**
   ```bash
   cd repo-name
 3. **Install dependencies and start the development server:**
    ```bash
     npm install
     node app.js

## Approach

The application is built to efficiently parse and display structured data from LinkedIn PDF resumes. Here’s how it tackles the problem:

1. **PDF Upload**: Users upload their PDF resumes through a front-end form.
2. **Marker Input**: Users have the option to input a custom text marker. This marker indicates where specific sections of the resume end, particularly useful for customizing the parsing logic based on the user's document layout.
3. **Predefined Sections**: The backend leverages predefined section markers (like "Contact", "Skills", etc.) to begin parsing sections. The end of these sections can sometimes be marked by user inputs if they vary significantly between documents. Predefined markers are crucial because they ensure that the information does not get mixed up between sections, maintaining a clean and accurate structure throughout the parsing process.
4. **Parsing Logic**: Using both predefined and dynamic markers (if provided), the backend extracts text ensuring each section is correctly identified and isolated. This prevents the overlap of content across sections, which is critical for generating a coherent and professionally formatted HTML resume.
5. **HTML Rendering**: The extracted data is passed to an EJS template, which formats and displays the content in an HTML format that is easy to read and visually appealing.

This methodical approach ensures that the resume's structure is respected and that the data displayed is both accurate and neatly formatted.

## Usage

To use the application, follow these steps:

1. **Start the server**: Run `npm start` and navigate to `http://localhost:3000` in your web browser.
2. **Upload a Resume**: Use the form to upload a LinkedIn PDF resume. Ensure the file adheres to the expected format for best results.
3. **Enter a Custom Marker (Optional)**: If your resume includes sections not standard to LinkedIn or if you want to ensure precise section termination, enter a custom marker. This might be a word or phrase that uniquely ends a section, like a job title or educational qualification that appears right before the section ends.
4. **Submit and Review**: Submit the form and view your structured resume in HTML format. The parser uses both the predefined and any custom markers provided to accurately segment and display the resume content.

By following these steps, users can transform a static PDF into a dynamic and structured HTML web page, making the information more accessible and easier to navigate.

  
