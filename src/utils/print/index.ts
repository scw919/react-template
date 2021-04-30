/**
 * 打印局部的网页( 兼容：ie firfox  chrome 360极速和兼容模式 )
 * @param {} dom  dom 对象，document.querySelector() 返回的对象
 * @param {*} param1 打印页面的标题{ title:'标题' }
 */
export const printPartialHtml = (dom: HTMLElement | null, { title = document.title } = {}) => {
  if (!dom) return;
  const copyDom: HTMLElement | null = document.createElement('span');
  const styleDom = document.querySelectorAll('style, link, meta');
  const titleDom = document.createElement('title');
  titleDom.innerText = title;

  copyDom.appendChild(titleDom);
  Array.from(styleDom).forEach((item) => {
    copyDom?.appendChild(item.cloneNode(true));
  });
  copyDom.appendChild(dom.cloneNode(true));

  const htmlTemp = copyDom.innerHTML;
  // copyDom = null;
  const iframeDom = document.createElement('iframe');
  interface Attr {
    height: number;
    width: number;
    border: number;
    wmode: string;
  }
  const attrObj: Attr = {
    height: 0,
    width: 0,
    border: 0,
    wmode: 'Opaque',
  };
  interface Sty {
    position: string;
    top: string;
    left: string;
  }
  const styleObj: Sty = {
    position: 'absolute',
    top: '-999px',
    left: '-999px',
  };

  Object.entries(attrObj).forEach(([key, value]) => {
    // @ts-ignore：无法被执行的代码的错误
    iframeDom.setAttribute(key, value);
  });
  Object.entries(styleObj).forEach(([key, value]) => {
    iframeDom.style[key] = value;
  });
  document.body.insertBefore(iframeDom, document.body.children[0]);
  const iframeWin = iframeDom.contentWindow; // 1.获取iframe中的window
  const iframeDocs = iframeWin?.document; // 2.获取iframe中的document
  iframeDocs?.write(`<!doctype html>`);
  iframeDocs?.write(htmlTemp);
  setTimeout(() => {
    iframeWin?.focus();
    // 兼容360浏览器的打印功能
    if (!iframeWin?.document.execCommand('print', false, undefined)) {
      // document.execCommand('print', false, null) 相当于鼠标右击 选中打印功能
      // 调用其它浏览器的打印功能
      iframeWin?.print(); // 3.开始打印
    }
    document.body.removeChild(iframeDom);
  }, 100);
};
