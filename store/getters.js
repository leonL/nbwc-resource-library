import apiConsts from "./apiConstants";

export default {
  validResources (state) {
    let resources = state.library.filter(r => {
      let isValid = true;

      if (hasLanguage(r)) {
        let langIdFieldName = apiConsts.resourceFieldNames.languageId,
          langId = r[langIdFieldName]['0'];

        if (langId === 'BOTH') {
          isValid = hasTitle(r, "EN") && hasLink(r, "EN") && hasTitle(r, "FR") && hasLink(r, "FR");
        } else {
          isValid = hasTitle(r, langId) && hasLink(r, langId);
        }
      } else {
        isValid = false;
      }
      return isValid;
    });
    return resources;
  }
}

const hasLanguage = (resource) => {
  return resource.hasOwnProperty(apiConsts.resourceFieldNames.languageId);
};

const hasTitle = (resource, langId) => {
  let resourceFieldNames = apiConsts.resourceFieldNames,
    titleFieldName = (langId === 'EN' ? resourceFieldNames.titleEn : resourceFieldNames.titleFr ); 
  return resource.hasOwnProperty(titleFieldName);
};

const hasLink = (resource, langId) => {
  let resourceFieldNames = apiConsts.resourceFieldNames,
    documentFieldName = (langId === 'EN' ? resourceFieldNames.documentEnUrl : resourceFieldNames.documentFrUrl),
    linkFieldName = (langId === 'EN' ? resourceFieldNames.linkEnUrl : resourceFieldNames.linkFrUrl ); 
  return resource.hasOwnProperty(documentFieldName) || resource.hasOwnProperty(linkFieldName);
};