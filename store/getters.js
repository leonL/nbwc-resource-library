import apiConstants from "./apiConstants";

const resourceFieldNames = apiConstants.resourceFieldNames;

export default {
  validResources (state) {
    let resources = state.library.filter(r => {
      let isValid = true;

      if (!hasPublishedDate(r)) return isValid = false;

      if (hasLanguage(r)) {
        let langIdFieldName = resourceFieldNames.languageId,
          langId = r[langIdFieldName]['0'];

        if (langId === 'BOTH') {
          isValid = hasTitle(r, "EN") && hasLink(r, "EN") && hasTitle(r, "FR") && hasLink(r, "FR");
        } else {
          isValid = hasTitle(r, langId) && hasLink(r, langId);
        }
      } else {
        return isValid = false;
      }

      return isValid;
    });
    return resources;
  }
}

const hasLanguage = (resource) => {
  return resource.hasOwnProperty(resourceFieldNames.languageId);
};

const hasTitle = (resource, langId) => {
  return resource.hasOwnProperty(resourceFieldNames.title(langId));
};

const hasLink = (resource, langId) => {
  return resource.hasOwnProperty(resourceFieldNames.document(langId)) || resource.hasOwnProperty(resourceFieldNames.link(langId));
};

const hasPublishedDate = (resource) => {
  return resource.hasOwnProperty(resourceFieldNames.publicationMonth) && resource.hasOwnProperty(resourceFieldNames.publicationYear); 
};