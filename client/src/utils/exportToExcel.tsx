
import ExcelJS from 'exceljs';

const exportToExcel = async (rows: any, columns: any[], filename: string) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(filename);

    worksheet.columns = columns.map((column) => ({
        header: column.title,
        key: column.dataIndex,
    }));

    rows.forEach((record: any) => {
        worksheet.addRow(record);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const fileURL = window.URL.createObjectURL(new Blob([buffer]));
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.download = `${filename}.xlsx`;
    fileLink.click();
    window.URL.revokeObjectURL(fileURL);
};

export default exportToExcel;