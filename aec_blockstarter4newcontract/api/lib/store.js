class Store {

  constructor() {
    this.projects = {}
  }

  addProject(projAddr, userAddr) {
    this.projects[projAddr] = ({
      projAddr: projAddr,
      userAddr: userAddr
    })
  }

  getProjects(userAddr) {
    const projects = [];
    Object.keys(this.projects).map(addr => projects.push(this.projects[addr]));
    if (userAddr) {
      return projects.filter(project => {
        return project.userAddr === userAddr
      })
    }
    return projects
  }

}

const store = new Store()
module.exports = store
