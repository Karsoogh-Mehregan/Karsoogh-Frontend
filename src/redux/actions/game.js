import { CALL_API } from '../middleware/api/api';
import * as actionTypes from '../actionTypes';
import * as urls from './urls';


export const getPlayerInfo = ({ gameId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_PLAYER_INFO_REQUEST,
      actionTypes.GET_PLAYER_INFO_SUCCESS,
      actionTypes.GET_PLAYER_INFO_FAILURE,
    ],
    url: urls.PLAYER(gameId),
    fetchOptions: {
      method: 'GET',
    },
  },
});


export const getAllSingleProblems = ({ gameId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_ALL_SINGLE_PROBLEMS_REQUEST,
      actionTypes.GET_ALL_SINGLE_PROBLEMS_SUCCESS,
      actionTypes.GET_ALL_SINGLE_PROBLEMS_FAILURE,
    ],
    url: urls.SINGLE_PROBLEMS(gameId),
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getAllMultipleProblems = ({ gameId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_ALL_MULTIPLE_PROBLEMS_REQUEST,
      actionTypes.GET_ALL_MULTIPLE_PROBLEMS_SUCCESS,
      actionTypes.GET_ALL_MULTIPLE_PROBLEMS_FAILURE,
    ],
    url: urls.MULTIPLE_PROBLEMS(gameId),
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getAllSubjects = ({ gameId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_ALL_SUBJECTS_REQUEST,
      actionTypes.GET_ALL_SUBJECTS_SUCCESS,
      actionTypes.GET_ALL_SUBJECTS_FAILURE,
    ],
    url: urls.SUBJECTS(gameId),
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getRandomSingleProblem = ({ gameId, difficulty, subject }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_RANDOM_SINGLE_PROBLEM_REQUEST,
      actionTypes.GET_RANDOM_SINGLE_PROBLEM_SUCCESS,
      actionTypes.GET_RANDOM_SINGLE_PROBLEM_FAILURE,
    ],
    url: urls.SINGLE_PROBLEMS(gameId),
    fetchOptions: {
      method: 'POST',
      body: { difficulty, subject }
    },
  },
});

export const getSpecificSingleProblem = ({ gameId, problemId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_SPECIFIC_SINGLE_PROBLEM_REQUEST,
      actionTypes.GET_SPECIFIC_SINGLE_PROBLEM_SUCCESS,
      actionTypes.GET_SPECIFIC_SINGLE_PROBLEM_FAILURE,
    ],
    url: `${urls.SINGLE_PROBLEMS(gameId)}${problemId}/`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getRandomMultipleProblem = ({ gameId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_RANDOM_MULTIPLE_PROBLEM_REQUEST,
      actionTypes.GET_RANDOM_MULTIPLE_PROBLEM_SUCCESS,
      actionTypes.GET_RANDOM_MULTIPLE_PROBLEM_FAILURE,
    ],
    url: urls.MULTIPLE_PROBLEMS(gameId),
    fetchOptions: {
      method: 'POST',
    },
  },
});

export const getSpecificMultipleProblem = ({ gameId, problemId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_SPECIFIC_MULTIPLE_PROBLEM_REQUEST,
      actionTypes.GET_SPECIFIC_MULTIPLE_PROBLEM_SUCCESS,
      actionTypes.GET_SPECIFIC_MULTIPLE_PROBLEM_FAILURE,
    ],
    url: `${urls.MULTIPLE_PROBLEMS(gameId)}${problemId}/`,
    fetchOptions: {
      method: 'GET',
    },
  },
});


// todo: add file
export const submitSingleProblemAnswer = ({ gameId, problemId, answer }) => ({
  [CALL_API]: {
    types: [
      actionTypes.SUBMIT_SINGLE_PROBLEM_ANSWER_REQUEST,
      actionTypes.SUBMIT_SINGLE_PROBLEM_ANSWER_SUCCESS,
      actionTypes.SUBMIT_SINGLE_PROBLEM_ANSWER_FAILURE,
    ],
    url: `${urls.SINGLE_PROBLEMS(gameId)}${problemId}/`,
    fetchOptions: {
      method: 'POST',
      body: {
        answer
      }
    },
  },
});

export const submitMultipleProblemAnswer = ({ gameId, problemId, answer }) => ({
  [CALL_API]: {
    types: [
      actionTypes.SUBMIT_MULTIPLE_PROBLEM_ANSWER_REQUEST,
      actionTypes.SUBMIT_MULTIPLE_PROBLEM_ANSWER_SUCCESS,
      actionTypes.SUBMIT_MULTIPLE_PROBLEM_ANSWER_FAILURE,
    ],
    url: `${urls.MULTIPLE_PROBLEMS(gameId)}${problemId}/`,
    fetchOptions: {
      method: 'POST',
      body: {
        answer
      }
    },
  },
});
