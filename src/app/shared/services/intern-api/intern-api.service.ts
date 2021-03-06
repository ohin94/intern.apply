import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { Job } from '../../models/job.model';

const BASE_URL = environment.host;

@Injectable()
export class InternApiService {

  constructor(private http: Http) { }

  /**
   * get all the jobs from internAPI
   * @returns Observable holding list of jobs
   */
  public getAllJobs(filterText?: string): Observable<any> {
    return this.http.get(BASE_URL + '/api/job', { params: { filter: filterText } }).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * get a specific job from the db
   * @returns Observable holding job details
   */
  public getJob(id: number): Observable<any> {
    return this.http.get(BASE_URL + '/api/job/' + id).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * add job to the database
   * @param job job to be added to the database
   */
  public addJob(job: Job) {
    return this.http.post(BASE_URL + '/api/job', job).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * post a new "contact-us" message
   * @param email email of the message sender
   * @param title title of the message
   * @param message message body
   */
  public sendContactMessage(email: string, title: string, message: string): Observable<any> {
    return this.http.post(BASE_URL + '/api/contactMessage', { email, title, message }).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * post a new comment to a job
   * @param jobID   the id of the job to send the comment to
   * @param message the body of the comment
   * @param author  the name of the author
   */
  public addComment(jobID: number, message: string, author: string): Observable<any> {
    return this.http.post(BASE_URL + '/api/comment', { jobID, message, author }).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * get all the comments posted for a job
   * @param jobID the id of the job
   */
  public getAllCommentsOfJob(jobID: number): Observable<any> {
    return this.http.get(BASE_URL + `/api/job/${jobID}/comments`).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * post a new comment to a job
   * @param jobID   the id of the job to send the comment to
   * @param message the body of the comment
   * @param author  the name of the author
   */
  public addSalary(jobID: number, salary: number, salaryType: number): Observable<any> {
    return this.http.post(BASE_URL + '/api/salary', { jobID, salary, salaryType }).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * get the survey questions and allowed responses from internAPI
   * @returns Observable holding list of questions with a list of their allowed responses
   */
  public getSurvey(): Observable<any> {
    return this.http.get(BASE_URL + '/api/survey').map((res: Response) => {
      return res.json();
    });
  }

  /**
   * send the survey responses to the server, question responses should be ordered in the same way the questions are in the survey
   * @returns Observable holding list of the answers sent
   */
  public sendSurveyResponses(answers: Array<String>): Observable<any> {
    return this.http.post(BASE_URL + '/api/Survey', { answers }).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * get all the Q&A questions from internAPI
   * @returns Observable holding list of questions
   */
  public getAllQuestions(): Observable<any> {
    return this.http.get(BASE_URL + '/api/question').map((res: Response) => {
      return res.json();
    });
  }

  /**
   * getting a rating of a job
   * @param {number} jobId
   */
  public getJobRating(jobId: number): Observable<any> {
    return this.http.get(`${BASE_URL}/api/job/${jobId}/rating`).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * Add a new question to the Q&A board
   * @param title   the title of the question
   * @param body    the question itslef
   * @param author  the author of the question
   */
  public addQuestion(title: string, body: string, author: string): Observable<any> {
    return this.http.post(BASE_URL + '/api/question', { title, body, author }).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * get a question by id from the server
   * @param id The id of the question
   */
  public getQuestionById(id: number): Observable<any> {
    return this.http.get(BASE_URL + '/api/question/' + id).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * rate a job
   * @param {number} jobId
   * @param {number} score
   */
  public rateJob(jobId: number, score: number): Observable<any> {
    return this.http.post(`${BASE_URL}/api/job/${jobId}/rating`, { score }).map((res: Response) => {
      return res.json();
    });
  }

    /**
     * add an answer to a question
     * @param {number} questionId
     * @param {string} body the body of the answer
     * @param {string} author
     */
  public addAnswer(questionId: number, body: string, author: string): Observable<any> {
    return this.http.post(`${BASE_URL}/api/question/${questionId}/answers`, { body, author }).map((res: Response) => {
      return res.json();
    });
  }

    /**
     * get the answer of a question
     * @param {number} questionId
     */
  public getAnswers(questionId: number): Observable<any> {
    return this.http.get(`${BASE_URL}/api/question/${questionId}/answers`).map((res: Response) => {
      return res.json();
    });
  }
}
