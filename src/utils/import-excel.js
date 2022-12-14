import { read, utils } from 'xlsx';

export default function importExcel(file, cb) {
  // 获取上传的文件对象
  const { files } = file.target;
  // 通过FileReader对象读取文件
  const fileReader = new FileReader();
  fileReader.onload = (event) => {
    try {
      const { result } = event.target;
      // 以二进制流方式读取得到整份excel表格对象
      const workbook = read(result, { type: 'binary' });
      let data = []; // 存储获取到的数据
      // 遍历每张工作表进行读取（这里默认只读取第一张表）
      Object.keys(workbook.Sheets).forEach((sheet) => {
        if (Object.prototype.hasOwnProperty.call(workbook.Sheets, sheet)) {
          // 利用 sheet_to_json 方法将 excel 转成 json 数据
          data = data.concat(utils.sheet_to_json(workbook.Sheets[sheet]));
        }
      });
      cb(data);
    } catch (e) {
      // 这里可以抛出文件类型错误不正确的相关提示
    }
  };
  // 以二进制方式打开文件
  fileReader.readAsBinaryString(files[0]);
}
