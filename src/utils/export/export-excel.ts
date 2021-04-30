// yarn add xlsx
import XLSX from 'xlsx';

/* const getColumnName = (columns: any, key: any) => {
  let name = '';
  for (let i = 0; i < columns.length; i += 1) {
    const column = columns[i];
    if (column.dataIndex === key) {
      name = column.title;
    }
  }
  return name;
}; */
const getColumnName = (columns: any, key: string) => {
  let name: any = '';
  Object.entries(columns).forEach(([c_key, value]) => {
    if (key === c_key) {
      name = value;
    }
  });
  return name;
};

// const columns = {
//   age: '年龄',
//   address: '住址',
//   name: '姓名',
//   time: '时间',
//   key: 'key',
//   description: '描述',
// };

// const dataSource = [
//   {
//     key: 1,
//     name: 'John Brown',
//     age: 11,
//     time: 1615946753720,
//     address: 'New York',
//     description: 'My name is John Brown, I am 12 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 2,
//     name: 'John Brown',
//     age: 12,
//     time: 1615946753720,
//     address: 'london',
//     description: 'My name is John Brown, I am 22 years old, living in New York No. 2 Lake Park.',
//   },
//   // ...
// ];

/**
 * 创建一个表格
 * @param {*} columns 表格的第一行列的名称
 * @param  {*} dataSource 表格的其它行
 * @param {*} fileName 表格名称
 * 导出成功返回true,失败返回false
 */
export const exportExcel = <T>(dataSource: any = [], columns: T = <T>{}, fileName?: string) => {
  /** Converts an array of arrays of JS data to a worksheet. */
  // const ws = XLSX.utils.aoa_to_sheet([columns, ...dataSources])  //把array转成sheet
  let newFileName = fileName;
  if (!newFileName) newFileName = new Date().getTime().toString();
  const newDataSource = [];
  for (let i = 0; i < dataSource.length; i += 1) {
    const ds = dataSource[i];
    const newObj = {};
    Object.keys(ds).forEach((key) => {
      const newKey = getColumnName(columns, key);
      newObj[newKey] = ds[key];
    });
    newDataSource.push(newObj);
  }

  try {
    const ws = XLSX.utils.json_to_sheet(newDataSource); // 把json转成sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // 添加一页excel:Sheet1
    /* generate file and send to client */
    XLSX.writeFile(wb, `${newFileName}.xlsx`);
    return true;
  } catch (err) {
    return false;
  }
};
