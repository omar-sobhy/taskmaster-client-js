import { Axios } from 'axios';
import Project from './entities/Project';
import Section from './entities/Section';
import { User } from './entities/User';
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
}
export default Client;
