import AxiosStatic, { Axios } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import Project from './entities/Project';
import Section from './entities/Section';
import { User } from './entities/User';

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
      message: error.response?.data.error.message ?? 'An unknown error occurred.',
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

    if (this.options.authorizationCookie) {
      jar.setCookieSync(this.options.authorizationCookie, `${this.basePath}/`);
    }

    this.axios = wrapper(AxiosStatic.create({
      jar,
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

  async login(username: string, password: string): Promise<ResultType<User>> {
    try {
      const response = await this.axios.post(`${this.basePath}/users/login`, {
        username,
        password,
      });

      return {
        type: 'success',
        data: response.data.user,
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
      const response = await this.axios.get(`${this.basePath}/projects/${projectId}`);

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
  ) {
    try {
      const response = await this.axios.post(`${this.basePath}/projects/:projectId/sections`, {
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
}

export default Client;

async function run() {
  const client = new Client('http://localhost:3000');
  {
    const res = await client.login('omar', 'admina');
    console.log(res);
  }

  {
    const res = await client.getProjects();
    console.log(res);

    if (res.type === 'success') {
      res.data.forEach(async (d) => {
        const res_ = await client.getProject(d._id);
        console.log(res_);
      });
    }
  }
}

run();
