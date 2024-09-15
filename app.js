const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('file'), (req, res) => {
    const pdfPath = req.file.path;
    const marker = req.body.marker;  // Capture the marker from the request body
    const dataBuffer = fs.readFileSync(pdfPath);

    pdfParse(dataBuffer).then(function(data) {
        const resumeData = parseResumeData(data.text, marker);  // Pass the marker to the function
        resumeData.title = marker || "Generated Resume";
        res.render('resume', { resume: resumeData });
    }).catch(err => {
        res.send("Error parsing PDF: " + err.message);
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function parseResumeData(text , endMarkerForCertifications) {
    let resume = {
        contact: extractSection(text, "Contact", "Top Skills", "Certifications"),
        skills: extractSection(text, "Top Skills", "Certifications", "Summary"),
        certifications: extractSection(text, "Certifications", endMarkerForCertifications, ""), // Assume no good end pattern
        summary: extractSection(text, "Summary", "Experience", "Education"),
        experience: extractSection(text, "Experience", "Education" , ""),
        education: extractSection(text, "Education", "Page", "") // Last section, no fallback needed
    };
    return resume;
}


function extractSection(text, startKeyword, endKeywordPattern, fallbackEndPattern) {
    let startIndex = text.indexOf(startKeyword) + startKeyword.length;
    let endIndex = text.indexOf(endKeywordPattern, startIndex);
    if (endIndex === -1) { // if no explicit end marker is found
        endIndex = text.indexOf(fallbackEndPattern, startIndex); // try finding a fallback pattern
        if (endIndex === -1) { // if no fallback pattern is found
            endIndex = text.length; // use the end of the text as a last resort
        }
    }
    
    // // Log start and end indices specifically for the "Certifications" section
    // if (startKeyword === "Certifications") {
    //     console.log(`'Certifications' start index: ${startIndex}`);
    //     console.log(`'Certifications' end index: ${endIndex}`);
    //     console.log(`Extracted 'Certifications' content: ${text.substring(startIndex, endIndex).trim()}`);
    // }

    // if (startIndex < startKeyword.length || endIndex <= startIndex) {
    //     console.log(`Failed to find section correctly: ${startKeyword} to ${endKeywordPattern}`);
    //     return "Section not found";
    // }

    return text.substring(startIndex, endIndex).trim();
}


