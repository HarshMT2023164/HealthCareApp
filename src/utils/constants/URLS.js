export const BASE_URL = "http://192.168.0.103:8080";


//authentication

export const signIn = "/auth/signin";

export const forgotPassword = "/auth/forgotPassword";

export const resetPassword = "/auth/resetPassword";

export const changePassword = "/auth/changePassword";


//admin
export const getDoctor = "/admin/getDoctors";

export const getSupervisors = "/admin/getSupervisors";

export const getFHW = "/admin/getFieldHealthCareWorkers";

export const addDoctor = "/admin/addDoctor";

export const addSupervisor = "/admin/addSupervisor";

export const addFHW = "/admin/addFieldHealthCareWorker";

export const getUnallocatedDistricts = "/blackBox/getUnallocatedDistricts";

export const getAllDistricts = "/blackBox/getAllDistricts";

export const updateDoctor = "/admin/updateDoctor";

export const updateSupervisor = "/admin/updateSupervisor";

export const updateFieldHealthCareWorker = "/admin/updateFieldHealthCareWorker";

export const getCitizenList = "/admin/viewCitizens";

export const getRoleCounts = "/admin/getRoleCounts";



//supervisor

export const getLocalAreas = "/supervisor/getLocalAreasWithinDistrict?";

export const getByUsername = "/FieldHealthCareWorker/getByUsername?";

export const assignWorkerToLocalArea= "/supervisor/assignFHWToLocalArea";

export const getUnassignedFHW = "/supervisor/getUnassignedFHW?";
 
export const getSupervisor = "/supervisor/getByUsername?";

export const setSupervisor = "/supervisor/updateSupervisor";

export const LOGIN_URL = "/auth/signin";

//Doctor Urls

export const GET_PATIENT_LIST = "/doctor/getPatientsbyDocID";

export const GET_ICD_CODES = "/blackBox/getICD10Codes";

export const ADD_PRESCRIPTION = "/doctor/createHealthRecord";

export const UPDATE_PRESCRIPTION = "/doctor/editHealthRecord";

export const ADD_FOLLOWUP = "/doctor/addFollowUp";

export const FETCH_QUESTIONNAIRE = "/blackBox/getQuestionnaire";

export const FETCH_RESPONSES  = "/doctor/getResponseByABHAId";

//Receptionist Urls

export const GET_PATIENT_LIST_BY_HOSPITAL = "";

export const GET_DOCTORS_LIST_BY_HOSPITAL = "";

export const ASSIGN_DOCTOR_TO_PATIENT = "";

export const GET_RECEPTIONIST = "";

export const SET_RECEPTIONIST = "";


