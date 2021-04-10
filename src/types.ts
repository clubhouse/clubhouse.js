/* eslint-disable camelcase */

export type ID = string | number;

export interface Entity {
  id: ID;
  created_at: string;
  updated_at: string;
}

export interface RequestFactory<T> {
  baseURL: string;
  version: string;
  createRequest(uri: string, method?: string, body?: Record<string, any>): T;
  prefixURI(uri: string): string;
}

export interface RequestPerformer<T, U> {
  performRequest(request: T): Promise<U>;
}

export interface ResponseParser<U> {
  parseResponse(response: U): Promise<any>;
}

/* Users */

export type Profile = {
  deactivated: boolean;
  display_icon: any;
  email_address: string | null;
  entity_type: string;
  gravatar_hash: string | null;
  id: ID;
  mention_name: string;
  name: string | null;
  two_factor_auth_activated: boolean;
};

export type Member = {
  id: ID;
  created_at: string;
  updated_at: string;
  role: string;
  disabled: boolean;
  profile: Profile;
  overrides: {
    email_address?: string;
    gravatar_hash?: string;
    display_icon?: string;
  };
};

export interface Workspace2 {
  estimate_scale: number[];
  url_slug: string;
}

export interface CurrentMember {
  id: string;
  mention_name: string;
  name: string;
  workspace2: Workspace2;
}

/* Projects */

export type ProjectStats = {
  num_points: number;
  num_stories: number;
};

export type Project = {
  abbreviation: string | null;
  archived: boolean;
  color: string | null;
  created_at: string | null;
  days_to_thermometer: number;
  description: string | null;
  entity_type: string;
  external_id: string | null;
  follower_ids: Array<ID>;
  id: number;
  iteration_length: number;
  name: string;
  show_thermometer: boolean;
  start_time: string;
  stats: ProjectStats;
  team_id: number;
  updated_at: string | null;
};

/*
  The front end include a lower case version of the project name
*/
export type ProjectChange = {
  name?: string;
  team_id?: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
  color?: string;
  abbreviation?: string;
  archived?: boolean;
  start_time?: string;
  show_thermometer?: boolean;
  days_to_thermometer?: string;
  external_id?: string;
  follower_ids?: Array<ID>;
};

/* Labels */

export type CreateLabelParams = {
  color?: string;
  description?: string;
  external_id?: string;
  name: string;
};

export type UpdateLabelParams = Partial<CreateLabelParams>;

export type LabelStats = {
  num_epics: number;
  num_points_completed: number;
  num_points_in_progress: number;
  num_points_total: number;
  num_stories_completed: number;
  num_stories_in_progress: number;
  num_stories_total: number;
  num_stories_unestimated: number;
};

export type Label = {
  archived: boolean;
  color: string | null;
  created_at: string | null;
  description: string | null;
  entity_type: string;
  external_id: string | null;
  id: number;
  name: string;
  stats: LabelStats;
  updated_at: string | null;
};

/* File */
export type File = {
  content_type: string;
  created_at: string;
  description: string | null;
  entity_type: string;
  external_id: string | null;
  filename: string;
  group_mention_ids: Array<ID>;
  id: number;
  mention_ids: Array<ID>;
  name: string;
  size: number;
  story_ids: Array<ID>;
  thumbnail_url: string | null;
  updated_at: string | null;
  uploader_id: ID;
  url: string | null;
};

export type FileChange = {
  name?: string;
  description?: string;
  external_id?: string;
  updated_at?: string;
  uploader_id?: ID;
};

/* LinkedFile */

export type LinkedFileType = 'google url' | 'dropbox' | 'box' | 'onedrive';

export type LinkedFile = {
  content_type: string | null;
  created_at: string;
  description: string | null;
  entity_type: string;
  group_mention_ids: Array<ID>;
  id: number;
  member_mention_ids: Array<ID>;
  mention_ids: Array<ID>;
  name: string;
  size: number | null;
  story_ids: Array<number>;
  thumbnail_url: string | null;
  type: string;
  updated_at: string;
  uploader_id: ID;
  url: string;
};

export type LinkedFileChange = {
  name?: string;
  description?: string;
  content_type?: string;
  size?: number;
  story_id: ID;
  thumbnail_url: string;
  type: string;
  uploader_id: ID;
  url: string;
};

/* Task */

export type CreateTaskParams = {
  complete?: boolean;
  created_at?: string;
  description: string;
  external_id?: string;
  owner_ids?: Array<ID>;
  updated_at?: string;
};

export type UpdateTaskParams = Partial<CreateTaskParams>;

export type Task = {
  complete: boolean;
  completed_at: string | null;
  created_at: string;
  description: string;
  entity_type: string;
  external_id?: string | null;
  group_mention_ids: Array<ID>;
  id: number;
  member_mention_ids: Array<ID>;
  mention_ids?: Array<ID>;
  owner_ids: Array<ID>;
  position: number;
  story_id: number;
  updated_at: string | null;
};

/* Stories */

export type Branch = {
  created_at: string | null;
  deleted: boolean;
  entity_type: string;
  id: number | null;
  merged_branch_ids: Array<number>;
  name: string;
  persistent: boolean;
  pull_requests: Array<Record<string, any>>;
  repository_id: number | null;
  updated_at: string | null;
  url: string;
};

export type Commit = {
  author_email: string;
  author_id: ID | null;
  author_identity: Record<string, any>;
  created_at: string;
  entity_type: string;
  hash: string;
  id: number | null;
  merged_branch_ids: Array<number>;
  message: string;
  repository_id: number | null;
  timestamp: string;
  updated_at: string | null;
  url: string;
};

export type PullRequestLabel = {
  color: string;
  description: string | null;
  entity_type: string;
  id: number;
  name: string;
};

export type PullRequest = {
  branch_id: number;
  branch_name: string;
  build_status: string;
  closed: boolean;
  created_at: string;
  draft: boolean;
  entity_type: string;
  id: number;
  merged: boolean;
  num_added: number;
  num_commits: number;
  num_modified: number | null;
  num_removed: number;
  number: number;
  repository_id: number;
  review_status: string;
  target_branch_id: number;
  target_branch_name: string;
  title: string;
  updated_at: string;
  url: string;
  vcs_labels: Array<PullRequestLabel> | null;
};

export type CreateExternalTicketParams = {
  external_id: string;
  external_url: string;
};

export type ExternalTicket = {
  epic_ids: Array<number>;
  external_id: string;
  external_url: string;
  id: ID;
  story_ids: Array<number>;
};

export type CreateStoryCommentParams = {
  author_id?: ID;
  created_at?: string;
  external_id?: string;
  text: string;
  updated_at?: string;
};

export type Comment = {
  author_id: ID | null;
  created_at: string;
  entity_type: string;
  external_id: string | null;
  group_mention_ids: Array<ID>;
  id: number;
  member_mention_ids: Array<ID>;
  mention_ids: Array<ID>;
  position: number;
  story_id: number;
  text: string;
  updated_at: string | null;
};

export type StoryType = 'bug' | 'chore' | 'feature';

export type Story = {
  app_url: string;
  archived: boolean;
  blocked: boolean;
  blocker: boolean;
  branches: Array<Branch>;
  comments: Array<Comment>;
  commits: Array<Commit>;
  completed: boolean;
  completed_at: string | null;
  completed_at_override: string | null;
  created_at: string;
  cycle_time: number;
  deadline: string | null;
  description: string;
  entity_type: string;
  epic_id: number | null;
  estimate: number | null;
  external_id: string | null;
  external_links: Array<string>;
  external_tickets: Array<ExternalTicket>;
  files: Array<File>;
  follower_ids: Array<ID>;
  id: number;
  iteration_id: number | null;
  labels: Array<Label>;
  lead_time: number;
  linked_files: Array<LinkedFile>;
  member_mention_ids: Array<ID>;
  mention_ids: Array<ID>;
  moved_at: string | null;
  name: string;
  owner_ids: Array<ID>;
  position: number;
  previous_iteration_ids: Array<number>;
  project_id: number;
  pull_requests: Array<PullRequest>;
  requested_by_id: ID;
  started: boolean;
  started_at: string | null;
  started_at_override: string | null;
  story_type: StoryType;
  tasks: Array<Task>;
  task_ids: Array<ID>;
  updated_at: string | null;
  workflow_state_id: number;
};

export type StoryChange = {
  after_id?: ID;
  archived?: boolean;
  before_id?: ID;
  branch_ids?: Array<ID>;
  created_at?: string | null;
  deadline?: string | null;
  description?: string;
  epic_id?: number | null;
  estimate?: number | null;
  external_id?: string;
  file_ids?: Array<ID>;
  follower_ids?: Array<ID>;
  iteration_id?: number;
  labels?: Array<CreateLabelParams>;
  linked_file_ids?: Array<ID>;
  name?: string;
  owner_ids?: Array<ID>;
  project_id?: number;
  requested_by_id?: ID;
  story_type?: StoryType;
  updated_at?: string | null;
  workflow_state_id?: number;
};

export type StorySearchResult = {
  data: Array<Story>;
  next?: string;
  fetchNext: () => Promise<StorySearchResult>;
};

/* Epic */

export type EpicStates = 'to do' | 'in progress' | 'done';

export type EpicStats = {
  average_cycle_time: number;
  average_lead_time: number;
  last_story_update: string | null;
  num_points: number;
  num_points_done: number;
  num_points_started: number;
  num_points_unstarted: number;
  num_stories_done: number;
  num_stories_started: number;
  num_stories_unestimated: number;
  num_stories_unstarted: number;
};

export type Epic = {
  app_url: string;
  archived: string;
  comments: Array<Record<string, any>>;
  completed: boolean;
  completed_at: string | null;
  completed_at_override?: string | null;
  created_at: string | null;
  deadline: string | null;
  description: string;
  entity_type: string;
  epic_state_id: number;
  external_id: string | null;
  external_tickets: Array<Record<string, any>>;
  follower_ids: Array<ID>;
  group_id: string | null;
  group_mention_ids: Array<ID>;
  id: number;
  labels: Array<Label>;
  member_mention_ids: Array<ID>;
  mention_ids: Array<ID>;
  milestone_id: number | null;
  name: string;
  owner_ids: Array<ID>;
  planned_start_date: string | null;
  position: number;
  project_ids: Array<number>;
  requested_by_id: ID;
  started: boolean;
  started_at: string | null;
  started_at_override: string | null;
  state: EpicStates;
  stats: EpicStats;
  updated_at: string | null;
};

export type EpicChange = {
  name?: string;
  owner_ids?: Array<ID>;
  state?: EpicStates;
  created_at?: string | null;
  updated_at?: string | null;
  deadline?: string | null;
  description?: string;
  external_id?: string | null;
  follower_ids?: Array<ID>;
  /* update only */
  after_id?: string;
  before_id?: string;
  acrhived?: string;
};

export type WorkflowStateTypes = 'unstarted' | 'started' | 'done';

export type WorkflowState = {
  color: string;
  created_at: string;
  description: string;
  entity_type: string;
  id: number;
  name: string;
  num_stories: number;
  num_story_templates: number;
  position: number;
  type: WorkflowStateTypes;
  updated_at: string;
  verb: string | null;
};

export type Workflow = {
  auto_assign_owner: boolean;
  created_at: string;
  default_state_id: number;
  description: string;
  entity_type: string;
  id: number;
  name: string;
  project_ids: Array<number>;
  states: Array<WorkflowState>;
  team_id: number;
  updated_at: string;
};

/* StoryLink */
export type StoryLinkVerb = 'blocks' | 'duplicates' | 'relates to';

export type StoryLink = {
  id: ID;
  created_at: string;
  updated_at: string;
  type: string;
  subject_id: ID;
  object_id: ID;
  verb: StoryLinkVerb;
};

export type StoryLinkChange = {
  object_id: ID;
  subject_id: ID;
  verb: StoryLinkVerb;
};

/* Milestones */

export type Milestone = {
  id: ID;
};

export type MilestoneUpdate = {
  name: string;
};

/* Fact aka History */

export type Fact = {
  at: string;
  scope: string;
};

/* Teams */

export type Team = {
  created_at: string;
  description: string;
  id: ID;
  name: string;
  position: number;
  project_ids: Array<ID>;
  updated_at: string;
  workflow: Workflow;
};

/* Iterations */

export type IterationStats = {
  average_cycle_time: number;
  average_lead_time: number;
  num_points: number;
  num_points_done: number;
  num_points_started: number;
  num_points_unstarted: number;
  num_stories_done: number;
  num_stories_started: number;
  num_stories_unestimated: number;
  num_stories_unstarted: number;
};

export type IterationStatus = 'unstarted' | 'started' | 'done';

export type Iteration = {
  created_at: string;
  description: string;
  end_date: string;
  entity_type: string;
  follower_ids: Array<ID>;
  group_mention_ids: Array<ID>;
  id: number;
  labels: Array<Label>;
  member_mention_ids: Array<ID>;
  mention_ids: Array<ID>;
  name: string;
  start_date: string;
  stats: IterationStats;
  status: IterationStatus;
  updated_at: string;
};

export type IterationChange = {
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  follower_ids?: Array<ID>;
};

export type Repository = {
  created_ad: string;
  entity_type: string;
  external_id?: string | null;
  full_name: string;
  id: number;
  name: string;
  type: string;
  updated_at: string | null;
  url: string;
};
