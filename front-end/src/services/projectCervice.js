import httpService from "./httpService";

export function createProjectname(projectname) {
  return httpService.post("/projectnames", projectname);
}

export function getAll() {
  return httpService.get("/projectnames");
}

export function getProjectname(id) {
  return httpService.get(`/projectname/${id}`);
}

// export function deleteProjectname(id) {
//   return httpService.delete(`/projectname/${id}`);
// }

// export function updateProjectname(id, projectname) {
//   return httpService.put(`/projectname/${id}`, projectname);
// }

const projectService = {
  createProjectname,
  getAll,
  getProjectname,
  // deleteProjectname,
  // updateProjectname,
};

export default projectService;
