!(async () => {
  const $ = (Selector, el) => (el || document).querySelector(Selector);

  const currentScript = document.currentScript;
  const path = currentScript.getAttribute('path');
  const input = HM.$('s-txt');
  const res = HM.$('s-res');
  

  const response = await fetch(path);
  const datas = (await response.json()).map((item) => {
    // 转换编码
    item.content=ZLStringDecompress(item.content);
    return item;
  });
  input.addEventListener('input', () => {
    const value = input.value.trim();
    const keywords = value.split(/[\s\-]+/);

    res.innerHTML = ''
    const cdf = document.createDocumentFragment()
    const ul = document.createElement('ul')

    datas.forEach(ele => {
      var dataTitle = ele.title.trim();
      var dataContent = ele.content
      .trim()
      .replace(/<[^>]+>/g, '')
      .toLowerCase();
      var dataUrl = ele.url.startsWith('/') ? ele.url : '/' + ele.url;
      // 出现位置 切片用
      var indexTitle = -1;
      var indexContent = -1;
      if (dataContent && keywords[0]) {
        keywords.forEach((keyword,i)=>{
          indexTitle = dataTitle.indexOf(keyword);
          indexContent = dataContent.indexOf(keyword);
          // no result
          if(indexTitle<0 && indexContent<0){
            return;
          }else{
            // highlight keywords
            var reg = new RegExp(`(${keyword})`, 'gi');
            var key = '<span class="s-key">$1</span>';
            dataTitle = dataTitle.replace(reg, key)

            var start = indexContent - 10;
            var end = indexContent + 50;
            var matchContent = (dataContent.substring(start, end)).replace(reg,key)
            const a = document.createElement('a');
            const p = document.createElement('div')
            const title = document.createElement('span')
            const content = document.createElement('span')
            a.href = dataUrl
            a.addEventListener('click', () => {
              document.body.classList.remove('search')
            })
            p.className="s-item"
            title.className="s-res-tit"
            content.className="s-res-con"
            title.innerHTML=dataTitle
            content.innerHTML=matchContent+"..."
            a.appendChild(title)
            a.appendChild(content)
            p.appendChild(a)
            cdf.appendChild(p)
          }

        })
      }

    });

    res.appendChild(cdf)
  });
  
  function ZLStringDecompress(compressed) { 
    const f = String.fromCharCode;
    const length = compressed.length;
    const resetValue = 32768;
    if (!compressed) return '';
    var dictionary = [],
      enlargeIn = 4,
      dictSize = 4,
      numBits = 3,
      entry = '',
      result = [],
      i,
      w,
      bits,
      resb,
      maxpower,
      power,
      c,
      data = { val: compressed.charCodeAt(0), position: resetValue, index: 1 };

    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    };

    bits = 0;
    maxpower = Math.pow(2, 2);
    power = 1;
    while (power != maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position == 0) {
        data.position = resetValue;
        data.val = compressed.charCodeAt(data.index++);
      };
      bits |= (resb > 0 ? 1 : 0) * power;
      power <<= 1;
    };

    switch ((next = bits)) {
      case 0:
        bits = 0;
        maxpower = Math.pow(2, 8);
        power = 1;;
        while (power != maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (data.position == 0) {
            data.position = resetValue;
            data.val = compressed.charCodeAt(data.index++);
          };
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        };
        c = f(bits);
        break;
      case 1:
        bits = 0;
        maxpower = Math.pow(2, 16);
        power = 1;
        while (power != maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (data.position == 0) {
            data.position = resetValue;
            data.val = compressed.charCodeAt(data.index++);
          };
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        };
        c = f(bits);
        break
      case 2:
        return '';
    }
    dictionary[3] = c;
    w = c;
    result.push(c);
    while (true) {
      if (data.index > length) {
        return '';
      };

      bits = 0;
      maxpower = Math.pow(2, numBits);
      power = 1;
      while (power != maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = resetValue;
          data.val = compressed.charCodeAt(data.index++);
        };
        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      };

      switch ((c = bits)) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2, 8);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = compressed.charCodeAt(data.index++);
            };
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          };

          dictionary[dictSize++] = f(bits);
          c = dictSize - 1;
          enlargeIn--;
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2, 16);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = compressed.charCodeAt(data.index++);
            };
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = f(bits);
          c = dictSize - 1;
          enlargeIn--;
          break;
        case 2:
          return result.join('');
      };

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      };

      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        };
      };
      result.push(entry);
      dictionary[dictSize++] = w + entry.charAt(0);
      enlargeIn--;

      w = entry;

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      };
    };
  };
})()