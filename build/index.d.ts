import { Axios } from 'axios';
import Project from './entities/Project';
import Section from './entities/Section';
import { User } from './entities/User';
import Task from './entities/Task';
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
declare type ResultType<T, E = never> = SuccessResult<T> | ErrorResult<E>;
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
    createProject(name: string, background: string): Promise<ResultType<Project>>;
    createTask(sectionId: string, name: string, dueDate?: string, assignee?: string): Promise<ResultType<Task>>;
    getTasks(sectionId: string): Promise<ResultType<Task[]>>;
    getTaskData(taskId: string): Promise<ResultType<Task>>;
    updateTask(taskId: string, { assignee, dueDate, name, description, }: Partial<{
        assignee: string;
        dueDate: string;
        name: string;
        description?: string;
    }>): Promise<ResultType<Task>>;
}
export default Client;
