import { AsyncStorage } from 'react-native';

const KEY = '@FRAKTIO_STASI:auth';

const auth = async ({ username }) => {
  await AsyncStorage.setItem(`${KEY}:user`, username);
};

const isAuthed = async () => {
  try {
    const user = await AsyncStorage.getItem(`${KEY}:user`);
    if (user !== null) {
      return true;
    }
    throw new Error('Not authed');
  } catch (e) {
    // console.warn(e.message);
    return false;
  }
};

const signOut = async () => {
  await AsyncStorage.removeItem(`${KEY}:user`);
};

export default {
  auth,
  isAuthed,
  signOut
};
