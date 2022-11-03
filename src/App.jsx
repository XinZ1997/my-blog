import { React, useState, useEffect } from 'react';
import './App.css';
import importExcel from './import-excel';

const PRODUCT_NAME = '商品名称';
const BUSINESS_TYPE = '交易类型';
const enumBusinessType = {
  enter: '结算入账',
  refund: '退款',
};

function App() {
  const [pres, setPres] = useState([]);
  const importExcelCallback = (data) => {
    const map = new Map();
    data
      .filter((item) => item[PRODUCT_NAME])
      .map((item) => {
        map.set(item[PRODUCT_NAME], { ...item, enterCount: 0, refundCount: 0 });
        return item;
      })
      .forEach((item) => {
        if (item[BUSINESS_TYPE] === enumBusinessType.enter) {
          map.get(item[PRODUCT_NAME]).enterCount += 1;
        }
        if (item[BUSINESS_TYPE] === enumBusinessType.refund) {
          map.get(item[PRODUCT_NAME]).refundCount += 1;
        }
      });
    const arr = [];
    map.forEach((item) => {
      arr.push(
        <div className="container" key={item[PRODUCT_NAME]}>
          <p className="name">{item[PRODUCT_NAME]}</p>
          <p className="enter">
            <span>{item.enterCount}</span>
          </p>
          <p className="refund">
            <span>{item.refundCount}</span>
          </p>
        </div>,
      );
    });
    setPres(arr);
  };
  useEffect(() => {}, []);

  return (
    <div className="App">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => {
          importExcel(e, importExcelCallback);
        }}
      />
      {pres.length > 0 && (
        <div className="container">
          <p className="name">{PRODUCT_NAME}</p>
          <p className="enter">{enumBusinessType.enter}</p>
          <p className="refund">{enumBusinessType.refund}</p>
        </div>
      )}
      <div>{pres}</div>
    </div>
  );
}

export default App;
