/**
 * KMD Interior — website enquiries → Google Sheet
 *
 * Paste this into the sheet's Apps Script editor (Extensions → Apps Script),
 * set SECRET below to the same value as ENQUIRY_SHEET_SECRET in the
 * website's environment, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). Put the web app URL in
 * ENQUIRY_SHEET_WEBHOOK_URL. Full steps: integrations/README.md.
 *
 * Every enquiry becomes one row in the "Enquiries" tab, newest at the
 * bottom. File → Download → Microsoft Excel (.xlsx) exports it for Excel.
 */

const SECRET = "PASTE-THE-SAME-SECRET-AS-ENQUIRY_SHEET_SECRET";
const SHEET_NAME = "Enquiries";

const COLUMNS = [
  ["Received", null],
  ["Name", "name"],
  ["Phone", "phone"],
  ["Email", "email"],
  ["Project location", "projectLocation"],
  ["Project type", "projectType"],
  ["Approximate area", "approximateArea"],
  ["Estimated budget", "estimatedBudget"],
  ["Expected start date", "expectedStartDate"],
  ["Message", "message"],
];

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (error) {
    return respond({ ok: false, error: "invalid body" });
  }
  if (!body || body.secret !== SECRET) return respond({ ok: false, error: "unauthorised" });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS.map((column) => column[0]));
      sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    const enquiry = body.enquiry || {};
    sheet.appendRow(COLUMNS.map(([, key]) => (key ? asText(enquiry[key]) : new Date())));
    return respond({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// A leading = + - or @ would make Sheets read the value as a formula (a
// phone number like +91… included), so those are stored as plain text.
function asText(value) {
  const text = String(value == null ? "" : value).slice(0, 5000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function respond(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
