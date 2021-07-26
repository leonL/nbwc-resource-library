import Vue from 'vue'

const removeDiacritics = str => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const tagMatchingSubstrs = (text, regEx) => {
  const ot = "<mark>", ct = "</mark>", 
    textWithoutDiacritics = removeDiacritics(text)
  let textMarked = text, counter = 0, markTagsOffset = (ot + ct).length;
  
  textWithoutDiacritics.replace(regEx, (match, offset) => {
    let totalOffset = offset + markTagsOffset * counter
    textMarked = textMarked.substr(0, totalOffset) + ot + 
      textMarked.substr(totalOffset, match.length) + ct + 
      textMarked.substr(totalOffset + match.length, textMarked.length -1)
    counter++
    return match
  })
  
  return textMarked
}

Vue.prototype.$removeDiacritics = removeDiacritics;

export { removeDiacritics, capitalize, tagMatchingSubstrs };