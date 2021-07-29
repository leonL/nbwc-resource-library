import { removeDiacritics, capitalize, tagMatchingSubstrs } from "~/plugins/helpers"; 

const filterByDatePublished = (resources, {datePublishedRangePresetId, customDatePublishedRange}) => {
  let filteredResources = resources;
  if (datePublishedRangePresetId !== 'anyDate') {
    const currentDate = new Date,
      currentMonth = currentDate.getMonth(),
      currentYear = currentDate.getFullYear();

    let presetRange = datePublishedRangePresetId,
      customRange = customDatePublishedRange,
      fromDate = null, 
      toDate = currentDate;  
      
    if (presetRange === "customDateRange" && customRange !== null) {
      fromDate = new Date(customRange.from.year, customRange.from.month);
      toDate = new Date(customRange.to.year, customRange.to.month);
    } else if (presetRange === "pastMonth") {
      fromDate = new Date(currentYear, currentMonth - 1);
    } else if (presetRange === "pastYear") {
      fromDate = new Date(currentYear - 1, currentMonth)
    }

    if (fromDate !== null) { // isNull when presetRange === "customDateRange" && customRange === null
      filteredResources = resources.filter(r => {
        let publicationDate = new Date(r.publicationYear, r.publicationMonth);
        return (publicationDate >= fromDate && publicationDate <= toDate);
      })
    }
  }  
  return filteredResources; 
}

const filterByLanguage = (resources, {languageId}) => {
  let filteredResources = resources;
  if (languageId !== "BOTH") {
    filteredResources = resources.filter(r => {
      let resourceLanguageId = r.languageId;
      return resourceLanguageId === "BOTH" || resourceLanguageId === languageId;
    })
  }
  return filteredResources;
}

const filterByGeographicScope = (resources, {geographicScopeIds}) => {
  let filteredResources = resources
  if (geographicScopeIds.length > 0) {
    filteredResources = resources.filter(r => {
      return geographicScopeIds.includes(r.geographicScopeId);
    }) 
  }
  return filteredResources;
}

const filterByContentType = (resources, {contentTypeIds}) => {
  let filteredResources = resources;

  if (contentTypeIds.length > 0 ) {
    filteredResources = resources.filter(r => {
      return r.contentTypeIds.some(id => {
        return contentTypeIds.includes(id);
      })
    })
  }

  return filteredResources;
}

const filterByIssue = (resources, {issueIds}) => {
  let filteredResources = resources;
  if (issueIds.length > 0) {
    filteredResources = resources.filter(r => {
      return r.issueIds.some(id => {
        return issueIds.includes(id)
      })
    })
  }
  return filteredResources;
}

const filterBySearchString = (resources, {searchString}, searchRegExp, locale) => {
  let filteredResources = resources;
  if (searchString.trim().length > 0) {
      
    filteredResources = resources.filter(r => {
      let localeId = r.languageId === 'BOTH' ? locale : r.languageId.toLowerCase(),
        isMatch = false;

      ['title', 'author', 'organizations', 'publication'].forEach(field => {
        let fieldName = (field === 'author' ? field : localeId + capitalize(field)),
          fieldValue = removeDiacritics(r[fieldName]),
          test = searchRegExp.test(fieldValue);
        
        if (test) {
          isMatch = true;
          r[fieldName] = tagMatchingSubstrs(r[fieldName], searchRegExp);
        }
      });

      return isMatch;
    });
  }
  return filteredResources;
}

const defaultFilterValues = {
  languageId: "BOTH",
  datePublishedRangePresetId: "anyDate",
  customDatePublishedRange: null,
  geographicScopeIds: [],
  contentTypeIds: [],
  issueIds: []
}

export { filterByDatePublished, filterByLanguage, filterByGeographicScope, 
  filterByContentType, filterByIssue, filterBySearchString, defaultFilterValues };