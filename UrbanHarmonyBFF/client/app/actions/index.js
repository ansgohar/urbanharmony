export function retrieveArticle(articles) {
  console.log(articles);
  return ({
    type: 'RETRIEVE_ARTICLE',
    articles
  });
};

export function getNews(news) {
  console.log(news);
  return ({
    type: 'GET_NEWS',
    news
  });
};

export function getProject(oneproject) {
  console.log(oneproject);
  return ({
    type: 'GET_PROJECT',
    oneproject
  });
};

export function getPressNews(pressNews) {
  console.log(pressNews);
  return ({
    type: 'GET_PRESSNEWS',
    pressNews
  });
};

export function getInternalByID(internalDetail) {
  console.log(internalDetail);
  return ({
    type: 'GET_INTERNAL_BY_ID',
    internalDetail
  });
};

export function getInternalNews(internalnews) {
  console.log(internalnews);
  return ({
    type: 'GET_INTERNALNEWS',
    internalnews
  });
};

export function getALLInternalNews(allinternalnews) {
  console.log(allinternalnews);
  return ({
    type: 'GET_ALL_INTERNAL_NEWS',
    allinternalnews
  });
};

  export function retrieveDetail(detail) {
    console.log(detail);
    return ({
      type: 'RETRIEVE_DETAIL',
      detail
    });
  };

  export function getWorkingProject(working) {
    console.log(working);
    return ({
      type: 'RETRIEVE_WORKING',
      working
    });
  };

  export function getPlannedProject(planned) {
    console.log(planned);
    return ({
      type: 'RETRIEVE_PLANNED',
      planned
    });
  };

  export function getDoneProject(done) {
    console.log(done);
    return ({
      type: 'RETRIEVE_DONE',
      done
    });
  };

  export function getCompetitionOfTheMonth(competition) {
    return ({
      type: 'RETRIEVE_COMPETITION_OF_THE_MONTH',
      competition
    })
  }

  export function getAllCompetitions(allCompetitions) {
    return ({
      type: 'RETRIEVE_ALL_COMPETITIONS',
      allCompetitions
    })
  }

  export function getAllWorkingProject(allworking) {
    console.log(allworking);
    return ({
      type: 'RETRIEVE_ALL_WORKING',
      allworking
    });
  };

  export function getAllPlannedProject(allplanned) {
    console.log(allplanned);
    return ({
      type: 'RETRIEVE_ALL_PLANNED',
      allplanned
    });
  };

  export function getAllDoneProject(alldone) {
    console.log(alldone);
    return ({
      type: 'RETRIEVE_ALL_DONE',
      alldone
    });
  };

  export function getProjectID(projectDetail) {
    console.log(projectDetail);
    return ({
      type: 'RETRIEVE_PROJECT_BY_ID',
      projectDetail
    });
  };

  export function getComplainsSurveyList(surveyList) {
    console.log(surveyList);
    return ({
      type: 'RETRIEVE_COMPLAINS_SURVEY_LIST',
      surveyList
    });
  };

  export function addImageToTheList(photos) {
    console.log(photos);
    return ({
      type: 'ADD_IMAGE_TO_THE_LIST',
      photos
    });
  };

  export function getComplainsGovernorates(governorates) {
    console.log(governorates);
    return ({
      type: 'RETRIEVE_GOVERNORATES',
      governorates
    });
  };

  export function getComplainsRegions(regions) {
    console.log(regions);
    return ({
      type: 'RETRIEVE_REGIONS',
      regions
    });
  };

  export function getLaws(laws) {
    console.log(laws);
    return ({
      type: 'RETRIEVE_LAWS',
      laws
    });
  };

  export function getBorders(borders) {
    console.log(borders);
    return ({
      type: 'RETRIEVE_BORDERS',
      borders
    });
  };

  export function getGuidelines(guidelines) {
    console.log(guidelines);
    return ({
      type: 'RETRIEVE_GUIDELINES',
      guidelines
    });
  };

  export function getComplainsList(complainsList) {
    console.log(complainsList);
    return ({
      type: 'RETRIEVE_COMPLAINS_LIST',
      complainsList
    });
  };

  export function getGlobalSearch(globalsearch) {
    console.log(globalsearch);
    return ({
      type: 'RETRIEVE_GLOBAL_SEARCH',
      globalsearch
    });
  };

  export function getWinners(winners) {
    console.log(winners);
    return ({
      type: 'RETRIEVE_COMPETITION_WINNERS',
      winners
    });
  };

  export function getCompetitionID(competitionID) {
    console.log(competitionID);
    return ({
      type: 'RETRIEVE_COMPETITION_BY_ID',
      competitionID
    });
  };


  export function getLibraryBooks(books) {
    console.log(books);
    return ({
      type: 'RETRIEVE_LIBRARY_BOOKS',
      books
    });
  };


  export function getConsultingOffices(offices) {
    console.log(offices);
    return ({
      type: 'RETRIEVE_CONSULTING_OFFICES',
      offices
    });
  };

  export function getConsultingOfficeDetails(officeDetails) {
    console.log(officeDetails);
    return ({
      type: 'RETRIEVE_CONSULTING_OFFICE_DETAILS',
      officeDetails
    });
  };
  
  export function getIncidents(incidents) {
    console.log(incidents);
    return ({
      type: 'RETRIEVE_INCIDENTS',
      incidents
    });
  };

  export function getIncidentDetails(incidentDetails) {
    console.log(incidentDetails);
    return ({
      type: 'RETRIEVE_INCIDENT_DETAILS',
      incidentDetails
    });
  };

  export function getVideos(videos) {
    console.log(videos);
    return ({
      type: 'RETRIEVE_VIDEOS',
      videos
    });
  };