//扩大可点击区域
const extendClick = () => {
  return `
    position: relative;
    &:before{
      content: '';
      position: absolute;
      top: -10px; bottom: -10px; left: -10px; right: -10px;
    };
  `
}

const singleLineEllipsis = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}

const multiLineEllipsis = (lines: number) => {
  return `
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${lines};
    -webkit-box-orient: vertical;
  `
}

const textShadowOnImage = () => {
  return `
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    background: linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0)
    );
  `
}

const commonStyle = {
  'theme-color': '#d44439',
  'theme-color-shadow': 'rgba(212, 68, 57, .5)',
  'font-color-light': '#e4e4e4',
  'font-color-light-active': '#f1f1f1',
  'font-color-desc': '#2E3030',
  'font-color-desc-v2': '#bba8a8',
  'font-size-ss': '10px',
  'font-size-s': '12px',
  'font-size-m': '14px',
  'font-size-l': '16px',
  'font-size-ll': '18px',
  'border-color': '#e4e4e4',
  'background-color': '#f2f3f4',
  'background-color-shadow': 'rgba(0, 0, 0, 0.3)',
  'highlight-background-color': '#fff',
  extendClick,
  singleLineEllipsis,
  multiLineEllipsis,
  textShadowOnImage,
}

export default commonStyle
