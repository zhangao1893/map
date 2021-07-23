import React, { useEffect, useState } from 'react';
import PDFObject from 'pdfobject';
export default function test2() {
  const [page, setPage] = useState(1);
  useEffect(() => {
    PDFObject.embed(`${publicPath}/static/other/pdf.pdf`, '#my-container', { page: '15' });
  }, []);
  const add = () => {
    const newPage = page + 1;
    setPage(newPage);
    PDFObject.embed(`${publicPath}/static/other/pdf.pdf`, '#my-container', { page: `${newPage.toString()}` });
    console.log(`${publicPath}/static/other/pdf.pdf`, '#my-container', { page: `${newPage.toString()}` });
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        id="my-container"
        style={{ width: '50vw', height: '90vh', margin: '0 auto', border: '1px solid #000' }}></div>
      <div onClick={add}>加</div>
    </div>
  );
}
