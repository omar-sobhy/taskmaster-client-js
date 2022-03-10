import AxiosStatic, { Axios } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import Project from './entities/Project';
import Section from './entities/Section';
import { User } from './entities/User';
import Task from './entities/Task';

interface SuccessResult<T> {
  type: 'success'
  data: T
}

interface ErrorResult<T> {
  type: 'error'
  error: {
    message: string
    data?: T
  }
}

type ResultType<T, E = never> = SuccessResult<T> | ErrorResult<E>;

function handleError(error: unknown): ErrorResult<never> {
  console.log('error', error);
  if (!AxiosStatic.isAxiosError(error)) {
    return {
      type: 'error',
      error: {
        message: 'An unknown error occurred.',
      },
    };
  }

  return {
    type: 'error',
    error: {
      message: error.response?.data.error?.message ?? 'An unknown error occurred.',
    },
  };
}

interface ClientOptions {
  authorizationCookie?: string
}

class Client {
  basePath: string;

  axios: Axios;

  options: ClientOptions;

  constructor(basePath: string, options: ClientOptions = {}) {
    this.basePath = basePath;

    this.options = options;

    const jar = new CookieJar();

    console.log('Options', options);
    if (this.options.authorizationCookie) {
      jar.setCookieSync(`Authorization=${this.options.authorizationCookie}`, `${this.basePath}/`);
    }

    this.axios = wrapper(AxiosStatic.create({
      jar,
      withCredentials: true,
    }));
  }

  async signup(username: string, password: string, email: string): Promise<ResultType<User>> {
    try {
      const response = await this.axios.post(`${this.basePath}/users/signup`, {
        username,
        password,
        email,
      });

      return {
        type: 'success',
        data: response.data.user,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async login(username: string, password: string):
  Promise<ResultType<User>> {
    try {
      const response = await this.axios.post(`${this.basePath}/users/login`, {
        username,
        password,
      });

      console.log('hello', response.headers);
      return {
        type: 'success',
        data: {
          ...response.data.user,
        },
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async getProjects(): Promise<ResultType<Project[]>> {
    try {
      const response = await this.axios.get(`${this.basePath}/projects`);

      return {
        type: 'success',
        data: response.data.projects,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async getProject(projectId: string): Promise<ResultType<Project>> {
    try {
      const response = await this.axios.get(`${this.basePath}/projects/${projectId}`);

      return {
        type: 'success',
        data: response.data.project,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async getUserData(userIds: string[]): Promise<ResultType<User[]>> {
    try {
      const response = await this.axios.post(`${this.basePath}/users`, {
        userIds,
      });

      return {
        type: 'success',
        data: response.data.users,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async getProjectSections(projectId: string): Promise<ResultType<Section[]>> {
    try {
      const response = await this.axios.get(`${this.basePath}/projects/${projectId}/sections`);

      return {
        type: 'success',
        data: response.data.sections,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async createSections(
    projectId: string,
    sections: { name: string, colour: string, icon: string }[],
  ): Promise<ResultType<Section[]>> {
    try {
      const response = await this.axios.post(`${this.basePath}/projects/${projectId}/sections`, {
        sections,
      });

      return {
        type: 'success',
        data: response.data.sections,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async createProject(name: string, background: string): Promise<ResultType<Project>> {
    try {
      const response = await this.axios.post(`${this.basePath}/projects/`, {
        name,
        background,
      });

      return {
        type: 'success',
        data: response.data.project,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async createTask(
    sectionId: string,
    name: string,
    dueDate?: string,
    assignee?: string,
  ): Promise<ResultType<Task>> {
    try {
      const data: Record<string, string> = { name };
      if (dueDate) data.dueDate = dueDate;
      if (assignee) data.assigne = assignee;

      const response = await this.axios.post(`${this.basePath}/sections/${sectionId}/tasks`, data);

      return {
        type: 'success',
        data: response.data.task,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async getTasks(sectionId: string): Promise<ResultType<Task[]>> {
    try {
      const response = await this.axios.get(`${this.basePath}/sections/${sectionId}/tasks`);

      return {
        type: 'success',
        data: response.data.tasks,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async getTaskData(taskId: string): Promise<ResultType<Task>> {
    try {
      const response = await this.axios.get(`${this.basePath}/tasks/${taskId}`);

      return {
        type: 'success',
        data: response.data.task,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async updateTask(
    taskId: string,
    {
      assignee, dueDate, name, description,
    }: Partial<{ assignee: string, dueDate: string, name: string, description?: string }>,
  ) : Promise<ResultType<Task>> {
    try {
      const response = await this.axios.patch(`${this.basePath}/tasks/${taskId}`, {
        assignee,
        dueDate,
        name,
        description,
      });

      return {
        type: 'success',
        data: response.data.task,
      };
    } catch (error) {
      return handleError(error);
    }
  }
}

export default Client;
