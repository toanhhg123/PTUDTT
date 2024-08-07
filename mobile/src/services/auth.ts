import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseApi from "../base/api";
import { AxiosResponseApi } from "../base/axios";
import { UserModel, UserToken } from "../types/user";

class AuthApi extends BaseApi<UserModel, never, never> {
  readonly KEY_AUTH_STORE = "KEY_AUTH_STORE";

  constructor() {
    super("auth");
  }

  login(username: string, password: string): Promise<AxiosResponseApi<string>> {
    return this.api.post(`${this.url}/login`, { username, password });
  }

  async saveAsyncStore(user: UserToken) {
    try {
      await AsyncStorage.setItem(this.KEY_AUTH_STORE, JSON.stringify(user));
    } catch (e) {
      console.error("Error saving data", e);
    }
  }

  async getStore(): Promise<UserToken | null> {
    try {
      const value = await AsyncStorage.getItem(this.KEY_AUTH_STORE);
      return value != null ? JSON.parse(value) : null;
    } catch (e) {
      return null;
    }
  }

  async clearStore() {
    try {
      await AsyncStorage.removeItem(this.KEY_AUTH_STORE);
    } catch (e) {
      return null;
    }
  }
}

export const authApi = new AuthApi();
