import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  private logger = new Logger('LoanService');
  async generatePdf(customerData: any, loanDetails: any): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Replace placeholders with MongoDB data
    const htmlContent = `
    <!doctype html> 
    <html> 
        <head>
             <meta charset="utf-8"> 
             <title>Untitled Document</title> 
             <style type="text/css"> 
              html, 
              body { margin: 0 !important; padding: 0 !important; height: 100% !important; width: 100% !important; } 
               * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } 
               .ExternalClass { width: 100%; } div[style*="margin: 16px 0"] { margin: 0 !important; }
                table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; }
                table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; } table table table { table-layout: auto; } .data-tbl{border-top: 5px solid #000;} #report-header { margin: auto } @media screen and (max-width: 480px) { /* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */ .fluid, .fluid-centered { width: 100% !important; max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; } /* And center justify these ones. */ .fluid-centered { margin-left: auto !important; margin-right: auto !important; } /* What it does: Forces table cells into full-width rows. */ .stack-column, .stack-column-center { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; } /* And center justify these ones. */ .stack-column-center { text-align: center !important; } /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */ .center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; } table.center-on-narrow { display: inline-block !important; } .headertbl { height: auto; } #report-header { width: 100%; margin: 0; min-width: 400px; } .ga-data img { width: 100%; max-width: 400px; } } </style> </head> <body width="100%" style="margin: 0;"> <div id="report-header" style="max-width: 680px;"> <div style="display:inline-block; max-width:300px; margin: 0 -2px; min-width:300px; vertical-align:top; width:100%;" class="stack-column"> <table cellspacing="0" cellpadding="0" border="0" width="100%"> <tr> <td style="padding: 10px 10px;"> <table cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tr> <td><img class="center-on-narrow size-medium wp-image-32 aligncenter" src="https://jupitermultimedia.com/mainwp-report-resources/images/header.png" alt="" width="300" height="295" /></td> </tr> </table> </td> </tr> </table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; max-width:380px; margin: 0 -2px; min-width:380px; vertical-align:top; width:100%;" class="stack-column"> <table width="100%" height="300" class="headertbl"> <tr> <td valign="middle" style="padding: 10px 10px;"> <table cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tr> <td> <p style="text-align: center; font-weight: 200;font-family: 'Century Gothic', arial, sans-serif; font-size: 2em; padding: 0px; margin: 0px;">Loan Details Report</p> <p style="text-align: center; font-family: 'Century Gothic', arial, sans-serif;font-size: 2em; color: #2ecc71; font-weight: 200; padding: 0px; margin: 0px;">adcLoan Company</p> <p style="text-align: center;font-family: 'Century Gothic', arial, sans-serif; font-size: 1em; color: #000; font-weight: 200; padding: 0px; margin: 0px;">3663 Bee Caves Rd #4D, Austin, TX 78746
<br />Next to Breed & Co</p>
 </td> </tr> </table> </td> </tr> </table> </div><!--REPORT HEADER : End -->
      
    
      
    <h2>Customer Details </h2>
    <p> Customer ID :- ${customerData.customerId} </p>
    <p> Customer Name :- ${customerData.name} </p>
    <p> Customer email :- ${customerData.email} </p>

    <h2 style="margin-top: 3rem">Loan Details</h2>
    <p> Loan ID :- ${loanDetails.loanId} </p>
    <p> Amount:- $ ${loanDetails.amount} </p>
    <p> Duration:- ${loanDetails.duration} Days</p>
    <p> Start Date:- ${new Date(loanDetails.date).toLocaleDateString()}</p>
    <p> Status:- ${loanDetails.status} </p>
  
</body>
</html>
    `;
    try {
      this.logger.log('Generate pdf successful ');
      await page.setContent(htmlContent);
      const pdf = await page.pdf();
      await browser.close();

      return pdf;
    } catch (error) {
      this.logger.error('Not Generate pdf successful', error);
      return error;
    }
  }
}
