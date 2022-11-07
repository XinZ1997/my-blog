import { React, useState } from 'react';
import './index.css';
import importExcel from '../../utils/import-excel';
import { PRODUCT_NAME, BUSINESS_TYPE, enumBusinessType } from './config';

export default function Excel2List() {
  const [list, setList] = useState([]);
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
        <div className="list-body" key={item[PRODUCT_NAME]}>
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
    setList(arr);
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => {
          importExcel(e, importExcelCallback);
        }}
      />
      {list.length > 0 && (
      <div className="list-header">
        <p className="name">{PRODUCT_NAME}</p>
        <p className="enter">{enumBusinessType.enter}</p>
        <p className="refund">{enumBusinessType.refund}</p>
      </div>
      )}
      <div>{list}</div>
    </div>
  );
}
