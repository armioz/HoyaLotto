import * as XLSX from 'xlsx';

const sites = ['HOGT', 'HECT', 'HSOT', 'GDC'];
const data = [];

// Header row
data.push(['Name', 'ID', 'Department', 'Role', 'Email', 'Phone', 'Address', 'Site']);

// Generate 50 random participants
const complexSites = ['HOGT', 'HOGT -ประจำ HO', 'HECT', 'HECT (Zone A)', 'HSOT', 'HSOT -ประจำ HO', 'GDC', 'GDC 2'];

for (let i = 1; i <= 50; i++) {
    const id = String(i).padStart(3, '0');
    const dept = ['Engineering', 'HR', 'Sales', 'Marketing'][Math.floor(Math.random() * 4)];
    const site = complexSites[Math.floor(Math.random() * complexSites.length)];
    // Columns A, B, C, D, ... H
    data.push([`Person ${id}`, id, dept, 'Employee', `p${id}@example.com`, '555-0100', '123 Main St', site]);
}

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(data);
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

XLSX.writeFile(wb, 'test_participants.xlsx');
console.log('Created test_participants.xlsx');
