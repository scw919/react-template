import { exportWord } from 'mhtml-to-word';

/**
 * 导出word
 * @param dom 选择的节点
 * @param fileName 导出文件的名称
 * @param styles 自定义样式（标签）
 * @returns
 */
export const exportWordFuc = (dom: HTMLElement | null, fileName: string, styles?: string) => {
  if (!dom) return;
  let copyDom: any = document.createElement('span');
  const cloneDom: any = dom.cloneNode(true);
  copyDom.appendChild(cloneDom);

  const htmlTemp = copyDom.innerHTML;
  copyDom = null;
  // console.log('htmlTemp=', htmlTemp)
  const iframeDom = document.createElement('iframe');
  const attrObj = {
    height: '0px',
    width: '0px',
    border: '0px',
    wmode: 'Opaque',
  };
  const styleObj = {
    position: 'absolute',
    top: '-999px',
    left: '-999px',
  };
  Object.entries(attrObj).forEach(([key, value]) => {
    iframeDom.setAttribute(key, value);
  });
  Object.entries(styleObj).forEach(([key, value]) => {
    iframeDom.style[key] = value;
  });
  document.body.insertBefore(iframeDom, document.body.children[0]);
  const iframeWin: any = iframeDom.contentWindow; // 1.获取iframe中的window
  const iframeDocs = iframeWin.document; // 2.获取iframe中的document
  iframeDocs.write(`<!doctype html>`);
  iframeDocs.write(htmlTemp);

  const htmlDoc = `
  <!DOCTYPE html>
  <html lang="en">
  ${iframeDocs.documentElement.innerHTML}
  </html>
  `;
  const exportOpts = {
    mhtml: htmlDoc, // 将转化好的内容放到mhtml这个参数中
    // data: { title: 'exportword' },
    filename: fileName,
    style: styles, // 标签样式
  };
  exportWord(exportOpts);
};
