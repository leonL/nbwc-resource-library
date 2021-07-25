import { removeDiacritics, capitalize, tagMatchedText } from "~/plugins/helpers"; 

export default {
  resources: (state, {locale, searchRegExp, searchString, searchFields}) => {
    let resources = state.library.map(resource => ({...resource}));

    if (searchString.trim().length > 0) {
      
      resources = resources.filter(r => {
        let localeId = r.languageId === 'BOTH' ? locale : r.languageId.toLowerCase(),
          isMatch = false;

        searchFields.forEach(field => {
          let fieldName = (field === 'author' ? field : localeId + capitalize(field)),
            fieldValue = removeDiacritics(r[fieldName]),
            test = searchRegExp.test(fieldValue);
          
          if (test) {
            isMatch = true;
            r[fieldName] = tagMatchedText(r[fieldName], searchRegExp);
          }
        });

        return isMatch;
      });
    }

    return resources;
  },
  
  searchString: state => {
    return state.filters.searchString;
  },

  searchRegExp: (state, getters) => {
    let searchString = getters.searchString.trim();
    return new RegExp(removeDiacritics(searchString), 'gi');
  },

  searchFields: state => {
    return state.filters.searchFields;
  },

  locale: (state) => {
    return state.locale;
  } 
}  