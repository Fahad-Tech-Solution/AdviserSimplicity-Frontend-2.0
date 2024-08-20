import { useRef, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import fund from "../Assets/Adviser-Simpilicity.png"

const Contact = () => {
    const form = useRef();
    let [PDFUrl, setPdfUrl] = useState();

    const generatePDF = async () => {
        // Create a new jsPDF instance
        const doc = new jsPDF('p', 'pt', 'letter');

        const pageWidth = doc.internal.pageSize.width; // Get page width
        const pageHeight = doc.internal.pageSize.height; // Get page height



        // Declare specialElementHandlers and margins
        const specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true;
            }
        };
        const margins = {
            top: 150,
            bottom: 60,
            left: 40,
            right: 40,
            width: 600
        };



        doc.setLineWidth(2);
        doc.setTextColor("#28a745"); // Make sure PDF_Color is defined elsewhere in your code

        // Create an Image element
        const img = new Image();
        img.src = fund;

        img.onload = () => {

            // Calculate x and y coordinates to center the image
            const x = (pageWidth - 300) / 2; // Center horizontally
            const y = (pageHeight - 200) / 2; // Center vertically

            //  // Draw the border around the image
            //  doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]); // Set border color
            //  doc.setLineWidth(borderWidth); // Set border width
            //  doc.rect(x - borderWidth, y - borderWidth, imgWidth + 2 * borderWidth, imgHeight + 2 * borderWidth); // Draw border


            // Add image to PDF once it has loaded
            doc.addImage(img, 'PNG', x, 100, 300, 200); // x, y, width, height (in points)

            // Add content to the PDF
            doc.text("I am Usama", 20, 30); // Position text at x=10, y=10

            // Add table to PDF
            doc.autoTable({
                html: '#resultTable9',
                margin: { left: 55 },
                startY: y + 30, // Position table below the image
                theme: 'grid',
                columnStyles: {
                    0: {
                        cellWidth: 253,
                        valign: 'middle',
                    },
                    1: {
                        cellWidth: 126,
                        valign: 'middle',
                    },
                    2: {
                        cellWidth: 126,
                        valign: 'middle',
                    }
                },
                headStyles: {
                    fillColor: "#28a745",
                    valign: 'middle',
                    fontSize: 12,
                },
                styles: {
                    minCellHeight: 40,
                },
            });


            // Output the PDF as a Blob
            const pdfData = doc.output('blob');
            return pdfData;
          
            // doc.save("ali")
            // const url = URL.createObjectURL(pdfBlob);
            // setPdfUrl(url);
            // console.log("Pdf is Created")
        };
    };


    return (
        <section className="container">
            <div className="row justify-content-center">
                <br />
                <div className="col-md-6">
                    <button
                        className="btn btn-primary"
                        onClick={generatePDF}
                    >
                        Submit
                    </button>
                    <a href={PDFUrl} target="_blank">{PDFUrl}</a>

                    <table id="resultTable9" style={{ display: 'none' }}>
                        <thead>
                            <tr>
                                <th>Column 1</th>
                                <th>Column 2</th>
                                <th>Column 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data 1</td>
                                <td>Data 2</td>
                                <td>Data 3</td>
                            </tr>
                            <tr>
                                <td>Data 4</td>
                                <td>Data 5</td>
                                <td>Data 6</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Contact;
