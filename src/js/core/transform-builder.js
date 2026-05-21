export function buildTransformAndFilter(props) {
  const result = { ...props };
  const transforms = [];
  
  // Mapping transform properties
  if ('x' in props) transforms.push(`translateX(${typeof props.x === 'number' ? props.x + 'px' : props.x})`);
  if ('y' in props) transforms.push(`translateY(${typeof props.y === 'number' ? props.y + 'px' : props.y})`);
  if ('scale' in props) transforms.push(`scale(${props.scale})`);
  if ('scaleX' in props) transforms.push(`scaleX(${props.scaleX})`);
  if ('scaleY' in props) transforms.push(`scaleY(${props.scaleY})`);
  if ('rotate' in props) transforms.push(`rotate(${typeof props.rotate === 'number' ? props.rotate + 'deg' : props.rotate})`);
  if ('rotateX' in props) transforms.push(`rotateX(${typeof props.rotateX === 'number' ? props.rotateX + 'deg' : props.rotateX})`);
  if ('rotateY' in props) transforms.push(`rotateY(${typeof props.rotateY === 'number' ? props.rotateY + 'deg' : props.rotateY})`);
  if ('skewX' in props) transforms.push(`skewX(${typeof props.skewX === 'number' ? props.skewX + 'deg' : props.skewX})`);
  if ('skewY' in props) transforms.push(`skewY(${typeof props.skewY === 'number' ? props.skewY + 'deg' : props.skewY})`);
  
  if (transforms.length > 0) {
    result.transform = transforms.join(' ');
    // Remove custom transform keys from standard styles payload
    ['x', 'y', 'scale', 'scaleX', 'scaleY', 'rotate', 'rotateX', 'rotateY', 'skewX', 'skewY'].forEach(k => delete result[k]);
  }
  
  // Mapping filter properties
  if ('blur' in props) {
    const currentFilter = result.filter || '';
    const blurStr = `blur(${typeof props.blur === 'number' ? props.blur + 'px' : props.blur})`;
    result.filter = currentFilter ? `${currentFilter} ${blurStr}` : blurStr;
    delete result.blur;
  }
  
  return result;
}
