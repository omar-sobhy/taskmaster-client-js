import { Axios } from 'axios';
import Project from './entities/Project';
import Section from './entities/Section';
import { User, UserWithPassword } from './entities/User';
import Task from './entities/Task';
import Comment from './entities/Comment';
import ChecklistItem from './entities/ChecklistItem';
import HistoryItem from './entities/HistoryItem';
import Tag from './entities/Tag';
interface SuccessResult<T> {
    type: 'success';
    data: T;
}
interface ErrorResult<T> {
    type: 'error';
    error: {
        message: string;
        data?: T;
    };
}
type ResultType<T, E = never> = SuccessResult<T> | ErrorResult<E>;
interface ClientOptions {
    authorizationCookie?: string;
}
declare class Client {
    basePath: string;
    axios: Axios;
    options: ClientOptions;
    constructor(basePath: string, options?: ClientOptions);
    signup(username: string, password: string, email: string): Promise<ResultType<User>>;
    login(username: string, password: string): Promise<ResultType<User>>;
    getProjects(): Promise<ResultType<Project[]>>;
    getProject(projectId: string): Promise<ResultType<Project>>;
    getUserData(userIds: string[]): Promise<ResultType<User[]>>;
    getProjectSections(projectId: string): Promise<ResultType<Section[]>>;
    createSections(projectId: string, sections: {
        name: string;
        colour: string;
        icon: string;
    }[]): Promise<ResultType<Section[]>>;
    updateSection(sectionId: string, { name, colour, icon }: Partial<{
        name: string;
        colour: string;
        icon: string;
    }>): Promise<ResultType<Section>>;
    createProject(name: string, background: string): Promise<ResultType<Project>>;
    createTask(sectionId: string, name: string, dueDate?: string, assignee?: string): Promise<ResultType<Task>>;
    getTasks(sectionId?: string): Promise<ResultType<Task[]>>;
    getTaskData(taskId: string): Promise<ResultType<Task>>;
    updateTask(taskId: string, { assignee, dueDate, name, description, tags, }: Partial<{
        assignee: string | null;
        dueDate: string | null;
        name: string;
        description: string | null;
        tags: string[] | null;
    }>): Promise<ResultType<Task>>;
    addComment(taskId: string, comment: string): Promise<ResultType<Comment>>;
    getComments(commentIds: string[]): Promise<ResultType<Comment[]>>;
    getTagsData(tagIds: string[]): Promise<ResultType<Tag[]>>;
    createTag(projectId: string, name: string): Promise<ResultType<Tag>>;
    updateTag(tagId: string, name?: string, colour?: string): Promise<ResultType<Tag>>;
    deleteTag(tagId: string): Promise<ResultType<Tag>>;
    deleteSection(sectionId: string): Promise<ResultType<Section>>;
}
export default Client;
export { ClientOptions, ChecklistItem, Comment, HistoryItem, Project, Section, Tag, Task, User, UserWithPassword, };
