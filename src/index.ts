import TokenRequestFactory from './TokenRequestFactory';
import FetchRequestPerformer from './FetchRequestPerformer';
import FetchRequestParser from './FetchRequestParser';

import {
  Comment,
  CreateTaskParams,
  CurrentMember,
  Epic,
  EpicChange,
  File,
  FileChange,
  ID,
  Iteration,
  IterationChange,
  Label,
  LinkedFile,
  LinkedFileChange,
  Member,
  Project,
  ProjectChange,
  Repository,
  RequestFactory,
  RequestPerformer,
  ResponseParser,
  Story,
  StoryChange,
  StoryLink,
  StoryLinkChange,
  StorySearchResult,
  Task,
  Team,
  UpdateTaskParams,
  Workflow,
} from './types';

export * from './types';

const API_BASE_URL = 'https://api.clubhouse.io';
const API_VERSION = 'v3';

/** */
type ClientConfig = {
  baseURL: string;
  version: string;
};

const defaultConfig = {
  baseURL: API_BASE_URL,
  version: API_VERSION,
};

/**
 * @class Client
 */
class Client<RequestType, ResponseType> {
  requestFactory: RequestFactory<RequestType>;

  requestPerformer: RequestPerformer<RequestType, ResponseType>;

  responseParser: ResponseParser<ResponseType>;

  constructor(
    requestFactory: RequestFactory<RequestType>,
    requestPerformer: RequestPerformer<RequestType, ResponseType>,
    responseParser: ResponseParser<ResponseType>,
  ) {
    this.requestFactory = requestFactory;
    this.requestPerformer = requestPerformer;
    this.responseParser = responseParser;
  }

  /** */
  static create(
    token: string,
    config: ClientConfig = defaultConfig,
  ): Client<RequestInfo, Response> {
    const { baseURL, version } = config;
    return new Client(
      new TokenRequestFactory(token, baseURL, version),
      new FetchRequestPerformer(),
      new FetchRequestParser(),
    );
  }

  listResource<T>(
    uri: string,
    params?: Record<string, any> | null | undefined,
  ): Promise<Array<T>> {
    return this.getResource(uri, params);
  }

  getResource<T>(
    uri: string,
    params?: Record<string, any> | null | undefined,
  ): Promise<T> {
    const request = params
      ? this.requestFactory.createRequest(uri, 'GET', params)
      : this.requestFactory.createRequest(uri);
    return this.requestPerformer
      .performRequest(request)
      .then(this.responseParser.parseResponse);
  }

  createResource<T>(uri: string, params: Record<string, any>): Promise<T> {
    const request = this.requestFactory.createRequest(uri, 'POST', params);
    return this.requestPerformer
      .performRequest(request)
      .then(this.responseParser.parseResponse);
  }

  updateResource<T>(uri: string, params: Record<string, any>): Promise<T> {
    const request = this.requestFactory.createRequest(uri, 'PUT', params);
    return this.requestPerformer
      .performRequest(request)
      .then(this.responseParser.parseResponse);
  }

  deleteResource<T>(uri: string, params?: Record<string, any>): Promise<T> {
    const request = this.requestFactory.createRequest(uri, 'DELETE', params);
    return this.requestPerformer
      .performRequest(request)
      .then(this.responseParser.parseResponse);
  }

  /** */
  listMembers(): Promise<Array<Member>> {
    return this.listResource('members');
  }

  /** */
  getMember(userID: ID): Promise<Member> {
    return this.getResource(`members/${userID}`);
  }

  /** */
  getCurrentMember(): Promise<CurrentMember> {
    return this.getResource('member');
  }

  /** Not Available through the API */
  getCurrentUser(): Promise<Member> {
    return this.getResource('user');
  }

  /** */
  listProjects(): Promise<Array<Project>> {
    return this.listResource('projects');
  }

  /** */
  getProject(id: ID): Promise<Project> {
    return this.getResource(`projects/${id}`);
  }

  /** */
  createProject(params: ProjectChange): Promise<Project> {
    return this.createResource('projects', params);
  }

  /** */
  updateProject(id: ID, params: ProjectChange): Promise<Project> {
    return this.updateResource(`projects/${id}`, params);
  }

  /** */
  deleteProject(id: ID): Promise<Record<string, unknown>> {
    return this.deleteResource(`projects/${id}`);
  }

  /** */
  listEpics(): Promise<Array<Epic>> {
    return this.listResource('epics');
  }

  /** */
  getEpic(epicID: ID): Promise<Epic> {
    return this.getResource(`epics/${epicID}`);
  }

  /** */
  createEpic(params: EpicChange): Promise<Epic> {
    return this.createResource('epics', params);
  }

  /** */
  updateEpic(epicID: ID, params: EpicChange): Promise<Epic> {
    return this.updateResource(`epics/${epicID}`, params);
  }

  /** */
  deleteEpic(epicID: ID): Promise<Record<string, unknown>> {
    return this.deleteResource(`epics/${epicID}`);
  }

  /** */
  addReaction(storyId: ID, commentId: ID, emoji: string): Promise<void> {
    return this.createResource(
      `stories/${storyId}/comments/${commentId}/reactions`,
      {
        emoji,
      },
    );
  }

  /** */
  deleteReaction(storyId: ID, commentId: ID, emoji: string): Promise<void> {
    return this.deleteResource(
      `stories/${storyId}/comments/${commentId}/reactions`,
      {
        emoji,
      },
    );
  }

  /** */
  listStories(
    projectID: ID,
    includesDescription?: boolean,
  ): Promise<Array<Story>> {
    return this.listResource(`projects/${projectID}/stories`, {
      includes_description: Boolean(includesDescription),
    });
  }

  /** */
  searchStories(query: string, pageSize?: number): Promise<StorySearchResult> {
    const processResult = (result: StorySearchResult): StorySearchResult => {
      if (result.next) {
        return {
          ...result,
          fetchNext: () => this.getResource(result.next).then(processResult),
        };
      }
      return result;
    };

    return this.getResource<StorySearchResult>(`search/stories`, {
      query,
      page_size: pageSize || 25,
    }).then(processResult);
  }

  /** */
  createStory(params: StoryChange): Promise<Story> {
    return this.createResource('stories', params);
  }

  /** */
  getStory(storyID: ID): Promise<Story> {
    return this.getResource(`stories/${storyID}`);
  }

  /** */
  updateStory(storyID: ID, params: StoryChange): Promise<Story> {
    return this.updateResource(`stories/${storyID}`, params);
  }

  /** */
  deleteStory(storyID: ID): Promise<Record<string, unknown>> {
    return this.deleteResource(`stories/${storyID}`);
  }

  /** */
  createStoryComment(storyID: ID, text: string): Promise<Comment> {
    return this.createResource(`stories/${storyID}/comments`, { text });
  }

  /** */
  deleteStoryComment(
    storyID: ID,
    commentID: ID,
  ): Promise<Record<string, unknown>> {
    return this.deleteResource(`stories/${storyID}/comments/${commentID}`);
  }

  /** */
  updateStoryComment(
    storyID: ID,
    commentID: ID,
    text: string,
  ): Promise<Comment> {
    return this.updateResource(`stories/${storyID}/comments/${commentID}`, {
      text,
    });
  }

  /** */
  listTasks(storyID: ID): Promise<Array<Task>> {
    return this.listResource(`stories/${storyID}/tasks`);
  }

  /** */
  createTask(storyID: ID, params: CreateTaskParams): Promise<Task> {
    return this.createResource(`stories/${storyID}/tasks`, params);
  }

  /** */
  getTask(storyID: ID, taskID: ID): Promise<Task> {
    return this.getResource(`stories/${storyID}/tasks/${taskID}`);
  }

  /** */
  updateTask(storyID: ID, taskID: ID, params: UpdateTaskParams): Promise<Task> {
    return this.updateResource(`stories/${storyID}/tasks/${taskID}`, params);
  }

  /** */
  deleteTask(storyID: ID, taskID: ID): Promise<Record<string, unknown>> {
    return this.deleteResource(`stories/${storyID}/tasks/${taskID}`);
  }

  /** */
  listWorkflows(): Promise<Array<Workflow>> {
    return this.listResource('workflows');
  }

  /** */
  createStoryLink(params: StoryLinkChange): Promise<StoryLink> {
    return this.createResource('story-links', params);
  }

  /** */
  getStoryLink(storyLinkID: ID): Promise<StoryLink> {
    return this.getResource(`story-links/${storyLinkID}`);
  }

  /** */
  deleteStoryLink(storyLinkID: ID): Promise<Record<string, unknown>> {
    return this.deleteResource(`story-links/${storyLinkID}`);
  }

  /** */
  listFiles(): Promise<Array<File>> {
    return this.listResource('files');
  }

  /** */
  updateFile(fileID: ID, params: FileChange): Promise<File> {
    return this.updateResource(`files/${fileID}`, params);
  }

  /** */
  deleteFile(fileID: ID): Promise<Record<string, unknown>> {
    return this.deleteResource(`files/${fileID}`);
  }

  /** */
  listLinkedFiles(): Promise<Array<LinkedFile>> {
    return this.listResource('linked-files');
  }

  /** */
  createLinkedFile(params: LinkedFileChange): Promise<LinkedFile> {
    return this.createResource('linked-files', params);
  }

  /** */
  updateLinkedFile(
    linkedFileID: ID,
    params: LinkedFileChange,
  ): Promise<LinkedFile> {
    return this.updateResource(`linked-files/${linkedFileID}`, params);
  }

  /** */
  deleteLinkedFile(linkedFileID: ID): Promise<Record<string, unknown>> {
    return this.deleteResource(`linked-files/${linkedFileID}`);
  }

  /** */
  createLabel(name: string, color: string): Promise<any> {
    return this.createResource(`labels`, { name, color });
  }

  /** */
  listLabels(): Promise<Array<Label>> {
    return this.listResource('labels');
  }

  /** */
  listTeams(): Promise<Array<Team>> {
    return this.listResource('teams');
  }

  /** */
  getTeam(teamID: ID): Promise<Team> {
    return this.getResource(`teams/${teamID}`);
  }

  /** */
  listIterations(): Promise<Array<Iteration>> {
    return this.listResource(`iterations`);
  }

  /** */
  createIteration(params: IterationChange): Promise<Iteration> {
    return this.createResource(`iterations`, params);
  }

  /** */
  getIteration(iterationID: ID): Promise<Iteration> {
    return this.getResource(`iterations/${iterationID}`);
  }

  /** */
  updateIteration(
    iterationID: ID,
    params: IterationChange,
  ): Promise<Iteration> {
    return this.updateResource(`iterations/${iterationID}`, params);
  }

  /** */
  deleteIteration(iterationID: ID): Promise<Record<string, unknown>> {
    return this.deleteResource(`iterations/${iterationID}`);
  }

  /** */
  listRepositories(): Promise<Array<Repository>> {
    return this.listResource(`repositories`);
  }

  /** */
  getRepository(repositoryID: ID): Promise<Repository> {
    return this.getResource(`repositories/${repositoryID}`);
  }
}

export default Client;

// For CommonJS default export support
module.exports = Client;
module.exports.default = Client;
