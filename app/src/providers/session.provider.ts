import axios from 'axios';
import { Hasher } from '../helpers/hasher';

type State = {
  username: string;
  password: string;
};

export class SessionProvider {
  static isAuthenticated() {
    return !!sessionStorage.getItem('session_token');
  }
  static async singIn(state: State) {
    // state.password = Hasher.hash.asSHA512(state.password as string);
    const response = await axios.postForm(`token/`, { state });
    return response;
  };
  static async singOut() {
    sessionStorage.removeItem('session_token');
    window.location.reload();
  }
}