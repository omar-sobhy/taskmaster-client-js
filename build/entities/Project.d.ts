interface Project {
    _id: string;
    name: string;
    background: string;
    users: Array<string>;
    sections: Array<string>;
    tags: Array<string>;
}
export default Project;
