import axios from 'axios'
import { Workspace } from '../api/types'

const BASE_URL = 'http://localhost:8080'

/** The API for the app, for querying, creating and updating workspaces */
class DosspaceApi {
  // TODO: write out all of the methods for the endpoints here

  /** Returns the ID and title of every existing workspace */
  static async getWorkspaces(): Promise<Workspace[]> {
    try {
      const req = await axios.get(BASE_URL)
      const { workspaces } = req.data
      return workspaces
    } catch (err) {
      throw new Error('Unable to fetch workspaces')
    }
  }

  static async getWorkspace(id: string): Promise<Workspace> {
    try {
      const req = await axios.get(`${BASE_URL}/${id}`)
      const { workspace } = req.data
      return workspace
    } catch (err) {
      throw new Error('Unable to fetch workspace')
    }
  }

  static async updateWorkspace(id: string, body: any): Promise<Workspace> {
    debugger
    try {
      const response: any = await axios.post(`${BASE_URL}/${id}`, body)
      const result: Workspace = response.data.workspace
      debugger
      return result
    } catch (err) {
      //@ts-ignore
      throw new Error('Unable to update the workspace', err?.message)
    }
  }

  static async createWorkspace(): Promise<Workspace> {
    try {
      const response: any = await axios.post(`${BASE_URL}/`);
      debugger;
      const result: Workspace = response.data.workspace;
      debugger;
      return result;
    } catch (err) {
      //@ts-ignore
      throw new Error('Unable to create the workspace', err?.message)
    }
  }
}

export default DosspaceApi
