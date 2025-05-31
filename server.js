const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for client requests
app.use(express.json());

const auth = new google.auth.JWT({
  email: 'stylecorner-service-account@able-winter-358811.iam.gserviceaccount.com',
  key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0KsQoPr2XnOUH\n4g4PM9ui2HChtXM411o3uhGcoXSMHpqqA5B7yqfXaNsUwXuWEF+qa2a0RpT0z61u\n7qJqwEn7iZDNHWp2kwc7JNGzmzhIBP0jwddmpR/2GNI7KKb7vu58wG+k7GXJG04c\nGHURnz/X/HHgEEnTgpa5rBVw6LwzQwtL21T5q6GRaC2tQNfqE5JO9WDRYDKUXLIT\nTQNy8HLftvR027oubSnNVKtlXtWhsiRFNnmaWVtT3gtei79dQf7KYTQxKlxjfId0\nGnwMVc5aTao7pEyrCIfch/cMM+3spD1ZcBE7ZgO/lQvjBElN43bu7jlzH2R7pkBq\nPWlxBuWDAgMBAAECggEASrCkC08fSBg59o+nZnQILLVv1AomDz1v4ERaAsYITAJv\n+eVqY3d7J1kH4c3oTyjQkBTgSgIsxGTIMIHrgTfgM9Au4Gm+dhOz3rf/22aQ6YJv\n8v/sLVhtLJfTp8TNnPXlZoBciFGcTMfuFMWq2rhbPk4gY1Q9Vtr/Y0/Mv7csNk91\nxrZ/YsrZaTaUAQAzcSlpYuFlo1jpiE1eft49qub0LbBulU9Ciwt1ertHij+sYVDG\n4UeA2B8m3QRAGrLpAYy58s6xG//I3hxxks8dfn1hasakH1km5RtsYyw4mS4/GCx1\ngj7tkSONIwjGNNLSqyic441r/aN82oKRuyJj4/AjCQKBgQDgRHKCsS9XnSAC/v6D\nwqB29g+MIXFPiFtdnh+iGIPezRzxyFSbaIJVqTFrAA4r7ssG+Po4rP3iBBlP69Tk\nk4Bt6jQ43XT326LLAOBa8dq6hyUJFIJBALfZq7/Ye21MgqGRy80RQa2wAvjGef0N\nWN0BcaIl6AU2WvV4JaxoSYTjfwKBgQDNqOPGVSp9fqbGqi/H9AhMLmxVCJf+Y5Qw\n4rKP9KCBTAaopPQfAXyBS/WgDrX6JfWh91NY1eoG7iQO/Q4qlTzTkCnHZJ96Kmxo\n6GYZ7V30D2MFjyU6Y5ilFTJBssFB0Z/eZl54x9+154CkX8GY5p//iXfWuHUrLbCL\nYeXE5PJv/QKBgQC7haA2VY+fc9uDhdItPD1Om1rOslv7w6mZ8xDCSjthviJ4rSjJ\nta5dkBapQKeY5pfPIbqgT04OgZzkre4anpdh0NaPweT/JyDNG9N9WAOrujsmh4aO\ncdpI4QqOKk5vDj+pGD9FMaTYqvN3iiMk2OwbO/f4ODS7iXz9VIr/vJGoYwKBgBTd\ncqZ3k4UB6Xe0Yn6d0o2wFAuYgJstjSZciZMzVWloxjAr9ByFMRWJGFVxyKKlYUNa\nbVlQ8ppbZMskf2Bwnag1MxforIlfbnpCQcGVpHeTbA9vU26WFjGBcgTaVuMPmnGc\n3y7P0HGLGDEVCfYyR79MOh1Nv41u6D9r4jzUoYgdAoGBAK1YfVqWhytEbhoI7jH/\nTssllH/6jNqKWDgs1KgjqdboBaqKJSXP8Ycc8YTxXRUX3oh4SfaWgS5xMOxA8Lo9\n0U0K/v+ZAgW10gNu7xO2d5FRG+cPY21AJex0l6U5ABGUJCOaJ0QH30fWfcB5+Epv\nS+C4eQNceWZ7tbFds7cCaIZw\n-----END PRIVATE KEY-----\n',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

app.post('/save', async (req, res) => {
  try {
    const { sheet, data } = req.body;
    await sheets.spreadsheets.values.clear({
      spreadsheetId: '1UfLjgdC5rsVOm4bKar81GHUZy_X8TEFU928JrDPG418',
      range: sheet,
    });
    await sheets.spreadsheets.values.update({
      spreadsheetId: '1UfLjgdC5rsVOm4bKar81GHUZy_X8TEFU928JrDPG418',
      range: sheet,
      valueInputOption: 'RAW',
      resource: { values: data },
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));