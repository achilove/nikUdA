export function do_enders(word) {
    word = word.replace(
      /\u05da/g,
      '\u05db');
    word = word.replace(
      /\u05dd/g,
      '\u05de');
    word = word.replace(
      /\u05df/g,
      '\u05e0');
    word = word.replace(
      /\u05e3/g,
      '\u05e4');
    word = word.replace(
      /\u05e5/g,
      '\u05e6');
    word = word.replace(
      /\u05DB[\u05B0\u05B1\u05B2\u05B3\u05B4\u05B5\u05B6\u05B7\u05C2\u05C1\u05B9\u05BC\u05BB]*$/,
      '\u05DA');
    word = word.replace(
      /\u05DB\u05B8$/,
      '\u05DA\u05B8');
    word = word.replace(
      /\u05DE[\u05B0\u05B1\u05B2\u05B3\u05B4\u05B5\u05B6\u05B7\u05B8\u05C2\u05C1\u05B9\u05BC\u05BB]*$/,
      '\u05DD');
    word = word.replace(
      /\u05E0[\u05B0\u05B1\u05B2\u05B3\u05B4\u05B5\u05B6\u05B7\u05B8\u05C2\u05C1\u05B9\u05BC\u05BB]*$/,
      '\u05DF');
    word = word.replace(
      /\u05E4[\u05B0\u05B1\u05B2\u05B3\u05B4\u05B5\u05B6\u05B7\u05B8\u05C2\u05C1\u05B9\u05BC\u05BB]*$/,
      '\u05E3');
    word = word.replace(
      /\u05E6[\u05B0\u05B1\u05B2\u05B3\u05B4\u05B5\u05B6\u05B7\u05B8\u05C2\u05C1\u05B9\u05BC\u05BB]*$/,
      '\u05E5');
    return word;
  }


export function splitNikudsAndNotNikuds(text, nikudABRegExp, notNikudABRegExp){
    let splitteds = splitNakeds(text, nikudABRegExp, notNikudABRegExp)
    let result = splitToArrys(splitteds)
    return result
  }

  export function splitNakeds(txt, nikudABRegExp, notNikudABRegExp){
    // txt = txt.replace(/\n/g, '<br>');
    let Answer = []
    while (true) {
        var pos = txt.search(nikudABRegExp);
        if (pos > 0) {
          // Add whatever came b4 the word to the div element

          let n = txt.substring(0, pos)
          let breakPointPOs = n.search(/\n/)
          if(n !== ' '){
              if( breakPointPOs> 0){
                let breakPoint = '' + n[breakPointPOs]
                let _char = n.replace(/\n/g, '')
                Answer.push(_char)
                Answer.push(breakPoint)
              }else{
                  Answer.push(txt.substring(0, pos));
              }
            }
          txt = txt.substr(pos);
    
        }
        if (pos < 0) {
          Answer.push(txt);
          return Answer
        }
        // Now our text begins with the next word
        var last = txt.search(notNikudABRegExp);
        if (last < 0) {
          // Add eof case
          last = txt.length;
        }
        var word = do_enders(txt.substr(0, last));
        Answer.push(word);
        txt = txt.substr(last);
      }

  }

  export function splitToArrys(words){
    return words.join(' ').split(/\n/g).map(item => item.split(' ').filter(l => l.length>0))
  }

export function splitWholeNikuds (brokenWord, ABRegExp=/[אבגדהוזחטיכךלמםנןסעפףצץקרשת]/g){
  let result = []
  while (true) {
      var pos = brokenWord.search(ABRegExp);
      if (pos === -1) {
        break;
      }
      var posLast = brokenWord.substr(pos + 1).search(ABRegExp);
      if (posLast === -1) {
        posLast = brokenWord.length;
      }
      else {
        posLast = posLast + pos + 1;
      }
  
      // Add the single letter as span element
      result.unshift(brokenWord.substr(pos, posLast))
      // Move to next letter
      brokenWord = brokenWord.substr(posLast);
    }

    return result
}

export function setDraft(
  current, value, nikudRegExp = /[\u05b0\u05b1\u05b2\u05b3\u05b4\u05b5\u05b6\u05b7\u05b8\u05c2\u05c1\u05b9\u05bc\u05bb]/g, 
  sinNikudRegExp = /[ׁׂ]/g,
  dageshRegExp = /ּ/g,
  notSinNikudRegExp = /[ְֱֲֳִֵֶַָֹֻ]/g
  ) {
  
  // The idea is that there could be a shin sin sound, a movement and a
  // hiphen at most on any single letter
  if (value === ' ') {
    current = current.replace(nikudRegExp, '');
  }
  else if ((value === 'ׂ') || (value === 'ׁ') ||
      (value === 'ׁׂ') || (value === 'ׁׂ')) {
    if (current.search('ש') !== -1) {
      if (value.length === 1) {
        current = current.replace(sinNikudRegExp, '');
        current += value;
      }
      // We have an option of alternating shin sin sounds in memory of sagi
      // shagi saval shoval
      else {
        if (current.search('') !== -1) {
          current = current.replace(sinNikudRegExp, '');
          current += 'ׁ';
        }
        else {
          current = current.replace(sinNikudRegExp, '');
          current += 'ׂ';
        }
      }
    } else {
      // ERROR handling
    }
  }
  else if (value === 'ּ') {
    // h' is not here because it can have a mapik
    // the rest of the letters can't accept doubling
    // (except r in very esoteric cases)
    if (current.search('[אעחר]') === -1) {
      if (current.search(dageshRegExp) === -1) {
        if (current.search('ו') !== -1) {
          current = current.replace(nikudRegExp, '');
        }
        current += value;
      }
    }
  }
  else {
    if (current.search(nikudRegExp) !== -1) {
      if (current.search('ו') !== -1) {
        current = current.replace(dageshRegExp, '');
      }
      current = current.replace(notSinNikudRegExp, '');
    }
    current += value;
  }
  return current
}

export function isSin(letter){
  return letter == 'ש'
}

export let vowels = {
  'ׂ': "שׂין",
  'ׁ': "שׁין",
  'ֻ': "קובוץ",
  'ּ': "דּגש, שוּרוק, מפיק",
  'ֹ': "חולם מלא",
  'ָ': "קָמץ",
  'ַ': "פַתח",
  'ֶ': "סֶגול",
  'ֵ': "צֵירי",
  'ִ': "חִיריק",
  'ֳ': "חטף קֳמץ",
  'ֲ': "חטף פֲתח",
  'ֱ': "חטף סֱגול",
  'ְ': "שְווא"
}