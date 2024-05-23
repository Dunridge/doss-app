import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

/** The API for the app, for querying, creating and updating workspaces */
class DosspaceApi {
  
  // TODO: write out all of the methods for the endpoints here 
  
  /** Returns the ID and title of every existing workspace */
  static async getWorkspaces() {
    try {
      const req = await axios.get(BASE_URL)
      const { workspaces } = req.data
      return workspaces
    } catch (err) {
      throw new Error('Unable to fetch workspaces')
    }
  }

  static async getWorkspace(id: string) {
    try {
      const req = await axios.get(`${BASE_URL}/${id}`);
      const { workspace } = req.data
      return workspace
    } catch (err) {
      throw new Error('Unable to fetch workspace')
    }
  }
}

export default DosspaceApi
